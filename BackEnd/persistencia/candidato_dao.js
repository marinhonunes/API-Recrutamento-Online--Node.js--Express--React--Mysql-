import Candidato from "../models/entidades/candidato.js";


export default class CandidatoDAO {
    async gravar(candidatoo){
        let conexao = new Database()

        let sql = 'INSERT INTO canditatos (cand_cpf, cand_nome, cand_endereco, cand_endereco) VALUES (?,?,?,?)'
        let params = [candidatoo.cand_cpf,candidatoo.cand_nome,candidatoo.cand_endereco,candidatoo.cand_telefone]

    }
}