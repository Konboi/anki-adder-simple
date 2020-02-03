import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("add-card");

  return (
    <Container style={{ paddingTop: 10 + "px" }}>
      <Menu tabular widths={2}>
        <Menu.Item
          name="Add Card"
          active={active === "add-card"}
          onClick={() => setActive("add-card")}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="Saved Note"
          active={active === "saved-note"}
          onClick={() => setActive("saved-note")}
          as={Link}
          to="/save"
        />
      </Menu>
    </Container>
  );
};

export default Header;
