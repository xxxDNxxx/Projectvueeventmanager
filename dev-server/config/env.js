import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

export function setEnvironment(app) {
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    } else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = 'mongodb://admin:admin123@ds263068.mlab.com:63068/eventpmanager'
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb://admin3:admin3@ds263048.mlab.com:63048/faceverification'
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/../dist'))
}