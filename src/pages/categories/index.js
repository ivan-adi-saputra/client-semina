import React, { useEffect, useState } from "react";
import SNavbar from "../../components/Navbar";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/SButton";
import { Container, Table, Spinner } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";

export default function PageCategories() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoriesAPI = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesAPI();
  }, []);

  if (!token) return <Navigate to={"/signin"} />;
  return (
    <>
      <SNavbar />

      <Container className="m-5">
        <SBreadcrumb textSecond="categories" />

        <SButton
          variant="primary"
          children="Tambah"
          action={() => navigate("/categories/create")}
        />

        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: "center" }}>
                  <div className="flex text-center justify-center">
                    <Spinner animation="grow" variant="grow" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
