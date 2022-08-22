import { Button, Container, Row, Col } from "react-bootstrap";
import { Alert, Progress } from "reactstrap";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllAds, getRequest, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";

import Ads from "../../features/Ads/Ads";

const HomePage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const request = useSelector(getRequest);
  console.log("ads", ads);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !ads.length)
    return <Alert color="info">No ads</Alert>;
  else if (request.success)
    return (
      <Container>
        <Row>
          <Col className="d-flex justify-content-start">
            <h2>Notice Board</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={"ad/add"} style={{ textDecoration: "none" }}>
              <Button
                className="d-flex align-items-center"
                variant="outline-info"
              >
                Add Ad
              </Button>
            </Link>
          </Col>
        </Row>
        <Ads ads={ads} />
      </Container>
    );
};

export default HomePage;
