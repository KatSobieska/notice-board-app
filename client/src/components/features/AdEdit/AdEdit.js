import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { editAd, getAdById } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const AdEdit = () => {
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(editAd({ ...ad, adId }));
    const options = {
      method: "PUT",
      body: ad,
    };
    fetch(`${API_URL}/api/ads/${adId}`, options);
    navigate("/");
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h2>Edit Ad</h2>
        <AdForm
          action={handleSubmit}
          actionText="Edit ad"
          title={adData.title}
          description={adData.description}
          publicationDate={adData.publicationDate}
          photo={adData.photo}
          price={adData.price}
          location={adData.location}
          seller={adData.seller}
        />
      </Col>
    </Row>
  );
};

export default AdEdit;
