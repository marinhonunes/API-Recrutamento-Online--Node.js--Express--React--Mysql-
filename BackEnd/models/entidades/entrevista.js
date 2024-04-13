import Candidado_vagaDAO from '../../persistencia/incricao_DAO.js'

export default class Candidato_vaga{
    
    data_inscricao;
    horario_inscricao;
    cand_id;
    vaga_id;

    constructor(data_inscricao, horario_inscricao, cand_id, vaga_id) {
 
        this.data_inscricao     = data_inscricao;
        this.horario_inscricao  = horario_inscricao;
        this.cand_id            = cand_id;
        this.vaga_id            = vaga_id;

    }

    // async getAllVagas() {
    //     const vagas = await banco.executaComando('SELECT * FROM vaga');
    //     return vagas;
    // }

    async createCandidato_vaga() {
        let candidato_vaga = new Candidado_vagaDAO()
        await candidato_vaga.gravar(this)
        return
    }

    // async updateVaga(codigoVaga, dadosVaga) {
    //     await banco.executaComandoNonQuery('UPDATE vaga SET ? WHERE codigoVaga = ?', [dadosVaga, codigoVaga]);
    // }

    // async deleteVaga(codigoVaga) {
    //     await banco.executaComandoNonQuery('DELETE FROM vaga WHERE codigoVaga = ?', [codigoVaga]);
    // }
}
