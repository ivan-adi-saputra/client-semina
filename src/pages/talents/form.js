import React from "react";
import { Form, Figure } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { config } from "../../config";
import SButton from "../../components/SButton";

export default function FormTalents({
  form,
  handleChange,
  handleSubmit,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        label="Nama"
        onChange={handleChange}
        type={"text"}
        placeholder={"Masukkan nama pembicara"}
        value={form.name}
        name={"name"}
      />
      <TextInputWithLabel
        label="Role"
        onChange={handleChange}
        type={"text"}
        placeholder={"Masukkan role pembicara"}
        value={form.role}
        name={"role"}
      />
      <TextInputWithLabel
        label="Image"
        onChange={handleChange}
        type={"file"}
        name={"avatar"}
        placeholder={"Masukkan avatar"}
      />
      {form.avatar !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={`${config.api_image}/${form.avatar}`}
            />

            <Figure.Caption>Perview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}

      <SButton variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </SButton>
    </Form>
  );
}
