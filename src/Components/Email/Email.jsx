import { Email } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import { LocalDate, LocalTime } from "../Features/DateAndTime";
import NotAuthorizedPage from "../Features/StaticPages/NotAuthorised";
import styles from "../Features/Styles/CustomInputs.module.css";
import EmailsTable from "./AllMails/EmailTable";
import { templates } from "./Templates";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`Copyright© `}
      <Link color="inherit" href="https://mui.com/">
        ICFDR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const theme = createTheme();

export default function Emails() {
  let {
    apiLink,
    userID,
    ActivateToast,
    centers,
    role,
    isAdmin,
    setAllEmailSent,
    axios,
    userName, PostToLogs, configurationSettings, userPermissions, AllEmailSent, userEmailId
  } = React.useContext(Context);
  let [emails, setEmails] = React.useState([]);
  let [autoCompleteEmails, setAutoCompleteEmail] = React.useState([]);
  let [rawEmailData, setRawEmailData] = React.useState([]);
  let [filteredRawEmailData, setFilteredRawEmailData] = React.useState([]);
  let [templateCheck, setTemplateCheck] = React.useState(false);
  let [names, setNames] = React.useState([]);
  const [template, setTemplate] = React.useState("");

  let navigate = useNavigate();
  let [email, setEmail] = React.useState({
    email: "",
    subject: "",
    body: "",
  });
  const [recieverEmail, setRecieverEmail] = React.useState([]);
  const [category, setCategory] = React.useState("All");
  const [selectedCenter, setSelectedCenter] = React.useState("All");
  function handleCategoryChange({ target }) {
    setRecieverEmail([])
    setCategory(target.value)
  }
  function handleCenterChange({ target }) {
    setRecieverEmail([])
    setSelectedCenter(target.value)
  }
  React.useEffect(() => {
    console.log(recieverEmail)
  }, [recieverEmail])
  React.useEffect(() => {
    if (!userID) {
      navigate("/client/login");
      return;
    }
    (async () => {
      if (isAdmin) {
        let { data } = await axios.get(`${apiLink}member`);
        let tempMembers = [];
        for (let i of data.data) {
          let obj = {
            name: i.details.name,
            email: i.email,
            category: i.details.profession,
            center: i.center
          };
          if (!obj.name || !obj.email) continue;
          tempMembers.push(obj);
        }

        let tempData = [...tempMembers];
        setRawEmailData(tempData);
        setAutoCompleteEmail(tempData.map((data) => data.email));
        let temp = tempData.map((el) => {
          return el.email;
        });

        let tempNames = tempData.map((el) => {
          return { name: el.name, userID: el.userID };
        });
        setNames(tempNames);
        setEmails(temp);
      } else if (role === "Admin" || role === "Leader") {
        let { data } = await axios.post(`${apiLink}member/getDataByCenters`, {
          centers
        })
        data = data.filter(i => {
          if (userID === i.userID) return true;
          if (userID !== i.userID && !!i.hidden === true) return false;
          else return true;
        })
        let tempMembers = [];
        for (let i of data) {
          let obj = {
            name: i.details.name,
            email: i.email,
            category: i.details.profession,
            center: i.center
          };
          tempMembers.push(obj);
        }
        let tempData = [...tempMembers];
        setRawEmailData(tempData);
        setAutoCompleteEmail(tempData.map((data) => data.email));
        let temp = tempData.map((el) => {
          return el.email;
        });
        let tempNames = tempData.map((el) => {
          return { name: el.name, userID: el.userID };
        });

        setNames(tempNames);
        setEmails(temp);
      }
    })();
    (async () => {
      if (isAdmin) {
        let { data } = await axios.get(`${apiLink}emailTracker`)
        setAllEmailSent(data.data.reverse())
      } else {
        let { data } = await axios.post(`${apiLink}emailTracker/getDataByCenters`, {
          centers
        });
        setAllEmailSent(data.reverse())
      }
    })()
  }, [apiLink, centers, isAdmin, navigate, role, setAllEmailSent, userID]);

  async function sendEmail() {
    let temp = [...new Set(recieverEmail.flat())];
    if (temp.length === 0) return ActivateToast("Please select atleast one Email", "warning")

    if (templateCheck === true) {
      temp.forEach((el, i) => {
        axios.post(`${apiLink}sendMail`, {
          userID,
          email: el,
          from: { name: userName },
          subject: email.subject,
          body: templates[template](el),
        }).then((res) => { console.log(res) }).catch((err) => {
          console.log("err", err)
          ActivateToast(err.response.error, "error")
        });
        axios.post(`${apiLink}emailTracker`, {
          email: el,
          userID: userID,
          content: {
            sub: email.subject,
            body: templates[template](el),
          },
          date: new Date(),
        });
        setAllEmailSent((prev) => [
          ...prev,
          {
            email: el,
            from: { name: userName },
            userID: userID,
            content: {
              sub: email.subject,
              body: templates[template](el),
            },
            date: new Date().toLocaleDateString("en-GB"),
            time: new Date().toLocaleTimeString(),
          },
        ]);
      });
    } else {
      temp.forEach((el, i) => {
        axios.post(`${apiLink}sendMail`, {
          userID,
          email: el,
          from: { name: userName },
          subject: email.subject,
          body: email.body,
        }).then((res) => { console.log(res) }).catch((err) => {
          console.log("err", err)
          ActivateToast(err.response.error, "error")
        });
        axios.post(`${apiLink}emailTracker`, {
          email: el,
          from: { name: userName, email: userEmailId },
          userID: userID,
          content: {
            sub: email.subject,
            body: email.body,
          },
          date: LocalDate(),
          time: LocalTime(),
        });
        setAllEmailSent((prev) => [
          ...prev,
          {
            email: el,
            from: { name: userName },
            userID: userID,
            content: {
              sub: email.subject,
              body: email.body,
            },
            date: new Date().toLocaleDateString("en-GB"),
            time: new Date().toLocaleTimeString(),
          },
        ]);
      });
    }
    PostToLogs(`Sent ${temp.length > 1 ? "Emails" : "Email"} to ${temp.length === 1 ? temp[0] : temp.join(", ")}.`)
    return ActivateToast("Mails Sent", "success");
  }


  function checkIntersection(value, checkValue) {
    if (value === "All") return true;
    return checkValue.includes(value)
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRecieverEmail(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  React.useEffect(() => {
    if (category === "All" && selectedCenter === "All") {
      setFilteredRawEmailData(structuredClone(rawEmailData))
    }
    else {
      let temp = rawEmailData.filter(item => {
        return checkIntersection(category, item.category) && checkIntersection(selectedCenter, item.center)
      });
      setFilteredRawEmailData(temp)
    }
  }, [category, rawEmailData, selectedCenter])
  return isAdmin || userPermissions?.Email?.create ? (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth={["80vw", "xs"]} >
        <Box
          sx={{
            m: "auto",
            alignItems: "center",
            width: ["100%", "70%", "50%"],
            background: "rgba(255,255,255,0.8)",
            p: "10px 20px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "20px"
          }}
        >
          <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
            <Email />
          </Avatar>
          <Typography component="h1" variant="h5" className={styles.title}>
            Send Email
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <Box display={"flex"}>

              <FormControl sx={{ width: "200px", flex: "1" }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {(configurationSettings.professionCategories || []).map(i => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!(!isAdmin && centers.length == 1) && <FormControl sx={{ width: "200px", flex: "1", ml: "10px" }}>
                <InputLabel id="demo-simple-select-label">Centers</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCenter}
                  label="Centers"
                  onChange={handleCenterChange}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {((isAdmin ? configurationSettings.centers : centers) || []).map(i => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>}
            </Box>
            <br></br>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Emails</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={recieverEmail}
                  onChange={handleChange}
                  input={<OutlinedInput label="Emails" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {filteredRawEmailData.map((i, index) => (
                    <MenuItem key={i.name + index} value={i.email}>
                      <Checkbox checked={recieverEmail.indexOf(i.email) > -1} />
                      <ListItemText primary={`${i.name} - ${i.email}`} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input checked={recieverEmail.length == filteredRawEmailData.length} style={{ height: "30px", width: "30px" }} type="checkbox" onClick={({ target }) => {
                if (target.checked) {
                  setRecieverEmail(filteredRawEmailData.map(data => data.email))
                }
                else setRecieverEmail([])
              }} />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="subject"
              label="Subject"
              type="text"
              id="subject"
              onChange={(e) =>
                setEmail({ ...email, subject: e.target.value })
              }
            />

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextareaAutosize
                onChange={(e) => setEmail({ ...email, body: e.target.value })}
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "12px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                  background: "none"
                }}
                placeholder="Enter your Text"
              ></TextareaAutosize>
            </Box>
            <Button
              onClick={sendEmail}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
      <br />
      <br />
      <EmailsTable emailsData={AllEmailSent} />
      {/* <AllMails /> */}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  ) : <NotAuthorizedPage message={"You're not authorized to access this page"} />
}