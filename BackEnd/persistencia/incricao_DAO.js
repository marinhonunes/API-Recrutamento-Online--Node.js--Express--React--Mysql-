import Databasee from "../models/conn.js"
import Candidato from '../models/entidades/candidato.js'
import Vagas from '../models/entidades/vaga.js'

export default class Candidado_vagaDAO{
    async gravar(candidato_vaga){
        let conexao = new Databasee()

        for( let id of candidato_vaga.vaga_id){

            let sql = "INSERT INTO candidados_vagas (data_inscricao, horarios_inscricao, cand_id, vaga_id ) VALUES (?,?,?,?)"
            let params = [candidato_vaga.data_inscricao, candidato_vaga.horario_inscricao, candidato_vaga.cand_id,id.codigo ]

            await conexao.executaComando(sql, params)
            
        }
     
        return
    }


    async buscar(nome){
        let conexao = new Databasee()
        let candidato = new Candidato()
        let vaga = new Vagas()

        let buscar = nome

        if(!buscar){
            buscar = ''
        }

        let sql = `SELECT 
        cv.cand_id,
        cv.vaga_id,
        cv.data_inscricao,
        cv.horarios_inscricao,
        
        cand.id,
        cand.cand_cpf,
        cand.cand_nome,
        cand.cand_endereco,
        cand.cand_telefone,

        vg.codigo_vaga,
        vg.vaga_cargo,
        vg.vaga_salario,
        vg.vaga_cidade,
        vg.vaga_quantidade


        FROM 
        
            candidados_vagas AS cv
        INNER JOIN
           canditados AS cand ON cand.id = cv.cand_id
        INNER JOIN
            vagas AS vg ON vg.codigo_vaga = cv.vaga_id ORDER BY cand.cand_nome
        
        ` 
        
        let registro = await conexao.executaComando(sql) 

        // let lista_id_candidatos = []
        // let lista_dados = []

        return registro

        // for(let dado of registro ){
        //     lista_id_candidatos.push(dado.id)
        //     lista_dados.push(dado)
        // }

        // console.log(lista_dados)

    }

}