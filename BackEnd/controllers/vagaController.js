import Vagas from "../models/entidades/vaga.js"

export default class VagaCTRL{
    async gravar(req,res){
        let cargo       = req.body.cargo
        let salario     = req.body.salario
        let cidade      = req.body.cidade
        let quantidadeVagas = req.body.quantidadeVagas


        if(cargo && salario && cidade && quantidadeVagas){
            let vaga = new Vagas(cargo,salario,cidade,quantidadeVagas)
                vaga.createVaga()
                .then(()=>{
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Vaga cadastrada com sucesso!"
                    })
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar vaga:" + erro.message
                    })
                })

        }

    }
}