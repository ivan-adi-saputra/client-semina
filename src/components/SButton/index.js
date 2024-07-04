import React from "react";
import { Button } from "react-bootstrap";

export default function SButton({
  variant,
  className,
  action,
  disabled,
  size,
  loading,
  children,
}) {
  return (
    <Button
      variant={variant}
      className={className}
      onClick={action}
      size={size}
      disabled={disabled}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}
