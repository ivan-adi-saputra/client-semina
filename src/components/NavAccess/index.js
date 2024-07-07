import React from "react";
import { Nav } from "react-bootstrap";

export default function SNavLink({ role, roles, action, children }) {
  // console.log("role");
  // console.log(role);
  let isHas = roles.indexOf(role);

  return <>{isHas >= 0 && <Nav.Link onClick={action}>{children}</Nav.Link>}</>;
}
