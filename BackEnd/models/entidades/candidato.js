import Databasee from '../conn.js'
import CandidatoDAO from '../../persistencia/candidato_dao.js'

const banco = new Databasee();

export default class Candidato{
    nome;
    //dataNascimento;
   // rg;
    cpf;
    endereço;
    // numero;
    // bairro;
    // cidade;
    // uf;
    // cep;
    telefone;
    // email;
    // nomePai;
    // nomeMae;
    // estadoCivil;

    constructor(nome, cpf, endereço, telefone){
        this.nome = nome;
        // this.dataNascimento = dataNascimento;
        // this.rg = rg;
        this.cpf = cpf;
        this.endereço = endereço;
        // this.numero = numero;
        // this.bairro = bairro;
        // this.cidade = cidade;
        // this.uf = uf;
        // this.cep = cep;
        this.telefone = telefone;
        // this.email = email;
        // this.nomePai = nomePai;
        // this.nomeMae = nomeMae;
        // this.estadoCivil = estadoCivil;
    }

    // async getAllCandidatos(){
    //     const candidatos = await banco.executaComando('SELECT * FROM candidato');
    //     return candidatos;
    // }

    async createCandidato(){
        let candidadoDAO = new CandidatoDAO()
        await candidadoDAO.gravar(this)
    }

    // async updateCandidato(cpf, dadosCandidato){
    //     await banco.executaComandoNonQuery('UPDATE candidato SET ? WHERE cpf = ?', [dadosCandidato, cpf]);
    // }

    // async deleteCandidato(cpf){
    //     await banco.executaComandoNonQuery('DELETE FROM candidato WHERE cpf = ?', [cpf]);
    // }
}
