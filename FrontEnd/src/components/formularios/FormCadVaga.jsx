import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useState } from "react";
function CadastroVaga() {

  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formdados = {
      cargo: formData.get("cargo"),
      salario: formData.get("salario"),
      cidade: formData.get("cidade"),
      quantidadeVagas: formData.get("quantidade"),
    };

    try {
      const response = await fetch("http://localhost:3001/vagas", {
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
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="m-4 border">
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Cargo:</Form.Label>
            <Form.Control type="text" required name="cargo" />
          </Col>
          <Col md={12}>
            <Form.Label>Salario R$:</Form.Label>
            <Form.Control type="text" required name="salario" />
          </Col>
          <Col md={12}>
            <Form.Label>Cidade:</Form.Label>
            <Form.Control type="text" required name="cidade" />
          </Col>
          <Col md={12}>
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control type="text" required name="quantidade" />
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

export default CadastroVaga;
