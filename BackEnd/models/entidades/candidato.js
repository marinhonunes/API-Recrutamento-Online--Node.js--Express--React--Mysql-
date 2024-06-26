
import CandidatoDAO from '../../persistencia/candidato_dao.js'


export default class Candidato{
    cpf;
    nome;
    endereco;
    telefone;
   

    constructor(cpf,nome,endereço, telefone){
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereço;
        this.telefone = telefone;

    }

    async getAllCandidatos(nome){
        let candidadoDAO = new CandidatoDAO()
       return await candidadoDAO.buscar(nome)
        
    }

    async createCandidato(){
        let candidadoDAO = new CandidatoDAO()
        await candidadoDAO.gravar(this)
        return
    }

    // async updateCandidato(cpf, dadosCandidato){
    //     await banco.executaComandoNonQuery('UPDATE candidato SET ? WHERE cpf = ?', [dadosCandidato, cpf]);
    // }

    // async deleteCandidato(cpf){
    //     await banco.executaComandoNonQuery('DELETE FROM candidato WHERE cpf = ?', [cpf]);
    // }
}
