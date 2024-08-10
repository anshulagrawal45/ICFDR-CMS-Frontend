import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Call, Cancel, Email } from "@mui/icons-material";
import styles from "./EmployeeCards.module.css";
import { Context } from "../../../Context";
import DeleteFromID from "../../Features/DeleteFromID";
import styles2 from "../../Features/Styles/CustomInputs.module.css";
import EmployeesEditModal from "../EmployeesTable/EmployeesEditModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "95vh",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

export default function EmployeeCards({ employee }) {
  const [open, setOpen] = React.useState(false);
  const {
    PostToLogs,
    axios,
    cloudinaryInfo,
    ActivateToast,
    theme,
    apiLink,
    employeesData,
    configurationSettings,
    universalLoading,
    setEmployeesData,
    userPermissions,
    isAdmin,
  } = React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    temp.photo = link.secure_url;
    setData({ ...data, details: temp });
    ActivateToast("Image uploaded, fill in other details", "success");
  };

  function handleRemoveImage() {
    setImage(null);
  }
  console.log(employee);
  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.card}>
        <p className={styles.initialName}>{employee.name}</p>
        <button className={styles.role}>
          <p className={styles.roleText}>{employee.role}</p>
        </button>
        <div className={styles["profile-pic"]}>
          <img
            className={styles.profilePic}
            src={
              employee?.details?.photo ||
              "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
            }
            alt="Profile Photo"
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.content}>
            <span className={styles.name}>{employee.name}</span>
            <span className={styles["about-me"]}>
              <p>
                <u>Assigned Center:</u> {employee.assignedCenter}
              </p>
              <p>{employee.email}</p>
            </span>
          </div>
          <div className={styles["bottom-bottom"]}>
            <div className={styles["social-links-container"]}>
              <p className={styles.phone}>
                {employee.phone || employee.whatsApp}
              </p>
            </div>
            <button className={styles.button} onClick={handleOpen}>
              View More
            </button>
          </div>
        </div>
      </div>
      <EmployeesEditModal open={open} handleCloseModal={handleClose} setOpen={setOpen} employee={employee} />
    </div>
  );
}
