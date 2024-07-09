import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import SForm from "./form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      const res = await axios.post(
        `${config.api_host_dev}/cms/auth/signin`,
        form
      );

      dispatch(userLogin(res.data.data.token, res.data.data.role));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setAlert({
        status: true,
        message: error?.response?.data?.msg ?? "Internal server error",
        type: "danger",
      });
    }
  };

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
