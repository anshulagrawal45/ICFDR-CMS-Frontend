import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as React from 'react';
import { uid } from 'uid';
import { Context } from '../../../Context';
import { templates } from '../../Email/Templates';
import { LocalDate, LocalTime } from '../../Features/DateAndTime';
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from '../../UIComponents/Button/StyledButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  height: "fit-content",
  maxHeight: "100vh",
  overflowY: "scroll",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: [1, 2],
  overflowY: "scroll"
};



export default function MeetingsCreationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { userID, axios, ActivateToast, theme, meetingsData, setMeetingsData, apiLink, centers, userName, PostToLogs, isAdmin, role, memberLoginData } = React.useContext(Context)
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [dateValue, setDateValue] = React.useState(dayjs(currentDate));
  const [priority, setPriority] = React.useState("Low")
  let [allSelectData, setAllSelectData] = React.useState([])

  const [meetingsScheduleData, setMeetingsScheduleData] = React.useState({
    leadSource: '',
    email: '',
    company: '',
    website: '',
    contactName: '',
    phone: '',
    priority: 'Low',
    subject: '',
    date: LocalDate(),
    time: LocalTime(),
    status: 'Pending',
    userID
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMeetingsScheduleData({ ...meetingsScheduleData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!userID) return ActivateToast("Login First!", "warning")
    let temp = { ...meetingsScheduleData, _id: uid(24) }
    axios.post(`${apiLink}meetings?userID=${userID}`, temp).then(res => {
      console.log(res)
      ActivateToast("Meeting Scheduled Successfully", "success")
      handleClose()
      setMeetingsData([...meetingsData, temp])
      setMeetingsScheduleData({
        leadSource: '',
        email: '',
        company: '',
        website: '',
        contactName: '',
        phone: '',
        priority: 'Low',
        subject: '',
        date: '',
        time: '',
        status: 'Pending',
        userID
      })
      PostToLogs(`${userName} scheduled a meeting on ${meetingsScheduleData.date} with ${meetingsScheduleData.contactName}`)
    }).catch(err => {
      console.log(err)
      ActivateToast("Internal Server Error", "error")
    })
    axios.post(`${apiLink}sendMail`, {
      userID,
      email: meetingsScheduleData.email,
      subject: `Meeting Scheduled With ${userName}`,
      body: templates.meetingScheduled(meetingsScheduleData.contactName, userName, meetingsScheduleData.date, meetingsScheduleData.time)
    }).then(res => { console.log(res) }).catch(err => console.log(err))

  };

  React.useEffect(() => {
    if (isAdmin) {
      (async () => {
        let { data } = await axios.get(`${apiLink}member`);
        let temp = data.data.map((el, i) => {
          return { email: el.email, name: el.details.name, phone: el.phone }
        })
        setAllSelectData(temp)
      })();
    }
    else if (role == "Member") {
      (async () => {
        try {
          let { data } = await axios.get(`${apiLink}users`);
          // console.log(data);
          data = data.data.filter((i) => {
            if (i.role === "Leader" || i.role === "Super Admin") return true;
            if(i.assignedCenter === meetingsData.center) return true;
            return false;
          });  
          // console.log(data);
          // Map the filtered data to include only email and name
          let temp = data.map((el) => {
            return { email: el?.email, name: el?.name };
          });

          // Update the state with the filtered and mapped data
          setAllSelectData(temp);
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      })();
    }

    else {
      (async () => {
        let { data } = await axios.post(`${apiLink}member/getDataByCenters`, {
          centers,
        });
        data = data.filter((i) => {
          if (userID === i.userID) return true;
          if (userID !== i.userID && !!i.hidden === true) return false;
          else return true;
        });
        let temp = data.map((el, i) => {
          return { email: el.email, name: el.details.name }
        })
        setAllSelectData(temp)
      })();
    }
  }, [apiLink, centers, isAdmin, userID])

  // console.log(memberLoginData?.center);

  return (
    <Box mt={"2%"}>
      <StyledButton text={"Schedule Meeting"} extraFunction={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box component={"form"} onSubmit={handleFormSubmit}>
          <Fade in={open}>
            <Box sx={style}>
              <Box sx={{ bgcolor: theme === "dark" ? "rgb(145, 145, 145)" : "white", width: "100%" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Typography variant='h5' className={styles.title}>Schedule A Meeting</Typography>
                </Box>
                <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 5, right: 5 }}>
                  <Close />
                </IconButton>
                <Box p={"10px"} gap={"20px"} display={["block", "block", "flex", "flex"]} justifyContent={"center"} onSubmit={handleFormSubmit}>
                  <Box width={["100%", "75%", "50%", "45%"]} className={styles.form}  >
                    <label className={styles.label}>
                      <select
                        name='contactName'
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        defaultValue={""}
                        // value={meetingsScheduleData.contactName}
                        label="Contact Name"
                        className={styles.input}
                        // onChange={handleInputChange}
                        onChange={(event) => {
                          const selectedContactName = event.target.value;
                          const selectedContact = allSelectData.find(
                            (el) => el.name === selectedContactName
                          );
                          if (selectedContact) {
                            setMeetingsScheduleData({
                              ...meetingsScheduleData,
                              email: selectedContact.email,
                              contactName: selectedContact.name,
                              phone: selectedContact.phone
                            });
                          }
                        }}
                        required
                      >
                        <option value={""}>None</option>
                        {allSelectData.map((el, i) => {
                          return <option
                            key={`${el.name}_${el.email}`} value={el.name}>
                            <b>{el.name}</b>&nbsp;({el.phone}, {el.email})
                          </option>
                        })}

                      </select>
                      <span className={styles.span} style={{ top: "25px" }}>Contact Name</span>
                    </label> <label className={styles.label}>
                      <input className={styles.input} name="phone" label="Phone" required value={meetingsScheduleData.phone} onChange={handleInputChange} />
                      <span className={styles.span}>Phone</span>
                    </label>
                    <label className={styles.label}>
                      <input className={styles.input} name="email" label="Email" value={meetingsScheduleData.email} onChange={handleInputChange} fullWidth />
                      <span className={styles.span}>Email</span>
                    </label>
                    <label className={styles.label}>
                      <input className={styles.input} name="company" label="Company" value={meetingsScheduleData.company} onChange={handleInputChange} fullWidth />
                      <span className={styles.span}>Company</span>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoItem >
                        <Typography className={styles.blueTextColor}>Select Date</Typography>
                        <MobileDatePicker onChange={(e) => {
                          let temp = new Date(e.$d)
                          let date = `${temp.getDate()}-${temp.getMonth() + 1}-${temp.getFullYear()}`
                          setMeetingsScheduleData({ ...meetingsScheduleData, date: date })
                        }} defaultValue={dateValue} />
                      </DemoItem>
                    </LocalizationProvider>

                  </Box>
                  <Box width={["100%", "75%", "50%", "45%"]} className={styles.form}>
                    <label className={styles.label}>
                      <input className={styles.input} name="leadSource" label="Lead Source" value={meetingsScheduleData.leadSource} onChange={handleInputChange} fullWidth />
                      <span className={styles.span}>Lead Source</span>
                    </label>

                    <label className={styles.label}>
                      <select
                        className={styles.input}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        defaultValue='Low'
                        label="Priority"
                        required
                        onChange={(e) => {
                          setPriority(e.target.value)
                          setMeetingsScheduleData({ ...meetingsScheduleData, priority: e.target.value });
                        }}
                      >
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                      </select>
                      <span className={styles.span}>Priority</span>
                    </label>
                    <label className={styles.label}>
                      <input className={styles.input} name="subject" label="Subject" value={meetingsScheduleData.subject} onChange={handleInputChange} fullWidth />
                      <span className={styles.span}>Subject</span>
                    </label>
                    <label className={styles.label}>
                      <input className={styles.input} name="website" label="Website" value={meetingsScheduleData.website} onChange={handleInputChange} fullWidth />
                      <span className={styles.span}>Website</span>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <Typography className={styles.blueTextColor}>Select Time</Typography>
                        <MobileTimePicker sx={{ bgcolor: theme === "dark" ? "rgb(145, 145, 145)" : "white" }} onChange={(e) => {
                          let temp = new Date(e.$d)
                          let time = `${temp.getHours()}:${temp.getMinutes()} ${temp.getHours() > 12 ? "PM" : "AM"}`
                          setMeetingsScheduleData({ ...meetingsScheduleData, time: time })
                        }} defaultValue={dayjs('2023-04-17T15:30')} />
                      </DemoItem>
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Button type='submit' sx={{ m: "auto" }}  >
                    <StyledButton text={"Submit"} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Modal>
    </Box>
  );
}