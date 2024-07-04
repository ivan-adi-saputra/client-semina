import React, { useState } from "react";
import SNavbar from "../../components/Navbar";
import SBreadcrumb from "../../components/Breadcrumb";
import Form from "./form";
import { Container } from "react-bootstrap";
import axios from "axios";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";

export default function CategoriesCreate() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${config.api_host_dev}/cms/categories`,
        { name: form.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/categories");
      isLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: error?.response?.data?.msg || "Internal Server Error",
      });
    }
  };

  return (
    <>
      <SNavbar />
      <Container>
        <SBreadcrumb
          textSecond={"Categories"}
          textThird={"Create"}
          urlSecond={"/categories"}
        />
        {alert.status && (
          <SAlert variant={alert.type} message={alert.message} />
        )}

        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}
