import { useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";

const AdPage = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!adData) return <Navigate to="/" />;
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this ad from the app. Are you
          sure you want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" to={`/ad/remove/${id}`} as={Link}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-md-center">
        <Col md={6} className="d-flex justify-content-end">
          {user && user.login === adData.seller && (
            <span>
              <Link to={"/ad/edit/" + id}>
                <Button
                  variant="outline-info"
                  size="sd"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Button variant="outline-danger" size="sd" onClick={handleShow}>
                Delete
              </Button>
            </span>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body className="">
              <Card.Img
                variant="top"
                src={IMAGES_URL + adData.photo}
                className="mb-2"
                style={{ height: "10rem", objectFit: "cover" }}
              />
              <Card.Title>{adData.title}</Card.Title>
              <Card.Text>{adData.description}</Card.Text>
              <Card.Text>{adData.seller}</Card.Text>
              <Card.Text>{adData.publicationDate}</Card.Text>
              <Card.Text>{adData.price}</Card.Text>
              <Card.Text>{adData.location}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;
