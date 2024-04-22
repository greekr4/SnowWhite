import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdminProd from "./AdminProd";
import AdminOption from "./AdminOption";
import AdminOrder from "./AdminOrder";
import AdminBoard from "./AdminBoard";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminDashBoard from "./AdminDashBoard";
import AdminUser from "./AdminUser";
const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  const { openPopup } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  /**
   * 커스텀 부분
   */

  const [currentPage, setCurrentPgae] = React.useState("대시보드");

  const drawer = (
    <div>
      <Toolbar>
        <Typography fontSize={"1em"} margin={"0 auto"} fontWeight={"550"}>
          <AcUnitIcon sx={{ color: "skyblue", margin: "0 0.25em 0 0" }} />
          관리자메뉴
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <Typography
          variant="h6"
          color="textSecondary"
          fontSize="0.8em"
          fontFamily="'Public Sans',sans-serif"
          fontWeight="500"
          padding="1em"
        >
          Home
        </Typography>
        <ListItem
          key={"대시보드"}
          disablePadding
          onClick={(e) => {
            setCurrentPgae(e.target.innerText);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"대시보드"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Typography
          variant="h6"
          color="textSecondary"
          fontSize="0.8em"
          fontFamily="'Public Sans',sans-serif"
          fontWeight="500"
          padding="1em"
        >
          Order
        </Typography>
        <ListItem
          key={"주문관리"}
          disablePadding
          onClick={(e) => {
            setCurrentPgae(e.target.innerText);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <GradingIcon />
            </ListItemIcon>
            <ListItemText primary={"주문관리"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Typography
          variant="h6"
          color="textSecondary"
          fontSize="0.8em"
          fontFamily="'Public Sans',sans-serif"
          fontWeight="500"
          padding="1em"
        >
          Product
        </Typography>
        <ListItem
          key={"상품관리"}
          disablePadding
          onClick={(e) => {
            setCurrentPgae(e.target.innerText);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary={"상품관리"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={"옵션관리"}
          disablePadding
          onClick={(e) => {
            setCurrentPgae(e.target.innerText);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AltRouteIcon />
            </ListItemIcon>
            <ListItemText primary={"옵션관리"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Typography
        variant="h6"
        color="textSecondary"
        fontSize="0.8em"
        fontFamily="'Public Sans',sans-serif"
        fontWeight="500"
        padding="1em"
      >
        Board
      </Typography>
      <ListItem
        key={"게시판관리"}
        disablePadding
        onClick={(e) => {
          setCurrentPgae(e.target.innerText);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary={"게시판관리"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      <Typography
        variant="h6"
        color="textSecondary"
        fontSize="0.8em"
        fontFamily="'Public Sans',sans-serif"
        fontWeight="500"
        padding="1em"
      >
        User
      </Typography>
      <ListItem
        key={"회원관리"}
        disablePadding
        onClick={(e) => {
          setCurrentPgae(e.target.innerText);
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"회원관리"} />
        </ListItemButton>
      </ListItem>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {currentPage === "상품관리" ? (
          <AdminProd openPopup={openPopup} />
        ) : currentPage === "옵션관리" ? (
          <AdminOption openPopup={openPopup} />
        ) : currentPage === "게시판관리" ? (
          <AdminBoard openPopup={openPopup} />
        ) : currentPage === "회원관리" ? (
          <AdminUser />
        ) : currentPage === "주문관리" ? (
          <AdminOrder openPopup={openPopup} />
        ) : currentPage === "대시보드" ? (
          <AdminDashBoard />
        ) : null}
      </Box>
    </Box>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
