import { Close, PersonAdd } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { uid } from "uid";
import { Context } from "../../../Context";
import { templates } from "../../Email/Templates";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90%", 450],
  height: "90vh",
  maxHeight: "100vh",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 2,
  overflowY: "scroll",
};

export default function EmployeeCreation() {
  let {
    isAdmin,
    userPermissions,
    configurationSettings,
    universalLoading,
    employeesData,
    setEmployeesData,
    userID,
    ActivateToast,
    apiLink,
    axios,
    userName,
    PostToLogs,
    sendWhatsAppMessage,
    userWhatsApp,
    assignedCenter,
  } = React.useContext(Context);
  let submitRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedCenters, setSelectedCenters] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isCenterSelected, setIsCenterSelected] = React.useState(false); // to check wether atleast one center is filled or not

  const [newEmployeeData, setNewEmployeeData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    whatsApp: "",
    assignedCenter: assignedCenter || "",
    creator: {
      name: userName,
      _id: userID,
    },
    permissions: {
      Admin: {
        create: false,
        update: false,
        delete: false,
      },
      Leader: {
        create: false,
        update: false,
        delete: false,
      },
      "Social Activity": {
        "create": true,
        "update": true,
        "delete": true
      },
      Center: {
        create: false,
        update: false,
        delete: false,
      },
      // WhatsApp: {
      //   create: false,
      //   update: false,
      //   delete: false,
      // },
      Configuration: {
        create: false,
        update: false,
        delete: false,
      },
      categoryPermission: {
        create: false,
        update: true,
        delete: true,
      },
    },
    password_changed: false,
    details: {
      address: "",
      centreName: "",
      designation: "",
      dob: "",
      maritalStaus: "",
      gender: "",
      courseName: "",
      collegeName: "",
      year: "",
      panNumber: "",
      aadharNumber: "",
      maritalStatus: "",
      initiated: "",
      initiationName: "",
      spiritualMasterName: "",
      initiationDate: "",
      initiationPlace: "",
      photo: "",
      currentWork: "",
      place: "",
      duration: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "phone" && value.length === 10) {
      for (let i of employeesData) {
        if (i.phone === value) {
          ActivateToast("User with this Number Already Exists!", "warning");
          setNewEmployeeData({ ...newEmployeeData, phone: "" });
          break;
        }
      }
    }
    if (name === "email") {
      for (let i of employeesData) {
        if (i.email === value) {
          ActivateToast("User with this Email Already Exists!", "warning");
          setNewEmployeeData({ ...newEmployeeData, email: "" });
          break;
        }
      }
    }
    if (name === "whatsApp") {
      for (let i of employeesData) {
        if (i.details?.whatsappNumber === value) {
          ActivateToast(
            "User with this WhatsApp Number Already Exists!",
            "warning"
          );
          setNewEmployeeData({ ...newEmployeeData, whatsApp: "" });
          break;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newEmployeeData.phone.length < 10 || newEmployeeData.phone.length > 10)
      return;
    if (selectedCenters.length === 0) {
      // If no center is selected, show an error or perform any desired action
      return ActivateToast("Select Atleast one Center to Manage", "warning");
    }

    let id = uid(24);
    let pass = uid(8);
    axios.post(apiLink + "customersInfo", {
      name: newEmployeeData.name,
      email: newEmployeeData.email,
      phone: newEmployeeData.phone,
      userID,
    });
    // Handle form submission, e.g., send data to the server
    axios.post(`${apiLink}users`, {
      ...newEmployeeData,
      centers: selectedCenters,
      _id: id,
      password: pass,
    }).then(res => {
      console.log(res)
      setEmployeesData([
        ...employeesData,
        { ...newEmployeeData, centers: selectedCenters, _id: id, password: pass },
      ]);
      ActivateToast("New Employee Created", "success");
      setNewEmployeeData({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        whatsApp: "",
        assignedCenter: "",
        creator: {
          name: userName,
          _id: userID,
        },
        permissions: {
          Admin: {
            create: false,
            update: false,
            delete: false,
          },
          Leader: {
            create: false,
            update: false,
            delete: false,
          },
          Center: {
            create: false,
            update: false,
            delete: false,
          },
          Configuration: {
            create: false,
            update: false,
            delete: false,
          },
        },
        password_changed: false,
        details: {
          address: "",
          centreName: "",
          designation: "",
          dob: "",
          maritalStaus: "",
          gender: "",
          courseName: "",
          collegeName: "",
          year: "",
          panNumber: "",
          aadharNumber: "",
          maritalStatus: "",
          initiated: "",
          initiationName: "",
          spiritualMasterName: "",
          initiationDate: "",
          initiationPlace: "",
          photo: "",
          currentWork: "",
          place: "",
          duration: "",
        },
      });
    })

    // console.log(newEmployeeData)

    await axios.post(`${apiLink}sendWhatsapp`, {
      number: newEmployeeData.phone,
      name: newEmployeeData.name,
      userid: newEmployeeData.email,
      password: pass
    }).then(res => console.log(res)).catch(err => console.log(err))

    axios.post(`${apiLink}sendMail`, {
      userID,
      email: newEmployeeData.email,
      subject: `Credentials for ICFDR Platform`,
      body: templates.userCreated(
        newEmployeeData.name,
        newEmployeeData.email,
        pass
      ),
    });
    axios.post(`${apiLink}emailTracker`, {
      name: newEmployeeData.name,
      email: newEmployeeData.email,
      userID: userID,
      content: {
        sub: `Credentials for ICFDR Platform`,
        body: templates.userCreated(
          newEmployeeData.name,
          newEmployeeData.email,
          pass
        ),
      },
      from: { name: userName, userID },
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString(),
    });
    handleClose(true);
    PostToLogs(
      `Created ${newEmployeeData.name} as ${newEmployeeData.role === "Admin" ? "an" : "a"
      } ${newEmployeeData.role}`
    );
    setSelectedCenters([]);

  };

  const handleCenterCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setNewEmployeeData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [`${value}`]: {
            create: true,
            update: false,
            delete: false,
          },
        },
      }));
      setSelectedCenters((prevSelectedCenters) => [
        ...prevSelectedCenters,
        value,
      ]);
    } else {
      setNewEmployeeData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [`${value}`]: {
            create: false,
            update: false,
            delete: false,
          },
        },
      }));
      setSelectedCenters((prevSelectedCenters) =>
        prevSelectedCenters.filter((center) => center !== value)
      );
    }
    setIsCenterSelected(selectedCenters.length > 0);
  };
  const centerOptions = configurationSettings.centers;

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && open) {
      submitRef.current.click();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Box mt={"2%"}>
      {(userPermissions?.Admin?.create ||
        userPermissions?.Leader?.create ||
        isAdmin) && (

          <StyledButton text={"Create Leader"} extraFunction={handleOpen} />
        )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        sx={{ overflow: "scroll" }}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container component="main" maxWidth="100%">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 5, right: 5 }}
                >
                  <Close />
                </IconButton>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      name="name"
                      label="Name"
                      value={newEmployeeData?.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={styles.span}>Name</span>
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      name="phone"
                      label="Phone Number"
                      type="number"
                      color={
                        newEmployeeData["phone"].length < 10 ||
                          newEmployeeData["phone"].length > 10
                          ? "warning"
                          : "success"
                      }
                      value={newEmployeeData?.phone}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      margin="normal"
                    />
                    <span className={styles.span}>Phone</span>
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      name="whatsApp"
                      label="WhatsApp Number"
                      type="number"
                      style={{
                        color: newEmployeeData["whatsApp"].length < 10 ||
                          newEmployeeData["whatsApp"].length > 10
                          ? "red"
                          : "green"
                      }}
                      value={newEmployeeData?.whatsApp}
                      onChange={handleInputChange}
                      required

                    />
                    <span className={styles.span}>WhatsApp</span>
                  </label>

                  <label className={styles.label}>
                    <input className={styles.input}
                      name="email"
                      label="Email"
                      type="email"
                      value={newEmployeeData?.email}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                    <span className={styles.span}>Email</span>
                  </label>
                  <label className={styles.label} >
                    <select
                      className={styles.input}
                      name="assignedCenter"
                      label="Assign a Center"
                      value={newEmployeeData?.assignedCenter || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">None</option>
                      {centerOptions?.map((center, i) => {
                        if (isAdmin) {
                          return (
                            <option key={i} value={center}>
                              {center.toUpperCase()}
                            </option>
                          );
                        } else if (userPermissions[center]?.create) {
                          return (
                            <option key={i} value={center}>
                              {center.toUpperCase()}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>

                    <span className={styles.span}>Assign A Center</span>
                  </label>
                  <label className={styles.label}>
                    <select
                      className={styles.input}
                      name="role"
                      label="role"
                      value={newEmployeeData?.role}
                      onChange={handleInputChange}
                      required
                    >
                      {universalLoading === false
                        ? isAdmin
                          ? configurationSettings?.roleFormPermission?.[
                            newEmployeeData?.assignedCenter || assignedCenter
                          ]?.map((role, i) => {
                            return (
                              <option key={i} value={role}>
                                {role.toUpperCase()}
                              </option>
                            );
                          })
                          : configurationSettings?.roleFormPermission?.[
                            newEmployeeData?.assignedCenter || assignedCenter
                          ]?.map((role, i) => {
                            if (userPermissions[role]?.create) {
                              return (
                                <option key={i} value={role}>
                                  {role.toUpperCase()}
                                </option>
                              );
                            }
                          })
                        : null}
                    </select>
                    <span className={styles.span}>Role</span>
                  </label>

                  <FormControl component="fieldset" fullWidth margin="normal">
                    <Typography className={styles.blueTextColor}>Centers to Manage</Typography>
                    <FormGroup>
                      <Box display={"flex"} flexWrap={"wrap"}>
                        {centerOptions?.map((center, i) => {
                          if (isAdmin) {
                            return (
                              <FormControlLabel
                                key={i}
                                control={
                                  <Checkbox
                                    name={`center_${center}`}
                                    checked={selectedCenters.includes(center)}
                                    onChange={handleCenterCheckboxChange}
                                    value={center}
                                  />
                                }
                                label={`${center}`}
                                className={styles.blueTextColor}
                              />
                            );
                          } else if (userPermissions[center]?.create) {
                            return (
                              <FormControlLabel
                                key={i}
                                control={
                                  <Checkbox
                                    name={`center_${center}`}
                                    checked={selectedCenters.includes(center)}
                                    onChange={handleCenterCheckboxChange}
                                    value={center}
                                  />
                                }
                                label={`${center}`}
                              />
                            );
                          }
                        })}
                      </Box>
                    </FormGroup>
                  </FormControl>

                  {(userPermissions?.Admin?.create ||
                    userPermissions?.Leader?.create ||
                    isAdmin) &&
                    !universalLoading && (
                      <Button
                        ref={submitRef}
                        type="submit"
                        sx={{ width: "fit-content", m: "auto" }}
                      >
                        <StyledButton icon={<PersonAdd />} text={"Create Account"} tooltip={"Create A New Platform User"} />
                      </Button>
                    )}
                </form>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
