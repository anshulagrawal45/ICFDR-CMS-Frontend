
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { whatsAppTemplates } from "./Templates";
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Context } from "../../Context";

import { useNavigate } from "react-router-dom";
import NotAuthorizedPage from "../Features/StaticPages/NotAuthorised";
import WhatsAppTable from "./WhatsAppTable";
import { LocalDate, LocalTime } from "../Features/DateAndTime";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright Â© "}
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

export default function WhatsApp() {
  let {
    apiLink,
    userID,
    axios,
    ActivateToast,
    centers,
    role,
    isAdmin,
    userPermissions,
    sendWhatsAppMessage, PostToLogs, configurationSettings, userName, userWhatsApp,
    userEmailId,sendSMS
  } = React.useContext(Context);
  let [emails, setEmails] = React.useState([]);
  let [autoCompleteEmails, setAutoCompleteEmail] = React.useState([]);
  let [rawEmailData, setRawEmailData] = React.useState([]);
  let [filteredRawEmailData, setFilteredRawEmailData] = React.useState([]);
  let [check, setCheck] = React.useState(false);
  let [templateCheck, setTemplateCheck] = React.useState(false);
  let [selectAll, setSelectAll] = React.useState(false);
  let [names, setNames] = React.useState([]);
  const [template, setTemplate] = React.useState("");
  const [allMessagesSent, setAllMessagesSent] = React.useState([]);

  let navigate = useNavigate();

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
    setTemplateCheck(true);
  };
  let [email, setEmail] = React.useState({
    // It is the body of the sent email
    email: "",
    subject: "",
    body: "",
  });
  const [recieverEmail, setRecieverEmail] = React.useState([]);
  const [category, setCategory] = React.useState("All");
  const [selectedCenter, setSelectedCenter] = React.useState("All");

  const [via, setVia] = React.useState("whatsApp");
  function handleCategoryChange({ target }) {
    setRecieverEmail([])
    setCategory(target.value)
  }
  function handleCenterChange({ target }) {
    setRecieverEmail([])
    setSelectedCenter(target.value)
  }

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
            mobile: i.details.whatsappNumber,
            category: i.details.profession,
            center: i.center
          };
          if (!obj.name || !obj.mobile) continue;
          tempMembers.push(obj);
        }

        let tempData = [...tempMembers];
        setRawEmailData(tempData);
        setAutoCompleteEmail(tempData.map((data) => data.mobile));
        let temp = tempData.map((el) => {
          return el.mobile;
        });

        let tempNames = tempData.map((el) => {
          return { name: el.name, userID: el.userID };
        });
        setNames(tempNames);
        setEmails(temp);
      } else if (role == "Admin" || role == "Leader") {
        let { data } = await axios.post(`${apiLink}member/getDataByCenters`, {
          centers
        })
        data = data.filter(i => {
          if (userID == i.userID) return true;
          if (userID != i.userID && !!i.hidden == true) return false;
          else return true;
        })
        let tempMembers = [];
        for (let i of data) {
          let obj = {
            name: i.details.name,
            mobile: i.details.whatsappNumber || i.phone,
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
        let { data } = await axios.get(`${apiLink}whatsappTracker`)
        setAllMessagesSent(data.data)
        console.log(data)
      } else {
        let { data } = await axios.post(`${apiLink}whatsappTracker/getDataByCenters`, {
          centers
        });
        console.log(data)
        setAllMessagesSent(data)
      }
    })()
  }, [apiLink, centers, isAdmin, navigate, role, userID]);

  async function sendEmail() {
    let temp = [...new Set(recieverEmail.flat())];
    if (temp.length === 0) return ActivateToast("Please select atleast one Number", "warning")

    if (templateCheck === true) {
      temp.forEach((el, i) => {
        sendWhatsAppMessage(el, whatsAppTemplates[template](el))
        // sendSMS(el, whatsAppTemplates[template](el))
        axios.post(`${apiLink}whatsappTracker`, {
          email: el,
          userID: userID,
          content: {
            body: whatsAppTemplates[template](el),
          },
          date: new Date(),
          center: centers || []
        });
      });
    } else {
      temp.forEach((el, i) => {
        // sendSMS(el, email.body)
        sendWhatsAppMessage(el, `${email.body}
        This text is sent by ${userName}, you can contact him/her by contacting in this WhatsApp number: ${userWhatsApp} `)
        console.log({
          mobile: el,
          from: { name: userName, email: userEmailId },
          userID: userID,
          content: {
            body: email.body,
          },
          date: new Date(),
          center: centers || []
        })
        axios.post(`${apiLink}whatsapptracker`, {
          mobile: el,
          from: { name: userName, email: userEmailId },
          userID: userID,
          content: {
            body: email.body,
          },
          date: LocalDate(),
          time:LocalTime(),
          center: centers || []
        });
      });
    }
    PostToLogs(`Sent ${temp.length > 1 ? "WhatsApp Messages" : "WhatsApp Message"} to ${temp.length === 1 ? temp[0] : temp.join(", ")}.`)
    return ActivateToast("Message Sent", "success");
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
  return isAdmin || userPermissions?.WhatsApp?.create ? (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <WhatsAppIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Send WhatsApp Message
            </Typography>
            <Box display={"flex"} width={"100%"} gap={"20px"}>
              <Button onClick={()=>setVia("whatsApp")} sx={{flex:1,bgcolor:via=="whatsApp"?"lightgreen":"lightgray",textTransform:"none",color:"black","&:hover":{flex:1,bgcolor:via=="whatsApp"?"lightgreen":"lightgray",textTransform:"none",color:"black"}}}>WhatsApp</Button>
              <Button onClick={()=>setVia("sms")} sx={{flex:1,bgcolor:via!=="whatsApp"?"lightgreen":"lightgray",textTransform:"none",color:"black","&:hover":{flex:1,bgcolor:via!=="whatsApp"?"lightgreen":"lightgray",textTransform:"none",color:"black"}}}>SMS</Button>
            </Box>
            <Box noValidate sx={{ mt: 1 }}>
              <Box display={"flex"}>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    {(configurationSettings.professionCategories || []).map((i,index) => (
                      <MenuItem key={i+index} value={i}>{i}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {!(!isAdmin && centers.length === 1) && <FormControl sx={{ width: "200px", ml: "10px" }}>
                  <InputLabel id="demo-simple-select-label">Centers</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCenter}
                    label="Centers"
                    onChange={handleCenterChange}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    {((isAdmin ? configurationSettings.centers : centers) || []).map((i, index) => (
                      <MenuItem value={i} key={index}>{i}</MenuItem>
                    ))}
                  </Select>
                </FormControl>}
              </Box>
              <br></br>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl sx={{ width: 400 }}>
                  <InputLabel id="demo-multiple-checkbox-label">WhatsApp</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={recieverEmail}
                    onChange={handleChange}
                    input={<OutlinedInput label="WhatsApp" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {filteredRawEmailData.map((i, index) => (
                      <MenuItem key={i.name + index} value={i.mobile}>
                        <Checkbox checked={recieverEmail.indexOf(i.mobile) > -1} />
                        <ListItemText primary={`${i.name} - ${i.mobile}`} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input checked={recieverEmail.length == filteredRawEmailData.length} style={{ height: "30px", width: "30px" }} type="checkbox" onClick={({ target }) => {
                  if (target.checked) {
                    setRecieverEmail(filteredRawEmailData.map(data => data.mobile))
                  }
                  else setRecieverEmail([])
                }} />
              </Box>
              {/* <TextField
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
              /> */}
              <br />
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Checkbox
                  onChange={() => {
                    setTemplateCheck(false);
                  }}
                  checked={templateCheck === false}
                />
                <TextareaAutosize
                  onChange={(e) => setEmail({ ...email, body: e.target.value })}
                  disabled={templateCheck === false ? false : true}
                  style={{
                    width: "100%",
                    height: "200px",
                    padding: "12px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    resize: "vertical"
                  }}
                  placeholder="Enter your text"
                ></TextareaAutosize>
              </Box>

              <Typography textAlign={"center"}>OR</Typography>
              <Box display={"flex"}>
                <Checkbox
                  onChange={() => {
                    setTemplateCheck(true);
                  }}
                  checked={templateCheck == true}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                  <InputLabel id="demo-select-small-label">Template</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={template}
                    label="Template"
                    disabled={templateCheck == true ? false : true}
                    onChange={handleTemplateChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={`thankYou`}>Thank You</MenuItem>
                    <MenuItem value={`welcome`}>Welcome</MenuItem>
                  </Select>
                </FormControl>
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
      </ThemeProvider>
      <WhatsAppTable whatsAppData={allMessagesSent} />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  ) : <NotAuthorizedPage message={"You're Not authorized to access this page"} />
}