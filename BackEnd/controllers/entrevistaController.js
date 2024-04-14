import Candidato_vaga from '../models/entidades/entrevista.js'

export default class Canditato_vagaCTRL{
    async gravar(req,res){

        let data_inscricao      = req.body.data_inscricao
        let horario_inscricao   = req.body.horario_inscricao
        let cand_id             = req.body.cand_id
        let vaga_id             = req.body.vaga_id


        if(data_inscricao && horario_inscricao && cand_id && vaga_id){
            let cand_vaga = new Candidato_vaga(data_inscricao,horario_inscricao,cand_id,vaga_id)
                cand_vaga.createCandidato_vaga()
                .then(()=>{
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição cadastrada com sucesso!"
                    })
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar inscrição:" + erro.message
                    })
                })

        }
    }


    async buscar(req,res){

        let buscar = req.params

        if(!buscar){
            buscar = ''
        }
        
            let cand_vaga = new Candidato_vaga()
                cand_vaga.getAllVagas(buscar)
                .then((lista)=>{
                    res.status(200).json({
                        "status": true,
                        lista
                    })
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar inscrição:" + erro.message
                    })
                })
    }




}