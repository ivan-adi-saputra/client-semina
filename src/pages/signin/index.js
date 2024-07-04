import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import SForm from "./form";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { config } from "../../config";

function Signin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({
    status: false,
    variant: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${config.api_host_dev}/cms/auth/signin`, {
        email: form.email,
        password: form.password,
        // form,
      });

      // untuk menyimpan token dalam local storage
      localStorage.setItem("token", res.data.data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);

      const errorMessage =
        error?.response?.data?.msg || "Internal Server Error";
      setAlert({
        status: true,
        variant: "danger",
        message: errorMessage,
      });
    }
  };

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;
  return (
    <>
      <Container md={12}>
        <div className="m-auto" style={{ width: "50%" }}>
          {/* jika alert status === true maka akan menampilkan alert */}
          {alert.status && (
            <SAlert variant={alert.variant} message={alert.message} />
          )}
        </div>
        <Card style={{ width: "50%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Form Login</Card.Title>
            <SForm
              handleInput={handleInput}
              form={form}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Signin;
