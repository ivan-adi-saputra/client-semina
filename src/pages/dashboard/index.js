import React from "react";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
  return (
    <>
      <Container className="m-5">
        <SBreadcrumb />
        <h1>Dashboard</h1>
      </Container>
    </>
  );
}
