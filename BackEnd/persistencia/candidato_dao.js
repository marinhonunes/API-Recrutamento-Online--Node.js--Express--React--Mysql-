import Candidato from "../models/entidades/candidato.js";
import Databasee from "../models/conn.js"



export default class CandidatoDAO {
    async gravar(candidatoo){
        let conexao = new Databasee()

        let sql = "INSERT INTO canditados (cand_cpf, cand_nome, cand_endereco, cand_telefone) VALUES (?,?,?,?)"
        let params = [candidatoo.cpf,candidatoo.nome,candidatoo.endereco,candidatoo.telefone]

        //console.log(params)
        await conexao.executaComando(sql, params)

        return

    }
}

