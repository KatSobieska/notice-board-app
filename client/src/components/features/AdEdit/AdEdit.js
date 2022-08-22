import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { editAd, getAdById } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const AdEdit = () => {
  const { adId } = useParams();
  const adsData = useSelector((state) => getAdById(state, adId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(editAd({ ...ad, adId }));
    const options = {
      method: "PU",
      body: ad,
    };
    fetch(`${API_URL}/api/ads/:id`, options);
    navigate("/");
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h2>Edit Ad</h2>
        <AdForm
          action={handleSubmit}
          actionText="Edit ad"
          title={adsData.title}
          description={adsData.description}
          publicationDate={adsData.publicationDate}
          photo={adsData.photo}
          price={adsData.price}
          location={adsData.location}
          seller={adsData.seller}
        />
      </Col>
    </Row>
  );
};

export default AdEdit;
