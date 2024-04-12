import VagaCTRL from '../controllers/vagaController.js'
import express from 'express'

let vagaCTRL = new VagaCTRL()

let rotavaga = express.Router()

rotavaga.
post('/', vagaCTRL.gravar)


export default rotavaga