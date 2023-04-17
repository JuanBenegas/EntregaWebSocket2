import express from 'express'
import { engine } from 'express-handlebars'
import { resolve } from 'path'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import productsRoutes from './src/routes/productsRoutes.js'
import ProductManager from './src/utils/productManager.js'
import viewsRoutes from './src/routes/viewsRoutes.js'

const manager = new ProductManager()


const SERVER_PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/src/public'))
app.use('/', viewsRoutes)

const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`Conectado al server en el puerto: ${SERVER_PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {
    try {
        console.log("Nuevo forro conectado ")
        socket.emit('getproducts', await getProduct())
    }
    catch (e) {
        console.log(e)
    }
})

const viewsPath = resolve('src/views')

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`
}))
app.set('view engine', 'handlebars')
app.set('views', viewsPath)



async function getProduct() {
    console.log("Entramos aca2")
    try {
        const data = await manager.getProducts()
        if (data instanceof Error) {
            return null
        }
        return data
    } catch (error) {
        console.log(error)
    }
}