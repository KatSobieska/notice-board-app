import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { findAdBySearchPhrase, getAllAds } from "../../../redux/adsRedux";
import Ads from "../Ads/Ads";

const Search = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(findAdBySearchPhrase(searchPhrase));
  });

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
      }}
    >
      <Row className="mb-5 d-flex justify-content-center">
        <Ads ads={ads} />
      </Row>
    </section>
  );
};

export default Search;
