import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

function CadastroCandidato() {
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formdados = {
      cpf: formData.get("cpf"),
      nome: formData.get("nome"),
      endereco: formData.get("endereco"),
      telefone: formData.get("telefone"),
    };

    try {
      const response = await fetch("http://localhost:3001/candidato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdados),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem(data.mensagem);
        event.target.reset();
      } else {
        setMensagem(data.mensagem);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      setMensagem("Erro ao enviar requisição. Por favor, tente novamente.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="m-4 border">
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" required name="nome" />
          </Col>
          <Col md={12}>
            <Form.Label>CPF:</Form.Label>
            <Form.Control type="text" required name="cpf" />
          </Col>
          <Col md={12}>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control type="text" required name="endereco" />
          </Col>
          <Col md={12}>
            <Form.Label>Telefone:</Form.Label>
            <Form.Control type="tel" required name="telefone" />
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Cadastrar
        </Button>
      </Container>
      {mensagem && <p>{mensagem}</p>}
    </Form>
  );
}

export default CadastroCandidato;
