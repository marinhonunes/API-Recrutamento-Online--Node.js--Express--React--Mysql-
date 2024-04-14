/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecao({ 
    enderecoFonteDados,
    campoChave,
    campoExibicao,
    funcaoSelecao }) {
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]:"Não foi possível obter os dados do backend"
    });
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        try {
            setCarregandoDados(true);
            fetch(enderecoFonteDados, { method: "GET" }).then((resposta) => {
                console.log(resposta)
                if (resposta.ok) {  
                    return resposta.json();
                }
                else {
                    return ([{
                        [campoChave]: 0,
                        [campoExibicao]:"Não foi possível obter os dados do backend"
                    }
                    ]);
                }
            }).then((listaDados) => {
                setCarregandoDados(false);
                //console.log(listaDados)
                setDados(listaDados.listaFuncionarios);
                if (listaDados.length > 0){
                   setValorSelecionado(listaDados[0]);
                   funcaoSelecao(listaDados[0]);     
                }
            });
        } catch(erro){
            setCarregandoDados(false);
            setDados([{
                       [campoChave]: 0,
                       [campoExibicao]: "Não foi possível obter os dados do backend: " + erro.message 
                      }
                    ]);
        }

    }, []);  

    return (
        <Container border>
            <Row>
                <Col md={12}>
                    <Form.Select
                                 onChange={(evento) => {
                                    const itemSelecionado = evento.currentTarget.value;
                                    const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                                    setValorSelecionado(dados[pos]);
                                    funcaoSelecao(dados[pos]);
                                 }}>
                        {
                            dados.map((item) => {
                                return <option key={item[campoChave]} 
                                               value={item[campoChave]}>
                                                {item[campoExibicao]}
                                       </option>
                            })
                        }
                        
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    );
}