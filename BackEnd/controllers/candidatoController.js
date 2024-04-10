import Candidato from '../models/entidades/candidato.js'

export default class CandidatoCTRL{
    async gravar(req,res){
        let cpf     = req.body.cpf
        let nome    = req.body.nome
        let endereco = req.body.endereco
        let telefone = req.body.telefone

        if(cpf && nome && endereco && telefone){
            let candidato = new Candidato(nome,cpf,endereco,telefone)
            await candidato.createCandidato()
        }

    }
}