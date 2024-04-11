import { Form, Row, Col, Button, Container } from "react-bootstrap";

function cadastroCandidato() {
  return (
    <Form>
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
    </Form>
  );
}

export default cadastroCandidato;
