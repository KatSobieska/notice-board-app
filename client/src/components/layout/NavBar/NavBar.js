import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const NavBar = () => {
  const user = useSelector(getUser);
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand>Notice board.app</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {!user && (
            <Nav.Link as={Link} to="/login">
              Sign in
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link as={Link} to="/register">
              Sign up
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="/logout">
              Sign out
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
