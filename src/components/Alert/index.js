import React from "react";
import { Alert } from "react-bootstrap";

export default function SAlert({ variant, message }) {
  return (
    <Alert key={variant} variant={variant} dismissible={true}>
      {message}
    </Alert>
  );
}
