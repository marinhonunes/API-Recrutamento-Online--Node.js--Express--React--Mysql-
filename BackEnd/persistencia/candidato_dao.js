import Candidato from "../models/entidades/candidato.js";
import Databasee from "../models/conn.js"



export default class CandidatoDAO {
    async gravar(candidatoo){
        let conexao = new Databasee()

        let sql = "INSERT INTO canditados (cand_cpf, cand_nome, cand_endereco, cand_telefone) VALUES (?,?,?,?)"
        let params = [candidatoo.cpf,candidatoo.nome,candidatoo.endereco,candidatoo.telefone]

        //console.log(params)
       let oi = await conexao.executaComando(sql, params)

        console.log(oi)

    }


    async buscar(nome){
        let buscar = nome
        let conexao = new Databasee()

        if(!nome){
            buscar = ''
        }

        let sql = `SELECT * FROM canditados WHERE cand_nome LIKE ?`
        let params = ['%' + buscar + '%']

        let lista_candidatos = await conexao.executaComando(sql, params)
        return lista_candidatos

    }


}

