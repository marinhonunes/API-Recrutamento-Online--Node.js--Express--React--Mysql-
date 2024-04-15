import { useState, useEffect } from "react";
import '../../'

export default function Listas(){

    const style = {
        width: '80%',
        margin: '0 auto',
        marginTop: '70px',
    };

    const h = {
        textAlign: 'center',
    };

    const tb = {
        width: '80%',
        margin: '0 auto',
        marginTop: '70px',
    };

const [dados, setDados] = useState([])

useEffect(()=>{

    fetch("http://localhost:3001/inscricoes", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaCandidatos) => setDados(listaCandidatos.lista))
      .catch(() =>
        alert("Não foi possível recuperar os candidatos do backend.")
      );

},[])

//console.log(dados)


    return(
        <div style={style}>

            <h1 style={h}>Inscrições feitas no sistema</h1>

            <table style={tb}>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Cargo</th>
                    <th>Cidade</th>
                    <th>Salário</th>
                </tr>
                
                {
                    dados.map((item)=>(
                        <tr>
                            <td>{item.cand_nome}</td>
                            <td>{item.cand_cpf}</td>
                            <td>{item.cand_telefone}</td>
                            
                            <td>{item.vaga_cargo}</td>
                            <td>{item.vaga_cidade}</td>
                            <td>{item.vaga_salario}</td>
            
                        </tr>
                    ))
                }

            </table>

        </div>
    )
}