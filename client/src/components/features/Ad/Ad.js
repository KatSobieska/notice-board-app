import { Button, Card, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

const Ad = () => {
  return (
    <section>
      <Row className="mt-5 d-flex justify-content-around">
        <Col md={4}>
          <Card className="mb-3" style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>{}</Card.Title>
              <Card.Text>{}</Card.Text>
              <Card.Img>{}</Card.Img>
              <Link to={"/ad/"}>
                <Button>Read more</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Ad;
