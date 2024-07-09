import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessTalents } from "../../const/access";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/SearchInput";
import SBreadcrumb from "../../components/Breadcrumb";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";
import Table from "../../components/TableWithAction";
import { fetchTalents, setKeyword } from "../../redux/talents/actions";
import SAlert from "../../components/Alert";
import SButton from "../../components/SButton";
import { useNavigate } from "react-router-dom";

export default function PageTalents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const talents = useSelector((state) => state.talents);
  const notif = useSelector((state) => state.notif);

  const [access, setAccess] = useState({
    tambah: false,
    edit: false,
    hapus: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { tambah: false, edit: false, hapus: false };
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]);

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
        const res = await deleteData(`cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus talents ${res?.data?.message?.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container>
      <SBreadcrumb textSecond={"Talents"} />

      {access.tambah && (
        <div className="mb-3">
          <SButton
            action={() => navigate("/talents/create")}
            children={"Tambah"}
          />
        </div>
      )}
      <SearchInput
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        data={talents.data}
        thead={["Name", "Avatar", "Action"]}
        tbody={["name", "avatar"]}
        editUrl={access.edit ? "/talents/edit" : ""}
        status={talents.status}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
