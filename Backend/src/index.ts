import app from './app'
import * as rsa from 'my-rsa'


async function main() {
    //Conexión con la base de datos por si es necesario
    //startConnection()
    await app.listen(app.get('port'), () => {
        console.log('Server on port', app.get('port'))
    })
    
}
main()