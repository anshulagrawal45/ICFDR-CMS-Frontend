import { Cancel, Edit, Save } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import { Context } from "../../../Context";
import DeleteFromID from "../../Features/DeleteFromID";
import separateCamelCase from "../../Features/SeparateCameCase";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["90%", "50%"],
  height: "95vh",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: [1, 2, 3, 4],
  overflowY: "scroll",
};

export default function EmployeesEditModal({
  employee,
  open,
  setOpen,
  handleCloseModal,
}) {
  //   const [open, setOpen] = React.useState(!!state);
  const { axios, ActivateToast, apiLink, userPermissions, isAdmin } =
    React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    handleCloseModal();
    setOpen(false);
  };
  const {
    PostToLogs,
    cloudinaryInfo,
    employeesData,
    configurationSettings,
    universalLoading,
    setEmployeesData,
  } = React.useContext(Context);
  const [data, setData] = React.useState(employee);
  const [disabled, setDisabled] = React.useState(true);

  const handleCenterChange = (event) => {
    const { value, checked } = event.target;
    let updatedCenters = [...data.centers];

    if (checked) {
      // Add the center to the array if it is checked
      updatedCenters.push(value);
      setData((prevData) => ({
        ...prevData,
        centers: updatedCenters,
        permissions: {
          ...prevData.permissions,
          [`${value}`]: {
            create: false,
            update: false,
            delete: false,
          },
        },
      }));
    } else {
      // Remove the center from the array if it is unchecked
      updatedCenters = updatedCenters.filter((center) => center !== value);

      // Delete the key from the permissions object
      const updatedPermissions = { ...data.permissions };
      delete updatedPermissions[value];

      setData((prevData) => ({
        ...prevData,
        centers: updatedCenters,
        permissions: updatedPermissions,
      }));
    }
  };

  let [image, setImage] = React.useState(employee?.details?.photo || "");
  const imageInput = React.useRef(null);
  const handleImageChange = async (e) => {
    ActivateToast("Please wait while the image is uploading", "warning");
    const file = e.target.files[0];
    let cloud_name = cloudinaryInfo.cloud_name;
    let upload_preset = cloudinaryInfo.upload_preset;
    let formData1 = new FormData();
    formData1.append("file", file);
    formData1.append("upload_preset", upload_preset);

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setImage(link.secure_url);
    let temp = data.details;
    temp.photo = link.seucre_url;
    setData({ ...data, details: temp });
    ActivateToast("Image uploaded, fill in other details", "success");
  };

  function handleRemoveImage() {
    setImage(null);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.form}>
          <Typography className={styles.title}>Employee Details</Typography>
          <br />
          <Box position={"absolute"} top={"10px"} right={"10px"}>
            <IconButton onClick={handleClose}>
              <Cancel />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Badge
                overlap="circular"
                sx={{ position: "relative" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Cancel
                    sx={{
                      color: "red",
                      position: "absolute",
                      bottom: "80px",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    titleAccess="Remove Image"
                    onClick={handleRemoveImage}
                  />
                }
              >
                <Avatar
                  sx={{ height: "100px", width: "100px" }}
                  src={
                    image ??
                    "https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png"
                  }
                />
              </Badge>
            </Box>
            <Box>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageInput}
                  onChange={handleImageChange}
                  zIndex="1000"
                />
                <Button
                  w="100%"
                  onClick={() => {
                    imageInput.current.click();
                  }}
                >
                  Change Photo
                </Button>
              </label>
            </Box>
          </Box>
          <label className={styles.label}>
            <input
              className={styles.input}
              disabled={disabled}
              onChange={({ target }) => {
                let { value } = target;
                setData({ ...data, name: value });
              }}
              value={data?.name}
            />
            <span className={styles.span} style={{ top: "25px" }}>
              Name
            </span>
          </label>
          <label className={styles.label}>
            <select
              className={styles.input}
              disabled={data?.role == "Super Admin" ? true : disabled}
              name="role"
              value={data?.role == "Super Admin" ? "Super Admin" : data?.role}
              placeholder={
                data?.role == "Super Admin" ? "Super Admin" : data?.role
              }
              onChange={({ target }) => {
                let { value } = target;
                setData({ ...data, role: value });
              }}
              required
            >
              <option disabled value={"Super Admin"}>
                Super Admin
              </option>
              {universalLoading === false
                ? configurationSettings?.roles?.map((role, i) => {
                    if (userPermissions?.[role]?.create) {
                      return (
                        <option key={i} value={role}>
                          {role.toUpperCase()}
                        </option>
                      );
                    }
                  })
                : null}
              {/* <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Leader">Leader</MenuItem> */}
            </select>
            <span className={styles.span} style={{ top: "25px" }}>
              Role
            </span>
          </label>
          <div className={styles.flex}>
            <label className={styles.label}>
              <input
                className={styles.input}
                disabled={disabled}
                onChange={({ target }) => {
                  let { value } = target;
                  setData({ ...data, email: value });
                }}
                value={data?.email}
              />
              <span className={styles.span} style={{ top: "25px" }}>
                Email
              </span>
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                disabled={disabled}
                onChange={({ target }) => {
                  let { value } = target;
                  setData({ ...data, phone: value });
                }}
                placeholder="Phone"
                value={data?.phone}
              />
              <span className={styles.span} style={{ top: "25px" }}>
                Phone
              </span>
            </label>
          </div>
          <label className={styles.label}>
            <select
              className={styles.input}
              disabled={data?.assignedCenter == "All Centers" ? true : disabled}
              name="assignedCenter"
              value={
                data?.assignedCenter == "All Centers"
                  ? "All Centers"
                  : data?.assignedCenter
              }
              onChange={({ target }) => {
                let { value } = target;
                setData({ ...data, assignedCenter: value });
              }}
              required
            >
              <option disabled value={"All Centers"}>
                All Centers
              </option>
              {universalLoading === false
                ? configurationSettings.centers?.map((center, i) => {
                    return (
                      <option key={i} value={center}>
                        {center.toUpperCase()}
                      </option>
                    );
                  })
                : null}
              {/* <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Leader">Leader</MenuItem> */}
            </select>
            <span className={styles.span} style={{ top: "25px" }}>
              Assign a Center
            </span>
          </label>
          <FormControl component="fieldset" fullWidth margin="normal">
            <Typography className={styles.blueTextColor}>
              Centers to Manage
            </Typography>
            <FormGroup>
              <Box display={"flex"} flexWrap={"wrap"}>
                {configurationSettings?.centers?.map((center, i) => {
                  return (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          disabled={
                            data?.role == "Super Admin" ? true : disabled
                          }
                          name={`center_${center}`}
                          checked={
                            data?.role == "Super Admin"
                              ? true
                              : data?.centers?.includes(center)
                          }
                          value={center}
                          onChange={handleCenterChange}
                        />
                      }
                      label={`${center}`}
                    />
                  );
                })}
              </Box>
            </FormGroup>
          </FormControl>
          <React.Fragment>
            {data?.details && (
              <Typography className={styles.title} variant="h6">
                Personal Details
              </Typography>
            )}
            {data?.details && (
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Date of Birth"
                  type="date"
                  value={data.details?.dob}
                  onChange={(e) => {
                    let { value, name } = e.target;
                    let temp = data?.details;
                    temp["dob"] = value;
                    setData({ ...data, details: temp });
                  }}
                  InputLabelProps={{ shrink: true }}
                  disabled={disabled}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span} style={{ top: "25px" }}>
                  Date of Birth
                </span>
              </label>
            )}
            {data?.details &&
              Object?.keys(data?.details)?.map((el, i) => {
                if (el === "photo" || el === "dob") {
                  return null;
                }
                return (
                  <label className={styles.label} key={el}>
                    <input
                      className={styles.input}
                      fullWidth
                      name={el}
                      disabled={disabled}
                      onChange={(e) => {
                        let { value, name } = e.target;
                        console.log(name, value);
                        let temp = data?.details;
                        temp[name] = value;
                        setData({ ...data, details: temp });
                      }}
                      placeholder={el.toUpperCase()}
                      value={data?.details[el]}
                    />
                    <span className={styles.span} style={{ top: "25px" }}>
                      {separateCamelCase(el)}
                    </span>
                  </label>
                );
              })}
          </React.Fragment>
          <Box className={styles.flex}>
            {disabled
              ? (userPermissions?.[`${employee.role}`]?.update || isAdmin) && (
                  <StyledButton
                    text={"Edit"}
                    icon={<Edit />}
                    tooltip={"Edit Employee Profile!"}
                    extraFunction={() => {
                      setDisabled(false);
                    }}
                  />
                )
              : (userPermissions?.[`${employee.role}`]?.update || isAdmin) && (
                  <StyledButton
                  text={"Save"}
                  icon={<Save />}
                  tooltip={"Save this info for this profile!"}
                    extraFunction={async () => {
                      await axios.patch(`${apiLink}users/${data._id}`, data);
                      setOpen(false);
                      setDisabled(true);
                      PostToLogs(
                        `Updated ${data.name}'s Information from Admin/Leaders Panel.`
                      );
                      ActivateToast("Information Updated", "success");
                    }}
                  />
                )}
            {(userPermissions?.[`${employee.role}`]?.delete || isAdmin) && (
              <DeleteFromID
                setModalOpen={setOpen}
                name={data.name}
                id={employee._id}
                array={employeesData}
                setArray={setEmployeesData}
                route={"users"}
                headline={"Delete Employee"}
                message={"Delete Your Employee Forever?"}
                buttonText={"Delete"}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
