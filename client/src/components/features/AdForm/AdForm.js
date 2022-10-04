import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { getUser } from "../../../redux/usersRedux";

const AdForm = ({ action, actionText, ...props }) => {
  const id = props.id;
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [publicationDate, setPublicationDate] = useState(new Date() || "");
  const [photo, setPhoto] = useState(props.photo || "");
  const [price, setPrice] = useState(props.price || "");
  const [location, setLocation] = useState(props.location || "");
  const [seller, setSeller] = useState(props.seller || "");
  const user = useSelector(getUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    action({
      title,
      description,
      publicationDate: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      photo,
      price,
      location,
      seller: user.login,
      id,
    });
  };

  return (
    <Row className="justify-content-center">
      <Col md={5}>
        <Form onSubmit={handleSubmit} style={{ width: "30rem" }}>
          <Form.Group className="mb-4">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label>Photo</Form.Label>
            <Form.Control
              className="mb-2"
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Label>Location</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AdForm;
