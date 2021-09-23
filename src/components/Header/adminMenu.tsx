import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Link from "src/components/Link";

const AdminMenu: React.VFC = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-elem">
      <Button
        id="fade-button"
        aria-controls="fade-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        style={{ color: "#fff" }}
      >
        Admin Menu
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/admin/books" style={{ textDecoration: "none" }}>
            Bücherverwaltung
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/admin/users" style={{ textDecoration: "none" }}>
            Bernutzerverwaltung
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/admin/orders" style={{ textDecoration: "none" }}>
            Bestellungen
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/admin/createCode" style={{ textDecoration: "none" }}>
            Gutschriften erstellen
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminMenu;
