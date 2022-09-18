import { Button, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { getUser } from "../../../redux/usersRedux";

import Ads from "../../features/Ads/Ads";

const HomePage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-start">
          <h2>Notice Board</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          {user && (
            <Link to={"ad/add"} style={{ textDecoration: "none" }}>
              <Button
                className="d-flex align-items-center"
                variant="outline-info"
              >
                Add Ad
              </Button>
            </Link>
          )}
        </Col>
      </Row>
      <Ads ads={ads} />
    </Container>
  );
};

export default HomePage;
