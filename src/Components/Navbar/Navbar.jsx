import {
  Contacts,
  CurrencyRupeeRounded,
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import s from "./navbar.module.css";
export default function Navbar() {
  let { setIsMemberLogin, setMemberLoginData, userID, setUserID, theme, setTheme, ActivateToast, setIsAdmin, isAdmin, role, setRole } = useContext(Context);
  let navigate = useNavigate()
  return (
    <Box
      className={s.nav}
      height={"100vh"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={999}
      width={"70px"}
      bgcolor={theme == "dark" ? "black" : "white"}
      color={theme == "dark" ? "white" : "black"}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      display={["none", "block"]}
    >
      <Box
        overflow={"hidden"}
        m={"0 5%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        height={"100%"}
      >
        <NavLink to="/" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Home style={{ color: theme == "dark" ? "white" : "black" }} />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Home</Typography>
          </Box>
        </NavLink>
        {(role === "Admin" || isAdmin) && <NavLink to="/client/dashboard" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Dashboard
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Dashboard</Typography>
          </Box>
        </NavLink>}
        {(role === "Admin" || isAdmin) && <NavLink to="/client/contacts" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Contacts
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Contacts</Typography>
          </Box>
        </NavLink>}
        <NavLink to="/client/notes" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Notes
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Notes</Typography>
          </Box>
        </NavLink>
        {(role === "Admin" || isAdmin || "Member") && <NavLink to="/client/meetings" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <MeetingRoom
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Meetings</Typography>
          </Box>
        </NavLink>}
        {(role === "Admin" || isAdmin) && <NavLink to="/client/emails" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Email
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Email</Typography>
          </Box>
        </NavLink>}
        {role === "Admin" || role === "Leader" || isAdmin ? <NavLink to="/client/addMembers" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <People
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Members</Typography>
          </Box>
        </NavLink> : null}
        {role === "Admin" || role === "Leader" || isAdmin ? <NavLink to="/client/addLeaders" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Security
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Leaders</Typography>
          </Box>
        </NavLink> : null}
        {(role === "Admin" || isAdmin) && <NavLink to="/client/misc" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <MiscellaneousServices
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Miscellaneous</Typography>
          </Box>
        </NavLink>}
        {(role === "Admin" || isAdmin) && <NavLink to="/client/donations" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <CurrencyRupeeRounded
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Donations</Typography>
          </Box>
        </NavLink>}
        {userID && (role === "Admin" || isAdmin) ? <NavLink to="/client/profile" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Person
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Profile</Typography>
          </Box>
        </NavLink> : null}
        {(userID && role!=="Member") && <NavLink to="/client/complaints" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <ReportProblem
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Complaints</Typography>
          </Box>
        </NavLink>}
        {(userID && role=="Member") && <NavLink to="/client/complaintForm" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <ReportProblem
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}> Complaints</Typography>
          </Box>
        </NavLink>}
        {userID && role=="Member" ? <NavLink to="/client/profile2" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <Person
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Profile</Typography>
          </Box>
        </NavLink> : null}
        {userID && (role === "Admin" || isAdmin) ? <NavLink to="/client/whatsApp2" style={{ all: "unset", cursor: "pointer" }}>
          <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
            &nbsp;&nbsp;
            <WhatsAppIcon
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Whatsapp</Typography>
          </Box>
        </NavLink> : null}
        {!userID ? (
          <NavLink
            to="/client/login"
            style={{
              all: "unset",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
              &nbsp;&nbsp;
              <Login
                style={{ color: theme == "dark" ? "white" : "black" }}
              />{" "}
              &nbsp;&nbsp;&nbsp;
              <Typography className={s.titles}> Login</Typography>
            </Box>
          </NavLink>
        ) : (

          <Box
            display={"flex"}
            justifyContent={"left</Box>"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setUserID("")
              navigate("/")
              setIsAdmin(false)
              setRole("")
              Cookies.remove(`token`)
              localStorage.removeItem(`token`)
              Cookies.remove(`UserID`)
              // Cookies.set(`UserID`, JSON.stringify(""))
              Cookies.set(`isMemberLogin`, JSON.stringify(false))
              setIsMemberLogin(false)
              setMemberLoginData({})
              ActivateToast("Logged Out Successfully", "success")
            }}
          >
            &nbsp;&nbsp;
            <Logout
              style={{ color: theme == "dark" ? "white" : "black" }}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <Typography className={s.titles}>Logout</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
