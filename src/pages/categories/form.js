import React from "react";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SButton from "../../components/SButton";

export default function CategoriesForm({
  handleSubmit,
  handleChange,
  form,
  isLoading,
  edit,
}) {
  return (
    <>
      <Form>
        <TextInputWithLabel
          placeholder={"Masukkan nama kategori"}
          label={"Nama Kategori"}
          name="name"
          value={form.name}
          type="text"
          onChange={handleChange}
        />

        <SButton
          variant={"primary"}
          action={handleSubmit}
          isLoading={isLoading}
          children={edit ? "Ubah" : "Simpan"}
        />
      </Form>
    </>
  );
}
