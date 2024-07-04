import React from "react";
import SNavLink from "../NavLink";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function SNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <SNavLink action={() => navigate("/")} children="Home" />
          <SNavLink
            action={() => navigate("/categories")}
            children="Categories"
          />
          <SNavLink action={() => navigate("/talents")} children="Talents" />
          <SNavLink action={() => navigate("/Events")} children="Events" />
          <SNavLink
            action={() => navigate("/participants")}
            children="Participants"
          />
          <SNavLink
            action={() => navigate("/transaction")}
            children="Transactions"
          />
        </Nav>
      </Container>
    </Navbar>
  );
}
