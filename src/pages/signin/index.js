import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import SForm from "./form";
import { postData } from "../../utils/fetchData";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";

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
      const res = await postData({ url: `cms/auth/signin`, payload: form });

      dispatch(
        userLogin({
          token: res.data.data.token,
          role: res.data.data.role,
        })
      );
      navigate("/");
      setLoading(false);
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
