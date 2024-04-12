import { Form, Row, Col, Button, Container } from "react-bootstrap";

function CadastroVaga() {
  return (
    <Form>
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
    </Form>
  );
}

export default CadastroVaga;
