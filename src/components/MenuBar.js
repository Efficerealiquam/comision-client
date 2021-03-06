import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="nuevo Producto"
            active={activeItem === "nuevo Producto"}
            onClick={handleItemClick}
            as={Link}
            to="/new-producto"
          />
          <Menu.Item
            name="productos"
            active={activeItem === "productos"}
            onClick={handleItemClick}
            as={Link}
            to="/productos"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
