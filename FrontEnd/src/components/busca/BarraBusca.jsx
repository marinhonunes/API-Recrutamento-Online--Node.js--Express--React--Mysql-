import { useState, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
export default function BarraBusca({ placeHolder,
    dados,
    campoChave,
    campoBusca,
    funcaoSelecao,
    valor }) {

    const inputBusca = useRef();
    const [termoBusca, setTermoBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState(dados);
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado() {
        setDadosLista(dados.filter((item) => {
            return termoBusca.length > 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()) : false
        }
        )
        );
        let componenteResultado = document.querySelector('[data-resultado]');
        if (dadosLista.length > 0) {
            componenteResultado.style.display = 'block';
        }
        else {
            componenteResultado.style.display = "none";
        }

    }

    return (
        <Container>
            <div className='barra'>
                <Form.Control
                    type="text"
                    ref={inputBusca}
                    placeholder={placeHolder}
                    value={termoBusca}
                    required
                    onChange={e => {
                        setTermoBusca(e.target.value.toLowerCase());
                        filtrarResultado();
                        if (!itemSelecionado) {
                            e.target.setAttribute('aria-invalid', true);
                            e.target.setCustomValidity('erro');
                        }
                        else {
                            e.target.removeAttribute('aria-invalid');
                            e.target.setCustomValidity("");
                        }
                    }}
                ></Form.Control>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                    onClick={() => {
                        setTermoBusca('');
                        filtrarResultado();
                        setItemSelecionado(false);
                        funcaoSelecao({});
                        inputBusca.current.setAttribute('aria-invalid', true);
                        inputBusca.current.setCustomValidity("erro");
                    }}
                >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div className='resultado'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setTermoBusca(item[campoBusca]);
                                    setItemSelecionado(true);
                                    funcaoSelecao(item);
                                    inputBusca.current.setCustomValidity("");
                                    let componenteResultado = document.querySelector('[data-resultado]');
                                    componenteResultado.style.display = "none";
                                }}>
                                {
                                    item[campoChave] + '-' + item[campoBusca]
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </Container >
    );

}