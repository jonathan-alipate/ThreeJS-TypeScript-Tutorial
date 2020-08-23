import http from 'http' //@types/node
import path from 'path' //@types/node
import express from 'express'
const port: number = 3000

class App {
    private server: http.Server //set type as a http server
    private port: number //set port type as number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

new App(port).Start()