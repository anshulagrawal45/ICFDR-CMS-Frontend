import { Check, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import * as React from "react";
import { uid } from "uid";
import { Context } from "../../../Context";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90%","50%"],
  height: "80vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: [1,2,3,4],
};

export default function ContactCreationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { userID, ActivateToast, axios, theme, contactsData, setContactsData, apiLink } =
    React.useContext(Context);
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [dateValue, setDateValue] = React.useState(dayjs(currentDate));
  const [newContactData, setNewContactData] = React.useState({
    leadSource: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    moreContacts: [{ contactName: "", contactMobile: "" }],
    department: "",
    dob: "",
    userID,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContactData({ ...newContactData, [name]: value });
  };

  const handleMoreContactChange = (event, index) => {
    const { name, value } = event.target;
    const updatedContacts = [...newContactData.moreContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: value,
    };
    console.log(updatedContacts[index])
    setNewContactData((prevData) => ({
      ...prevData,
      moreContacts: updatedContacts,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!userID) return ActivateToast("Login First!", "warning");
    let temp = { ...newContactData, _id: uid(24) };
    setNewContactData(temp);
    setContactsData([...contactsData, temp]);

    console.log(temp)
    let data = await axios.post(`${apiLink}contacts?userID=${userID}`, temp);
    if (data.data.errors) console.log(data.data.errors);
    if (data.data.errors)
      return ActivateToast("Internal Server Error", "error");
    axios.post(`${apiLink}customersInfo`, {
      name: temp.name,
      email: temp.email || "",
      contact: temp.phone || "",
      userID,
    });
    ActivateToast("Contact Added Successfully", "success");
    setContactsData([...contactsData, temp]);
    handleClose();
  };

  return (
    <Box mt={"2%"}>
      <StyledButton text={"Create Contact"} tooltip={"Create a New Contact"} extraFunction={handleOpen} />
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
              <Box
                sx={{
                  bgcolor: theme === "dark" ? "rgb(145, 145, 145)" : "white",
                }}
              >
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Typography variant="h5" textAlign={"center"} className={styles.title}>
                    Create A Contact
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 5, right: 5 }}
                >
                  <Close />
                </IconButton>
                <Typography variant="h6" className={styles.blueTextColor}>Account Information</Typography>
                <Box
                  p={"10px"}
                  // gap={"20px"}
                  // display={["block", "block", "flex", "flex"]}
                  // justifyContent={"center"}
                  onSubmit={handleFormSubmit}
                  className={styles.form}
                >
                  {/* <Box className={styles.form}> */}
                  <div className={styles.flex}>

                    <label className={styles.label}>
                      <input
                        name="name"
                        label="Name"
                        value={newContactData.name}
                        className={styles.input}
                        onChange={handleInputChange}
                        fullWidth
                        required
                      />
                      <span className={styles.span}>Name</span>
                    </label>
                    <label className={styles.label}>
                      <input
                        name="phone"
                        label="Phone"
                        value={newContactData.phone}
                        className={styles.input}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      <span className={styles.span}>Phone</span>
                    </label>
                  </div>
                    <label className={styles.label}>
                      <input
                        name="email"
                        label="Email"
                        value={newContactData.email}
                        className={styles.input}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      <span className={styles.span}>Email</span>
                    </label>
                    <div className={styles.flex}>
                    <label className={styles.label}>
                      <input
                        name="company"
                        label="Company"
                        value={newContactData.company}
                        className={styles.input}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      <span className={styles.span}>Company</span>
                    </label>
                    <label className={styles.label}>
                      <input
                        name="website"
                        label="Website"
                        value={newContactData.website}
                        className={styles.input}
                        onChange={handleInputChange}
                        fullWidth
                      />
                      <span className={styles.span}>Website</span>
                    </label>
                    </div>
                    <Box>
                      <Typography className={styles.blueTextColor} variant="body2">Date of Birth</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem>
                          <MobileDatePicker
                            sx={{
                              bgcolor:
                                theme === "dark"
                                  ? "rgb(145, 145, 145)"
                                  : "white",
                            }}
                            onChange={(e) => {
                              let temp = new Date(e.$d);
                              let date = `${temp.getDate()}-${temp.getMonth() + 1
                                }-${temp.getFullYear()}`;
                              setNewContactData({
                                ...newContactData,
                                dob: date,
                              });
                            }}
                            defaultValue={dateValue}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </Box>
                    <div className={styles.flex}>
                    <label className={styles.label}>
                      <input className={styles.input}
                        name="leadSource"
                        label="Lead Source"
                        value={newContactData.leadSource}
                        onChange={handleInputChange}
                      />
                      <span className={styles.span}>Lead Source</span>
                    </label>
                    <label className={styles.label}>
                      <input
                        name="department"
                        label="Department"
                        value={newContactData.department}
                        className={styles.input}
                        onChange={handleInputChange}
                      />
                      <span className={styles.span}>Department</span>
                    </label>
                    </div>
                    {newContactData.moreContacts.map((el, i) => {
                      return (
                        <React.Fragment key={i}>
                        <div className={styles.flex}>
                          <label className={styles.label}>
                            <input
                              name="contactName"
                              label={`Contact Name ${i + 1}`}
                              value={el.contactName}
                              className={styles.input}
                              onChange={(event) => handleMoreContactChange(event, i)} // Pass the index to handleInputChange
                              fullWidth
                            />
                            <span className={styles.span}>Contact Name</span>
                          </label>
                          <label className={styles.label}>

                            <input
                              name="contactMobile"
                              label={`Contact Mobile ${i + 1}`}
                              value={el.contactMobile}
                              className={styles.input}
                              onChange={(event) => handleMoreContactChange(event, i)} // Pass the index to handleInputChange
                              fullWidth
                            />
                            <span className={styles.span}>Contact Number</span>
                          </label>
                        </div>
                        </React.Fragment>
                      );
                    })}
                    <StyledButton
                      extraFunction={() => {
                        setNewContactData((prev) => ({
                          ...prev,
                          moreContacts: [
                            ...prev.moreContacts,
                            { contactName: "", contactMobile: "" },
                          ],
                        }));
                      }}
                      text={"Add Contact"}
                      tooltip={"Add More Contact"}
                    >
                      Add Contact
                    </StyledButton>
                  {/* </Box> */}
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    type="submit"
                    sx={{ m: "auto" }}
                  >
                    <StyledButton text={"Submit"} icon={<Check />} />
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
