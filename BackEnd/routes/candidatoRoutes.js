import CandidatoCTRL from '../controllers/candidatoController.js'
import express from 'express'

let candidatoCTRL = new CandidatoCTRL()

let rotaCandidato = express.Router()

rotaCandidato.
post('/', candidatoCTRL.gravar)


export default rotaCandidato