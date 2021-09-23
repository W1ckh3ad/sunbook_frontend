import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ShoppingCartOutlined,
  Login,
  PersonOutline,
  AppRegistration,
  Logout,
} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import AdminMenu from "./adminMenu";
import cookie from "js-cookie";
import parseJwt from "src/utils/parseJwt";

interface IHeaderProps {}

const mainNav = [
  {
    name: "Bücher",
    href: "/books",
  },
  { name: "Gutscheine", href: "/buyVoucher" },
];

const accountNavHandler = (login: boolean = false) => {
  if (login) {
    return [
      {
        name: "Account",
        icon: PersonOutline,
        href: "/account",
      },
      { name: "Logout", icon: Logout, href: "/logout" },
    ];
  }
  return [
    {
      name: "Register",
      icon: AppRegistration,
      href: "/signup",
    },
    {
      name: "Einloggen",
      icon: Login,
      href: "/signin",
    },
  ];
};

const iconNav = [
  {
    name: "Warenkorb",
    icon: ShoppingCartOutlined,
    href: "/shoppingcart",
  },
];
const Header: React.VFC<IHeaderProps> = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    console.log("render head");
    const jwtObj = parseJwt(cookie.get("jwt"));
    const isAdmin = jwtObj.role === "admin";
    setIsAdmin(isAdmin);
    console.log("JWTashdnsan das", jwtObj);
    setIsLoggedIn(jwtObj.exp !== undefined);
  });
  const accountNav = accountNavHandler(isLoggedIn);
  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: "25px" }} variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Link passHref href="/">
            <Button color="inherit" component="a" className="nav-elem">
              Sunbook
            </Button>
          </Link>
          {mainNav.map((elem) => (
            <Link passHref href={elem.href} key={elem.name}>
              <Button color="inherit" component="a" className="nav-elem">
                {elem.name}
              </Button>
            </Link>
          ))}
          {isAdmin && <AdminMenu />}

          {accountNav.map((x, i) => (
            <Link passHref href={x.href} key={x.href}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label={x.name}
                component="a"
                style={{ marginLeft: i === 0 ? "auto" : "" }}
                title={x.name}
              >
                <x.icon />
              </IconButton>
            </Link>
          ))}
          {iconNav.map((elem) => (
            <Link passHref href={elem.href} key={elem.name}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label={elem.name}
                component="a"
                title={elem.name}
              >
                <elem.icon />
              </IconButton>
            </Link>
          ))}
          <Drawer
            anchor={"left"}
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
          >
            <Link passHref href="/">
              <Button color="inherit" style={{ marginTop: ".5rem" }}>
                Sunbook
              </Button>
            </Link>

            <List>
              {mainNav.map((elem) => (
                <Link passHref href={elem.href} key={elem.name}>
                  <ListItem button component="a">
                    <ListItemText primary={elem.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {accountNav.map((x) => (
                <Link passHref href={x.href} key={x.href}>
                  <ListItem button component="a" title={x.name}>
                    <ListItemIcon>
                      <x.icon />
                    </ListItemIcon>
                    <ListItemText primary={x.name} />
                  </ListItem>
                </Link>
              ))}
              {iconNav.map((elem) => (
                <Link passHref href={elem.href} key={elem.name}>
                  <ListItem button component="a" title={elem.name}>
                    <ListItemIcon>
                      <elem.icon />
                    </ListItemIcon>
                    <ListItemText primary={elem.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
