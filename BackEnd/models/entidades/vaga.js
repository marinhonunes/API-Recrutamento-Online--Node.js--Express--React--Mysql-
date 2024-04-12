import VagasDAO from "../../persistencia/vagas_DAO.js";

export default class Vagas {
    
    cargo;
    salario;
    cidade;
    quantidadeVagas;

    constructor(cargo, salario, cidade, quantidadeVagas) {
 
        this.cargo = cargo;
        this.salario = salario;
        this.cidade = cidade;
        this.quantidadeVagas = quantidadeVagas;
    }

    // async getAllVagas() {
    //     const vagas = await banco.executaComando('SELECT * FROM vaga');
    //     return vagas;
    // }

    async createVaga() {
        let vagas = new VagasDAO()
        await vagas.gravar(this)

        return
    }

    // async updateVaga(codigoVaga, dadosVaga) {
    //     await banco.executaComandoNonQuery('UPDATE vaga SET ? WHERE codigoVaga = ?', [dadosVaga, codigoVaga]);
    // }

    // async deleteVaga(codigoVaga) {
    //     await banco.executaComandoNonQuery('DELETE FROM vaga WHERE codigoVaga = ?', [codigoVaga]);
    // }
}
