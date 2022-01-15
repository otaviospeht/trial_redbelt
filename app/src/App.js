import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Navbar, Nav} from "react-bootstrap";
import Incidents from "./modules/incidents/index";

function App() {
  return (
      <Router>
          <Navbar bg="dark" variant="dark" className="mb-4">
              <Container>
                  <Navbar.Brand as={Link} to="/">
                      <img
                          alt=""
                          src={logo}
                          width="30"
                          height="30"
                          className="d-inline-block align-top"
                      />{' '}
                      Incidentes
                  </Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to="/incidents">Início</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

          <Container>
              <Routes>
                  <Route path="/*" element={<Incidents/>}/>
              </Routes>
          </Container>
      </Router>
  );
}

export default App;
