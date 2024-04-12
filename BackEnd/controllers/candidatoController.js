import Candidato from '../models/entidades/candidato.js'

export default class CandidatoCTRL{
    async gravar(req,res){
        let cpf     = req.body.cpf
        let nome    = req.body.nome
        let endereco = req.body.endereco
        let telefone = req.body.telefone

        console.log(cpf)

        if(cpf && nome && endereco && telefone){
            let candidato = new Candidato(cpf,nome,endereco,telefone)
                candidato.createCandidato()
                .then(()=>{
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Candidado cadastrado com sucesso!"
                    })
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar candidato:" + erro.message
                    })
                })

        }

       

    }
}