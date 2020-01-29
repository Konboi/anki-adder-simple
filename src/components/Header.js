import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";

const Header = () => {
  const [active, setActive] = useState("add-card");

  return (
    <Container>
      <Menu tabular widths={2}>
        <Menu.Item
          name="Add Card"
          active={active === "add-card"}
          onClick={() => setActive("add-card")}
        />
        <Menu.Item
          name="Saved Note"
          active={active === "saved-note"}
          onClick={() => setActive("saved-note")}
        />
      </Menu>
    </Container>
  );
};

export default Header;
