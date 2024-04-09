const Database = require('../database');

const banco = new Database();

class Candidato{
    nome;
    dataNascimento;
    rg;
    cpf;
    endereço;
    numero;
    bairro;
    cidade;
    uf;
    cep;
    telefone;
    email;
    nomePai;
    nomeMae;
    estadoCivil;

    constructor(nome, dataNascimento, rg, cpf, endereço, numero, bairro, cidade, uf, cep, telefone, email, nomePai, nomeMae, estadoCivil){
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.rg = rg;
        this.cpf = cpf;
        this.endereço = endereço;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
        this.telefone = telefone;
        this.email = email;
        this.nomePai = nomePai;
        this.nomeMae = nomeMae;
        this.estadoCivil = estadoCivil;
    }

    async getAllCandidatos(){
        const candidatos = await banco.executaComando('SELECT * FROM candidato');
        return candidatos;
    }

    async createCandidato(dadosCandidato){
        await banco.executaComandoNonQuery('INSERT INTO candidato SET ?', [dadosCandidato]);
    }

    async updateCandidato(cpf, dadosCandidato){
        await banco.executaComandoNonQuery('UPDATE candidato SET ? WHERE cpf = ?', [dadosCandidato, cpf]);
    }

    async deleteCandidato(cpf){
        await banco.executaComandoNonQuery('DELETE FROM candidato WHERE cpf = ?', [cpf]);
    }
}
module.exports = Candidato