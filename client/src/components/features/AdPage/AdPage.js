import { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAdById, removeAd } from "../../../redux/adsRedux";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../../config";
import { API_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";

const AdPage = () => {
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));
  const user = useSelector(getUser);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleRemove = () => {
    dispatch(removeAd(adId));

    const options = {
      method: "DELETE",
      body: adId,
    };
    fetch(`${API_URL}/api/ads/${adId}`, options);
    navigate("/");
  };

  //   if (!adData) return <Navigate to="/" />;
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
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="justify-content-md-center">
        <Col md={6} className="d-flex justify-content-between">
          <h1>title</h1>
          {user && user.login === adData.login && (
            <span>
              <Link to={"/ad/edit/" + adId}>
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
          <p>
            <b>Seller: </b>
            Seller
          </p>
          <p>
            <b>Publication Date: </b>publicationDate
          </p>
          <p>
            <b>Title: </b>
            Title
          </p>
          <p>
            <b>Description: </b>
            Description
          </p>
          <p>
            <b>Price: </b>
            Price
          </p>
          <p>
            <b>Location: </b>
            Location
          </p>
          {/* <p src={IMAGES_URL + adData.photo} className="mb-2" /> */}
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;
