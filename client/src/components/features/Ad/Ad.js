import { Button, Card, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";

const Ad = ({ title, description, _id, photo, location }) => {
  return (
    <section>
      <Row className="mt-5 d-flex justify-content-around">
        <Col>
          <Card style={{ width: "25rem" }}>
            <Card.Body className="">
              <Card.Img
                variant="top"
                src={IMAGES_URL + photo}
                className="mb-2"
                style={{ height: "10rem", objectFit: "cover" }}
              />
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Text>{location}</Card.Text>

              <Link to={"/ad/" + _id}>
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
