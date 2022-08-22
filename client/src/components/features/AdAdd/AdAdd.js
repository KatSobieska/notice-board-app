import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { addAd } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const AdAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(addAd(ad));

    const options = {
      method: "POST",
      body: ad,
    };
    fetch(`${API_URL}/api/ads`, options);
    navigate("/");
  };

  return <AdForm action={handleSubmit} actionText="Add ad" />;
};

export default AdAdd;
