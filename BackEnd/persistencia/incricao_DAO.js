import Databasee from "../models/conn.js"

export default class Candidado_vagaDAO{
    async gravar(candidato_vaga){
        let conexao = new Databasee()

        let sql = "INSERT INTO candidados_vagas (data_inscricao, horarios_inscricao, cand_id, vaga_id ) VALUES (?,?,?,?)"
        let params = [candidato_vaga.data_inscricao, candidato_vaga.horario_inscricao, candidato_vaga.cand_id, candidato_vaga.vaga_id]

        //console.log(params)
        
        await conexao.executaComando(sql, params)
        return
    }

}