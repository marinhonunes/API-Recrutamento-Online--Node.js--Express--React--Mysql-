const Database = require('../database');

const banco = new Database();

class Vaga {
    codigoVaga;
    cargo;
    salario;
    cidade;
    quantidadeVagas;

    constructor(codigoVaga,cargo, salario, cidade, quantidadeVagas) {
        this.codigoVaga = codigoVaga;
        this.cargo = cargo;
        this.salario = salario;
        this.cidade = cidade;
        this.quantidadeVagas = quantidadeVagas;
    }

    async getAllVagas() {
        const vagas = await banco.executaComando('SELECT * FROM vaga');
        return vagas;
    }

    async createVaga(dadosVaga) {
        await banco.executaComandoNonQuery('INSERT INTO vaga SET ?', [dadosVaga]);
    }

    async updateVaga(codigoVaga, dadosVaga) {
        await banco.executaComandoNonQuery('UPDATE vaga SET ? WHERE codigoVaga = ?', [dadosVaga, codigoVaga]);
    }

    async deleteVaga(codigoVaga) {
        await banco.executaComandoNonQuery('DELETE FROM vaga WHERE codigoVaga = ?', [codigoVaga]);
    }
}
module.exports = Vaga