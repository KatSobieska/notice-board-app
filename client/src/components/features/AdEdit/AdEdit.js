import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { getAdById, updateAd } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const AdEdit = () => {
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    const options = {
      method: "PUT",
      body: ad,
      credentials: "include",
    };
    fetch(`${API_URL}/api/ads/${id}`, options)
      .then(() => {
        dispatch(updateAd({ ...ad, id }));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
          id={id}
        />
      </Col>
    </Row>
  );
};

export default AdEdit;
