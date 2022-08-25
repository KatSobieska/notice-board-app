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
    const fd = new FormData();
    fd.append("title", ad.title);
    fd.append("description", ad.description);
    fd.append("publicationDate", ad.publicationDate);
    fd.append("photo", ad.photo);
    fd.append("price", ad.price);
    fd.append("location", ad.location);
    fd.append("seller", ad.seller);

    const options = {
      method: "POST",
      body: fd,
    };
    fetch(`${API_URL}/api/ads`, options);
    navigate("/");
  };

  return <AdForm action={handleSubmit} actionText="Add ad" />;
};

export default AdAdd;
