import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/SButton";
import TextInputWithLabel from "../../components/TextInputWithLabel";

export default function SForm({ form, handleInput, handleSubmit, loading }) {
  return (
    <Form>
      <TextInputWithLabel
        label="Email Address"
        type="email"
        placeholder="Enter Email"
        value={form.email}
        name="email"
        onChange={handleInput}
      />
      <TextInputWithLabel
        label="Password"
        type="password"
        placeholder="Enter Password"
        value={form.password}
        name="password"
        onChange={handleInput}
      />
      <SButton
        variant="primary"
        action={handleSubmit}
        children="Login"
        loading={loading}
        disabled={loading}
      />
    </Form>
  );
}
