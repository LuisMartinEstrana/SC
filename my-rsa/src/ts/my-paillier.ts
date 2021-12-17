import * as bcu from 'bigint-crypto-utils'

export class PublicKeyP {
  n: bigint
  g: bigint
  _n2: bigint

  constructor (n: bigint, g: bigint) {
    this.n = n
    this.g = g
    this._n2 = this.n ** 2n
  }

  encrypt (m: bigint, r?: bigint): bigint {
    if (r === undefined) {
      do {
        r = bcu.randBetween(this.n)
      } while (bcu.gcd(r, this.n) !== 1n)
    }
    return (bcu.modPow(this.g, m, this._n2) * bcu.modPow(r, this.n, this._n2)) % this._n2
  }
}

export class PrivateKeyP {
  lambda: bigint
  mu: bigint
  publicKey: PublicKeyP
  private readonly _p?: bigint
  private readonly _q?: bigint

  constructor (lambda: bigint, mu: bigint, publicKey: PublicKeyP, p?: bigint, q?: bigint) {
    this.lambda = lambda
    this.mu = mu
    this._p = p
    this._q = q
    this.publicKey = publicKey
  }

  decrypt (c: bigint): bigint {
    return (L(bcu.modPow(c, this.lambda, this.publicKey._n2), this.publicKey.n) * this.mu) % this.publicKey.n
  }
}

export async function generateKeysP (bitlength: number = 3072, simpleVariant: boolean = false): Promise<{ publicKey: PublicKeyP, privateKey: PrivateKeyP }> {
  let p: bigint, q: bigint, n: bigint, g: bigint, lambda: bigint, mu: bigint
  do {
    p = await bcu.prime(bitlength / 2 + 1)
    q = await bcu.prime(bitlength / 2)
    n = p * q
  } while (bcu.bitLength(n) !== bitlength || q === p)

  if (simpleVariant) {
    g = n + 1n
    lambda = (q - 1n) * (q - 1n)
    mu = bcu.modInv(lambda, n)
  } else {
    const n2 = n ** 2n
    g = getGenerator(n, n2)
    lambda = bcu.lcm(p - 1n, q - 1n)
    mu = bcu.modInv(L(bcu.modPow(g, lambda, n2), n), n)
  }

  const publicKey = new PublicKeyP(n, g)
  const priateKey = new PrivateKeyP(lambda, mu, publicKey, p, q)
  return {
    publicKey: publicKey,
    privateKey: priateKey
  }

  function getGenerator (n: bigint, n2: bigint): bigint {
    const alpha = bcu.randBetween(n)
    const beta = bcu.randBetween(n)
    return ((alpha * n + 1n) * bcu.modPow(beta, n, n2)) % n2
  }
}

function L (a: bigint, n: bigint): bigint {
  return (a - 1n)
}
