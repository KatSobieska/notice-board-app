import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import HomePage from "./components/pages/Home/HomePage";
import NotFound from "./components/pages/NotFound/NotFound";
import Ad from "./components/pages/Ad/Ad";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import Search from "./components/pages/Search/Search";

function App() {
  return (
    <main>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AdEdit />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;
