import VagaCTRL from '../controllers/vagaController.js'
import express from 'express'

let vagaCTRL = new VagaCTRL()

let rotavaga = express.Router()

rotavaga
    .post('/', vagaCTRL.gravar)
    .get('/', vagaCTRL.buscar)


export default rotavaga