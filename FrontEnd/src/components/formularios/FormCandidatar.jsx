import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import BarraBusca from "../busca/BarraBusca.jsx";
import CaixaSelecao from "../busca/CaixaSelecao.jsx";
import TabelaVagas from "../tabela/TabelaVagas.jsx";

export default function FormCandidatar(props) {
  const [validado, setValidado] = useState(false);
  const [listaCandidatos, setListaCandidatos] = useState([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
  const [vagaSelecionada, setVagaSelecionada] = useState({});

  const [inscricao, setinscricao] = useState({
    id: 0,
    datainscricao: "",
    total: 0,
    cliente: {
      codigo: candidatoSelecionado.codigo,
    },
    itens: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/candidato", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaCandidatos) => {
        setListaCandidatos(listaCandidatos);
        
      })
      .catch((erro) => {
        alert("Não foi possível recuperar os candidatos do backend.");
      });
  }, []);

  function manipularMudanca(e) {
    const alvo = e.target.name;
    if (e.target.type === "checkbox") {
      setinscricao({ ...inscricao, [alvo]: e.target.checked });
    } else {
      setinscricao({ ...inscricao, [alvo]: e.target.value });
    }
  }

  function gravar() {
    //descrever o formato esperado pelo backend do candidato
    const itensInscricao = inscricao.itens.map((item) => ({
      candidato: { codigo: item.codigo },
      descricaoOs: item.descricao,
      precoUnitario: parseFloat(item.preco),
    }));

    const datainscricaoFormatada = new Date(inscricao.datainscricao).toLocaleDateString(
      "en-GB"
    ); // Formatando a data para 'DD/MM/YYYY'

    const Inscricao = {
      cliente: candidatoSelecionado
        ? { codigo: candidatoSelecionado.codigo }
        : null,
      datainscricao: datainscricaoFormatada,
      total: parseFloat(inscricao.total),
      itensInscricao: itensInscricao,
    };

    // Enviar o objeto para o backend
    fetch("http://localhost:3001/inscricoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Inscricao),
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.status) {
          setinscricao({ ...inscricao, id: dados.codigo });
        }
        alert(dados.mensagem);
      })
      .catch((erro) => alert(erro.message));
  }

  const manipulaSubmissao = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidado(false);
      gravar();
    } else {
      setValidado(true);
    }
    event.preventDefault();
    event.stopPropagation();
  };
  

  return (
    <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
      <Container className="m-4 border">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Data da Inscrição</Form.Label>
            <Form.Control
              type="date"
              required
              name="datainscricao"
              value={inscricao.datainscricao}
              onChange={manipularMudanca}
              disabled
            />
          </Col>
          <Col md={6}>
            <Form.Label>Horário da Inscrição</Form.Label>
            <Form.Control
              type="time"
              required
              name="horarioinscricao"
              value={inscricao.horarioinscricao}
              onChange={manipularMudanca}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Label>Candidato:</Form.Label>
            <BarraBusca
              campoBusca={"cand_nome"}
              campoChave={"cand_cpf"}
              dados={listaCandidatos}
              funcaoSelecao={setCandidatoSelecionado}
              placeHolder={"Selecione um candidato"}
              valor={""}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Label>Selecione a Vaga:</Form.Label>
            <CaixaSelecao
              enderecoFonteDados={"http://localhost:3001/vagas"}
              campoChave={"codigo_vaga"}
              campoExibicao={"vaga_cargo"}
              funcaoSelecao={setVagaSelecionada}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={1}>
                <Form.Group>
                  <Form.Label>ID:</Form.Label>
                  <Form.Control
                    type="text"
                    value={vagaSelecionada?.codigo_vaga}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Cargo:</Form.Label>
                  <Form.Control 
                  type="text" 
                  id="cargo"
                  value={vagaSelecionada?.vaga_cargo}
                  disabled />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Salário R$:</Form.Label>
                  <Form.Control 
                  type="text" 
                  id="valorR"
                  value={vagaSelecionada?.vaga_salario}
                  disabled />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Cidade:</Form.Label>
                  <Form.Control 
                  type="text" 
                  id="cidade"
                  value={vagaSelecionada?.vaga_cidade} 
                  disabled />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Quantidade de Vagas:</Form.Label>
                  <Form.Control 
                  type="text" 
                  id="quantidade"
                  value={vagaSelecionada?.vaga_quantidade}
                  disabled />
                </Form.Group>
              </Col>

              <Col md={1} className="middle">
                <Form.Group>
                  <Form.Label>Adicionar</Form.Label>
                  <Button
                  onClick={() => {
                    setinscricao({
                      ...inscricao,
                      itens: [
                        ...inscricao.itens,
                        {
                        codigo: vagaSelecionada?.codigo_vaga,
                        descricao:
                        document.getElementById("descricaoDoServico").value,
                        preco: document.getElementById("valorR").value,
                        },
                      ],
                    });
                  }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bag-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                      />
                    </svg>
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <p>
              <strong>Vagas Selecionadas</strong>
            </p>
            <TabelaVagas
              listaItens={inscricao.itens}
              setinscricao={setinscricao}
              dadosinscricao={inscricao}
            />
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Cadastrar
        </Button>{" "}
      </Container>
    </Form>
  );
}
