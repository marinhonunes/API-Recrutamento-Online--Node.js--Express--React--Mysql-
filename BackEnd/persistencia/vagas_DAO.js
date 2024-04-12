import Candidato from "../models/entidades/candidato.js";
import Databasee from "../models/conn.js"



export default class VagasDAO {
    async gravar(vagaa){
        let conexao = new Databasee()

        let sql = "INSERT INTO vagas (vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade) VALUES (?,?,?,?)"
        let params = [vagaa.cargo, vagaa.salario,vagaa.cidade,vagaa.quantidadeVagas]


        //console.log(params)
        await conexao.executaComando(sql, params)

        return

    }
}