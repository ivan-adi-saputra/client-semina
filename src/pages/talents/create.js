import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SBreadcrumb from "../../components/Breadcrumb";
import { Container } from "react-bootstrap";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { setNotif } from "../../redux/notif/actions";

function TalentsCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      image: form.file,
      role: form.role,
      name: form.name,
    };

    const res = await postData("cms/talents", payload);
    if (res?.data?.message) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah talents ${res.data.message.name}`
        )
      );

      navigate("/talents");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={"Talents"}
        textThird={"Tambah"}
        urlSecond={"/talents"}
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default TalentsCreate;
