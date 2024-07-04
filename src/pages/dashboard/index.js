import React from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import SButton from "../../components/SButton";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" />;

  return (
    <>
      <SNavbar />

      <Container className="m-5">
        <SBreadcrumb />

        <SButton variant="primary" children="Button" />
      </Container>
    </>
  );
}
