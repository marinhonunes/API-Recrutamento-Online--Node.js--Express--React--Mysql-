import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, Table } from "react-bootstrap";

export default function FormCandidatar(props) {
  const [validado, setValidado] = useState(false);
  const [listaCandidatos, setListaCandidatos] = useState([]);
  const [listavagas, setListavagas] = useState([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
  const [vagaSelecionada, setVagaSelecionada] = useState({});
  const [inscricao, setInscricao] = useState({
    data_inscricao: "",
    horario_inscricao: "",
    vaga_id: [],
  });

  useEffect(() => {

    

    fetch("http://localhost:3001/candidato", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaCandidatos) => setListaCandidatos(listaCandidatos.lista))
      .catch(() =>
        alert("Não foi possível recuperar os candidatos do backend.")
      );

    fetch("http://localhost:3001/vagas", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listavagas) => setListavagas(listavagas.lista))
      .catch(() => alert("Não foi possível recuperar as vagas do backend."));
  }, []);

  function manipularMudanca(e) {
    const { name, value } = e.target;
    if (name === "candidatoSelecionado") {
      const candidatoId = parseInt(value);
      const selectedCandidato = listaCandidatos.find(
        (candidato) => candidato.id === candidatoId
      );
      console.log("Candidato selecionado:", selectedCandidato);
      setCandidatoSelecionado(selectedCandidato || {});
    } else {
      setInscricao({ ...inscricao, [name]: value });
    }
  }

  function gravar() {
    const novaInscricao = {
      data_inscricao: inscricao.data_inscricao,
      horario_inscricao: inscricao.horario_inscricao,
      cand_id: candidatoSelecionado.id, // Obtendo o ID do candidato selecionado
      vaga_id: inscricao.vaga_id.map((vaga) => ({ codigo: vaga.codigo_vaga })),
    };
    // Enviar os dados para o backend via POST
    fetch("http://localhost:3001/inscricoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaInscricao),
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (dados.status) {
          setInscricao({ ...inscricao, id: dados.codigo });
        }
        alert(dados.mensagem);
      })
      .catch((erro) => alert(erro.message));
  
    console.log(novaInscricao);
  }
  

  
  const adicionarVaga = () => {

    console.log(inscricao)

    // Paulo
    for(let i = 0; i < inscricao.vaga_id.length; i++){
      if(inscricao.vaga_id[i].codigo_vaga === vagaSelecionada.codigo_vaga){
          alert('Usuário já se inscreveu nessa vaga')
          return
      }

    }



    if (vagaSelecionada.codigo_vaga) {
      setInscricao((prevInscricao) => ({
        ...prevInscricao,
        vaga_id: [
          ...prevInscricao.vaga_id,
          {
            codigo_vaga: vagaSelecionada.codigo_vaga,
            cargo: vagaSelecionada.vaga_cargo,
            cidade: vagaSelecionada.vaga_cidade,
            salario: vagaSelecionada.vaga_salario,
            quantidadeVagas: vagaSelecionada.vaga_quantidade,
          },
        ],
      }));


      

    } else {
      alert("Por favor, selecione uma vaga antes de adicionar.");
    }
  };
  

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
              name="data_inscricao"
              value={inscricao.data_inscricao}
              onChange={manipularMudanca}
              // disabled
            />
          </Col>
          <Col md={6}>
            <Form.Label>Horário da Inscrição</Form.Label>
            <Form.Control
              type="time"
              required
              name="horario_inscricao"
              value={inscricao.horario_inscricao}
              onChange={manipularMudanca}
              // disabled
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Label>Candidato:</Form.Label>
            <select
              name="candidatoSelecionado"
              id="candidatoSelecionado"
              onChange={(e) => {
                const selectedCandidato = listaCandidatos.find(
                  (candidato) => candidato.id === parseInt(e.target.value)
                );
                setCandidatoSelecionado(selectedCandidato || {});
              }}
            >
              <option value=""></option>
              {listaCandidatos.map((candidato) => (
                <option key={candidato.id} value={candidato.id}>
                  {candidato.cand_nome}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Label>Selecione a Vaga:</Form.Label>
            <select
              name="vagaSelecionada"
              id="vagaSelecionada"
              onChange={(e) => {
                const selectedVaga = listavagas.find(
                  (vaga) => vaga.codigo_vaga === parseInt(e.target.value)
                );
                setVagaSelecionada(selectedVaga || {});
              }}
            >
              <option value=""></option>
              {listavagas.map((vaga) => (
                <option key={vaga.codigo_vaga} value={vaga.codigo_vaga}>
                  {vaga.vaga_cargo}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <Form.Group>
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                value={vagaSelecionada?.codigo_vaga || ""}
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
                value={vagaSelecionada?.vaga_cargo || ""}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Salário R$:</Form.Label>
              <Form.Control
                type="text"
                id="valorR"
                value={vagaSelecionada?.vaga_salario || ""}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Cidade:</Form.Label>
              <Form.Control
                type="text"
                id="cidade"
                value={vagaSelecionada?.vaga_cidade || ""}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Quantidade de Vagas:</Form.Label>
              <Form.Control
                type="text"
                id="quantidade"
                value={vagaSelecionada?.vaga_quantidade || ""}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={1} className="middle">
            <Form.Group>
              <Form.Label>Adicionar</Form.Label>
              <Button onClick={adicionarVaga}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bag-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
                  />
                </svg>
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <p>
              <strong>Vagas Selecionadas</strong>
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Cargo</th>
                  <th>Cidade</th>
                  <th>Salário</th>
                  <th>Quantidade de Vagas</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
              {inscricao.vaga_id && inscricao.vaga_id.map((vaga) => (
                  <tr key={vaga.codigo_vaga}>
                    <td>{vaga.cargo}</td>
                    <td>{vaga.cidade}</td>
                    <td>{vaga.salario}</td>
                    <td>{vaga.quantidadeVagas}</td>
                    <td>
                      <Button
                        onClick={() => {
                          const novosItens = inscricao.vaga_id.filter(
                            (i) => i.codigo_vaga !== vaga.codigo_vaga
                          );
                          setInscricao({ ...inscricao, vaga_id: novosItens });
                        }}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Cadastrar
        </Button>{" "}
      </Container>
    </Form>
  );
}
