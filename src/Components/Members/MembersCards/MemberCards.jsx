import {
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Context } from "../../../Context";
import MemberModal from "../MembersTable/MemberModel";
import styles from "./MemberCards.module.css";

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

export default function MemberCards({ member }) {
  const [open, setOpen] = React.useState(false);
  const {
    PostToLogs,
    axios,
    role,
    cloudinaryInfo,
    ActivateToast,
    theme,
    apiLink,
    membersData,
    setMembersData,
    userPermissions,
    isAdmin,
  } = React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = React.useState(true);
  const [phone, setPhone] = useState(member.phone || "");
  const [email, setEmail] = useState(member.email || "");
  const [dob, setDob] = useState(member.dob || "");
  const [donorType, setDonorType] = useState(member.details.donorType || "");
  const [lpNumber, setLpNumber] = useState(member.details.lpNumber || "");
  const [name, setName] = useState(member.details.name || "");
  const [initiated, setInitiated] = useState(member.details.initiated || "");
  const [initiationName, setInitiationName] = useState(
    member.details.initiationName || ""
  );
  const [spiritualMasterName, setSpiritualMasterName] = useState(
    member.details.spiritualMasterName || ""
  );
  const [initiationDate, setInitiationDate] = useState(
    member.details.initiationDate || ""
  );
  const [initiationPlace, setInitiationPlace] = useState(
    member.details.initiationPlace || ""
  );
  const [residenceAddress, setResidenceAddress] = useState(
    member.details.residenceAddress || ""
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    member.details.whatsappNumber || ""
  );
  const [photo, setPhoto] = useState(member.details.photo || "");
  const [panNumber, setPanNumber] = useState(member.details.panNumber || "");
  const [panImage, setPanImage] = useState(member.details.panImage || "");
  const [aadharNumber, setAadharNumber] = useState(
    member.details.aadharNumber || ""
  );
  const [aadharImage, setAadharImage] = useState(
    member.details.aadharImage || ""
  );
  const [officeAddress, setOfficeAddress] = useState(
    member.details.officeAddress || ""
  );
  const [introducedBy, setIntroducedBy] = useState(
    member.details.introducedBy || ""
  );
  const [dateOfMembership, setDateOfMembership] = useState(
    member.details.dateOfMembership || ""
  );
  const [dateOfMarriage, setDateOfMarriage] = useState(
    member.details.dateOfMarriage || ""
  );
  const [gender, setGender] = useState(member.details.gender || "");
  const [isMarried, setIsMarried] = useState(member.details.isMarried || "");
  const [spouseName, setSpouseName] = useState(member.details.spouseName || "");
  const [spouseDateOfBirth, setSpouseDateOfBirth] = useState(
    member.details.spouseDateOfBirth || ""
  );
  const [children, setChildren] = useState(member.details.children || []);
  const [qualification, setQualification] = useState(
    member.details.qualification || []
  );
  const [designation, setDesignation] = useState(
    member.details.designation || ""
  );
  const [currentWork, setCurrentWork] = useState(
    member.details.currentWork || ""
  );
  const [place, setPlace] = useState(member.details.place || "");
  const [duration, setDuration] = useState(member.details.duration || "");
  const [hasWorkExperience, setHasWorkExperience] = useState(
    member.details.hasWorkExperience || ""
  );
  const [workExperience, setWorkExperience] = useState(
    member.details.workExperience || []
  );

  function ArrQualification({ name, state, setState }) {
    return (
      <Box border={"1px solid gray"} p={"20px"}>
        <Typography fontWeight={"bold"}>{name}</Typography>
        <br />
        {state.map((i, index) => {
          return (
            <Box key={i + index}>
              <Typography>Course Name</Typography>
              <TextField
                fullWidth
                disabled={disabled}
                onChange={({ target }) => {
                  let { value } = target;
                  let temp = [...state];
                  temp[index].courseName = value;
                  setState(temp);
                }}
                placeholder={"Course Name"}
                value={i.courseName}
              />
              <Typography>College Name</Typography>
              <TextField
                fullWidth
                disabled={disabled}
                onChange={({ target }) => {
                  let { value } = target;
                  let temp = [...state];
                  temp[index].collegeName = value;
                  setState(temp);
                }}
                placeholder={"College Name"}
                value={i.collegeName}
              />
              <Typography>Year</Typography>
              <TextField
                fullWidth
                disabled={disabled}
                onChange={({ target }) => {
                  let { value } = target;
                  let temp = [...state];
                  temp[index].year = value;
                  setState(temp);
                }}
                placeholder={"Year"}
                value={i.year}
              />
              {state.length > 1 && index < state.length - 1 && <hr />}
            </Box>
          );
        })}
      </Box>
    );
  }

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
    // setImage(link.secure_url);
    setPhoto(link.secure_url);
    ActivateToast("Image uploaded, fill in other details", "success");
  };

  function handleRemoveImage() {
    setPhoto("");
  }

  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.card}>
        <p className={styles.initialName}>{name}</p>
        <button className={styles.role}>
          <p className={styles.roleText}>Member</p>
        </button>
        <div className={styles["profile-pic"]}>
          <img
            className={styles.profilePic}
            src={
              photo ||
              "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
            }
            alt="Profile Photo"
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.content}>
            <span className={styles.name}>{name}</span>
            <span className={styles["about-me"]}>
              <p>
                <u>Assigned Center:</u> {member?.center}
              </p>
              <p>{email}</p>
            </span>
          </div>
          <div className={styles["bottom-bottom"]}>
            <div className={styles["social-links-container"]}>
              <p className={styles.phone}>{phone || whatsappNumber}</p>
            </div>
            <button className={styles.button} onClick={handleOpen}>
              View More
            </button>
          </div>
        </div>
      </div>
      <MemberModal open={open} setOpen={setOpen} member={member} />
    </div>
  );
}