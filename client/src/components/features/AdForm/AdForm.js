import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createAd } from "../../../redux/adsRedux";

const AdForm = ({ action, actionText, ...props }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [publicationDate, setPublicationDate] = useState(
    props.publicationDate || new Date()
  );
  const [photo, setPhoto] = useState(props.photo || "");
  const [price, setPrice] = useState(props.price || "");
  const [location, setLocation] = useState(props.location || "");
  const [seller, setSeller] = useState(props.seller || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createAd({
        title,
        description,
        publicationDate,
        photo,
        price,
        location,
        seller,
      })
    );
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
            <Form.Label>Publication Date</Form.Label>
            <Form.Control
              className="mb-2"
              type="date"
              placeholder="Enter Date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
            <Form.Label>Photo</Form.Label>
            <Form.Control
              className="mb-2"
              type="file"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
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
            <Form.Label>Seller</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter seller"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AdForm;
