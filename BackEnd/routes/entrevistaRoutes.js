import Canditato_vagaCTRL from '../controllers/entrevistaController.js'
import express from 'express'

let rota_cand_vaga = express.Router()

let candidato_vaga = new Canditato_vagaCTRL()

rota_cand_vaga
    .post('/', candidato_vaga.gravar)
    .get('/', candidato_vaga.buscar)


export default rota_cand_vaga