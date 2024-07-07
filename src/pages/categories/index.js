import React, { useEffect, useState } from "react";
import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/SButton";
import SAlert from "../../components/Alert";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import { accessCategories } from "../../const/access";
import Table from "../../components/TableWithAction";
import { setNotif } from "../../redux/notif/actions";
import { deleteData } from "../../utils/fetchData";
import Swal from "sweetalert2";

export default function PageCategories() {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const notif = useSelector((state) => state.notif);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessCategories).forEach(function (key, index) {
      if (accessCategories[key].indexOf(token.role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`cms/categories/${id}`);
        dispatch(setNotif(true, "success", `berhasil hapus kategori`));
        dispatch(fetchCategories());
      }
    });
  };
  // const getCategoriesAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setData(res.data.data);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getCategoriesAPI();
  // }, []);

  // if (!token) return <Navigate to={"/signin"} />;
  return (
    <>
      <Container className="m-5">
        <SBreadcrumb textSecond="categories" />

        {access.tambah && (
          <SButton
            className={"mb-3"}
            action={() => navigate("/categories/create")}
            children={"Tambah"}
          />
        )}

        {notif.status && (
          <SAlert type={notif.typeNotif} message={notif.message} />
        )}

        <Table
          status={categories.status}
          thead={["Nama", "Aksi"]}
          data={categories.data}
          tbody={["name"]}
          editUrl={access.edit ? `/categories/edit` : null}
          deleteAction={access.hapus ? (id) => handleDelete(id) : null}
          withoutPagination
        />
      </Container>
    </>
  );
}
