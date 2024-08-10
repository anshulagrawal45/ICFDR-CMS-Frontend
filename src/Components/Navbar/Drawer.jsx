import {
  Contacts,
  CurrencyRupee,
  Dashboard,
  Email,
  Home,
  Login,
  Logout,
  MeetingRoom,
  MiscellaneousServices,
  Notes,
  People,
  Person,
  ReportProblem,
  Security
} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Cookies from 'js-cookie';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../../Context';
import LogoTitle from '../LandingPage/LogoTitle';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  let navigate = useNavigate();
  const { setIsMemberLogin, setMemberLoginData, userID, setUserID, theme, setTheme, ActivateToast, setIsAdmin, isAdmin, role, setRole } = React.useContext(Context);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  let navItems = [
    { name: "Home", route: "/", logo: <Home sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Dashboard", route: "/client/dashboard", logo: <Dashboard sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Contacts", route: "/client/contacts", logo: <Contacts sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Notes", route: "/client/notes", logo: <Notes sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Meetings", route: "/client/meetings", logo: <MeetingRoom sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Email", route: "/client/emails", logo: <Email sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Members", route: "/client/addMembers", logo: <People sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Leaders", route: "/client/addLeaders", logo: <Security sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Miscellaneous", route: "/client/misc", logo: <MiscellaneousServices sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Donations", route: "/client/donations", logo: <CurrencyRupee sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Profile", route: "/client/profile", logo: <Person sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Complaints", route: "/client/complaints", logo: <ReportProblem sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Whatsapp", route: "/client/whatsApp2", logo: <WhatsAppIcon sx={{ color: theme == "dark" ? "white" : "grey" }} /> }
  ];

  let leaderNavItems = [
    { name: "Home", route: "/", logo: <Home sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Notes", route: "/client/notes", logo: <Notes sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Meetings", route: "/client/meetings", logo: <MeetingRoom sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Members", route: "/client/addMembers", logo: <People sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Leaders", route: "/client/addLeaders", logo: <Security sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Complaints", route: "/client/complaints", logo: <ReportProblem sx={{ color: theme == "dark" ? "white" : "grey" }} /> }
  ];


  let memberNavItems = [
    { name: "Home", route: "/", logo: <Home sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Notes", route: "/client/notes", logo: <Notes sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Meetings", route: "/client/meetings", logo: <MeetingRoom sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Profile", route: "/client/profile2", logo: <Person sx={{ color: theme == "dark" ? "white" : "grey" }} /> },
    { name: "Complaints", route: "/client/complaintForm", logo: <ReportProblem sx={{ color: theme == "dark" ? "white" : "grey" }} /> }
  ];

  const list = (anchor) => (
    <Box
      sx={{ height: "100vh", background: theme == "dark" ? "black" : "white", color: theme == "dark" ? "white" : "black", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {(userID ? (role === "Super Admin" ? navItems : (role === "Leader" ? leaderNavItems : memberNavItems)) : []).map((item, index) => (
          <Box key={item.name + index}>
            <NavLink to={`${item.route}`} style={{ textDecoration: "none", color: "unset" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.logo}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
          </Box>
        ))}

        {!userID &&
          <NavLink to={"/client/login"} style={{ textDecoration: "none", color: "unset" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        }

        <Divider />

        {userID &&
          <ListItem disablePadding onClick={() => {
            setUserID("")
            navigate("/")
            Cookies.set(`UserID`, JSON.stringify(""))
            Cookies.set(`isMemberLogin`, JSON.stringify(false))
            setIsMemberLogin(false)
            ActivateToast("Logged Out Successfully", "success")
          }}>
            <ListItemButton>
              <ListItemIcon>
                <Logout sx={{ color: theme == "dark" ? "white" : "grey" }} />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        }

        <Divider />

        {/* <ListItem disablePadding onClick={() => {
          theme == "dark" ? setTheme("light") : setTheme("dark");
        }}>
          <ListItemButton>
            <ListItemIcon>
              {theme == "dark" ? (
                <DarkMode sx={{ color: theme == "dark" ? "white" : "grey" }} />
              ) : (
                <LightMode />
              )}
            </ListItemIcon>
            <ListItemText primary={"Dark Mode"} />
          </ListItemButton>
        </ListItem> */}
      </List>

    </Box>
  );

  return (
    <Box display={"flex"} sx={{ background: theme == "dark" ? "rgb(32, 32, 32)" : "white" }} alignItems={"center"} justifyContent={"space-between"}>
      <Button style={{ color: "unset" }} onClick={toggleDrawer("left", true)}><MenuIcon /></Button>
      <Box p={"10px 0"}>
        <LogoTitle detail={false} />
      </Box>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Box>
  );
}
