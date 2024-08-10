import { Cancel, Edit, Save } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axe from "axios";
import React, { useState } from "react";
import { Context } from "../../../Context";
import DeleteFromID from "../../Features/DeleteFromID";
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

export default function MemberModal({ member, open, setOpen, setSelectedRow }) {
  //   const [open, setOpen] = React.useState(!!state);
  const {
    cloudinaryInfo,
    axios,
    ActivateToast,
    role,
    apiLink,
    membersData,
    setMembersData,
    userPermissions,
    isAdmin,
    PostToLogs,
  } = React.useContext(Context);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (setSelectedRow) setSelectedRow(null);
    setOpen(false);
  };
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
      <Box border={"1px solid gray"} p={"20px"} className={styles.form}>
        <Typography className={styles.title} fontWeight={"bold"}>
          {name}
        </Typography>
        {state.map((i, index) => {
          return (
            <React.Fragment key={index}>
              <label className={styles.label}>
                <input
                  className={styles.input}
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
                <span className={styles.span} style={{ top: "25px" }}>Course Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
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
                <span className={styles.span} style={{ top: "25px" }}>College Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  disabled={disabled}
                  onChange={({ target }) => {
                    let { value } = target;
                    let temp = [...state];
                    temp[index].year = value;
                    setState(temp);
                  }}
                  value={i.year}
                />
                <span className={styles.span} style={{ top: "25px" }}>Year</span>
              </label>
              {state.length > 1 && index < state.length - 1 && <hr />}
            </React.Fragment>
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

    let link = await axe.post(
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.form}>
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
                    photo ??
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
          <br />
          <TextComp
            disabled={disabled}
            name={"Name"}
            state={name}
            setState={setName}
          />
          <TextComp
            disabled={disabled}
            name={"Phone"}
            state={phone}
            setState={setPhone}
          />
          <TextComp
            disabled={disabled}
            name={"Email"}
            state={email}
            setState={setEmail}
          />
          <TextComp
            disabled={disabled}
            name={"WhatsApp Number"}
            state={whatsappNumber}
            setState={setWhatsappNumber}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={({ target }) => {
              let { value } = target;
              setDob(value);
            }}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextComp
            disabled={disabled}
            name={"Donor Type"}
            state={donorType}
            setState={setDonorType}
          />
          <TextComp
            disabled={disabled}
            name={"lpNumber"}
            state={lpNumber}
            setState={setLpNumber}
          />
          <TextComp
            disabled={disabled}
            name={"Initiated"}
            state={initiated}
            setState={setInitiated}
          />
          <TextComp
            disabled={disabled}
            name={"Initiation Name"}
            state={initiationName}
            setState={setInitiationName}
          />
          <TextComp
            disabled={disabled}
            name={"Spiritual Master Name"}
            state={spiritualMasterName}
            setState={setSpiritualMasterName}
          />
          <TextComp
            disabled={disabled}
            name={"Initiation Date"}
            state={initiationDate}
            setState={setInitiationDate}
          />
          <TextComp
            disabled={disabled}
            name={"Initiation Place"}
            state={initiationPlace}
            setState={setInitiationPlace}
          />
          <TextComp
            disabled={disabled}
            name={"Residence Address"}
            state={residenceAddress}
            setState={setResidenceAddress}
          />
          <TextComp
            disabled={disabled}
            name={"Pan Number"}
            state={panNumber}
            setState={setPanNumber}
          />
          <TextComp
            disabled={disabled}
            name={"Aadhaar Number"}
            state={aadharNumber}
            setState={setAadharImage}
          />
          <TextComp
            disabled={disabled}
            name={"Office Address"}
            state={officeAddress}
            setState={setOfficeAddress}
          />
          <TextComp
            disabled={disabled}
            name={"Date Of Membership"}
            state={dateOfMembership}
            setState={setDateOfMembership}
          />
          <IntroducedByComponent
            disabled={disabled}
            name={"Introduced By"}
            state={introducedBy}
            setState={setIntroducedBy}
          />
          <FormControl disabled={disabled} component="fieldset" margin="normal">
            <Typography variant="subtitle1">Gender</Typography>
            <RadioGroup
              name="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl disabled={disabled} component="fieldset" margin="normal">
            <Typography variant="subtitle1">Is Married</Typography>
            <RadioGroup
              name="Married"
              value={isMarried}
              onChange={(e) => setIsMarried(e.target.value)}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {isMarried == "yes" ? (
            <>
              <TextComp
                disabled={disabled}
                name={"Date Of Marriage"}
                state={dateOfMarriage}
                setState={setDateOfMarriage}
              />
              <TextComp
                disabled={disabled}
                name={"Spouse Name"}
                state={spouseName}
                setState={setSpouseName}
              />
              <TextComp
                disabled={disabled}
                name={"Spouse Date of Birth"}
                state={spouseDateOfBirth}
                setState={setSpouseDateOfBirth}
              />
              <br />
              <ArrChildren
                disabled={disabled}
                name={"Childrens"}
                state={children}
                setState={setChildren}
              />
              <br />
            </>
          ) : (
            ""
          )}
          <ArrQualification
            disabled={disabled}
            name={"Qualification"}
            state={qualification}
            setState={setQualification}
          />
          <TextComp
            disabled={disabled}
            name={"Designation"}
            state={designation}
            setState={setDesignation}
          />
          <TextComp
            disabled={disabled}
            name={"Currect Work"}
            state={currentWork}
            setState={setCurrentWork}
          />
          <TextComp
            disabled={disabled}
            name={"Place"}
            state={place}
            setState={setPlace}
          />
          <TextComp
            disabled={disabled}
            name={"Duration"}
            state={duration}
            setState={setDuration}
          />
          <FormControl disabled={disabled} component="fieldset" margin="normal">
            <Typography variant="subtitle1">Has Work Experience</Typography>
            <RadioGroup
              name="Married"
              value={hasWorkExperience}
              onChange={(e) => setHasWorkExperience(e.target.value)}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {hasWorkExperience == "yes" ? (
            <WorkExperience
              disabled={disabled}
              name={"Work Experience"}
              state={workExperience}
              setState={setWorkExperience}
            />
          ) : (
            ""
          )}
          <br />
          <Box className={styles.flex}>
            {disabled
              ? (role === "Admin" || role === "Leader" || isAdmin) && (
                <StyledButton
                  text={"Edit"}
                  icon={<Edit />}
                  tooltip={"Edit Profile of this Member!"}
                  extraFunction={() => {
                    setDisabled(false);
                  }}
                />
              )
              : (role === "Admin" || role === "Leader" || isAdmin) && (
                <StyledButton
                  text={"Save"}
                  icon={<Save />}
                  tooltip={"Save these settings for this member!"}
                  extraFunction={async () => {
                    let temp = {
                      phone,
                      email,
                      dob,
                      details: {
                        donorType,
                        lpNumber,
                        name,
                        initiated,
                        initiationName,
                        spiritualMasterName,
                        initiationDate,
                        initiationPlace,
                        residenceAddress,
                        whatsappNumber,
                        photo,
                        panNumber,
                        panImage,
                        aadharNumber,
                        aadharImage,
                        officeAddress,
                        introducedBy,
                        dateOfMembership,
                        dateOfMarriage,
                        gender,
                        isMarried,
                        spouseName,
                        spouseDateOfBirth,
                        children,
                        qualification,
                        designation,
                        currentWork,
                        place,
                        duration,
                        hasWorkExperience,
                        workExperience,
                      },
                    };
                    await axios.patch(`${apiLink}member/${member._id}`, temp);
                    setDisabled(true);
                    PostToLogs(
                      `Updated ${name}'s Information from Members Panel.`
                    );
                    ActivateToast("Information Updated", "success");
                  }}
                />
              )}
            {(role === "Admin" || role === "Leader" || isAdmin) && (
              <DeleteFromID
                id={member._id}
                name={name}
                setModalOpen={setOpen}
                array={membersData}
                setArray={setMembersData}
                route={"member"}
                headline={"Delete member"}
                message={"Delete Your member Forever?"}
                buttonText={"Delete"}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function TextComp({ name, state, setState, disabled }) {
  return (
    <label className={styles.label}>
      <input className={styles.input}
        disabled={disabled}
        onChange={({ target }) => {
          let { value } = target;
          setState(value);
        }}
        placeholder={name}
        defaultValue={state}
      />
      <span className={styles.span}>{name}</span>
    </label>
  );
}

function WorkExperience({ name, state, setState, disabled }) {
  return (
    <FormControl fullWidth>
      <Box border={"1px solid gray"} p={"20px"} className={styles.form}>
        <Typography fontWeight={"bold"} className={styles.title}>{name}</Typography>
        {state.map((i, index) => {
          return (
            <React.Fragment key={`${i}_${index}`}>
              <label className={styles.label}>
                <input className={styles.input}
                  fullWidth
                  disabled={disabled}
                  onChange={({ target }) => {
                    let { value } = target;
                    let temp = [...state];
                    temp[index].companyName = value;
                    setState(temp);
                  }}
                  placeholder={"Company Name"}
                  value={i.companyName}
                />
                <span className={styles.span}>Company Name</span>
              </label>
              <label className={styles.label}>

                <input className={styles.input}
                  fullWidth
                  disabled={disabled}
                  onChange={({ target }) => {
                    let { value } = target;
                    let temp = [...state];
                    temp[index].duration = value;
                    setState(temp);
                  }}
                  placeholder={"Duration"}
                  value={i.duration}
                />
                <span className={styles.span}>Duration</span>
              </label>
              {state.length > 1 && index < state.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
      </Box>
    </FormControl>
  );
}

function ArrChildren({ name, state, setState, disabled }) {
  return (
    <FormControl fullWidth>
      {" "}
      <Box className={styles.form} border={"1px solid gray"} p={"20px"}>
        <Typography className={styles.title} fontWeight={"bold"}>{name}</Typography>
        {state.map((i, index) => {
          return (
            <Box>
              <label className={styles.label}>

                <input className={styles.input}
                  fullWidth
                  disabled={disabled}
                  onChange={({ target }) => {
                    let { value } = target;
                    let temp = [...state];
                    temp[index].name = value;
                    setState(temp);
                  }}
                  placeholder={"Name"}
                  value={i.name}
                />
                <span className={styles.span}>Name</span>
              </label>
              <label className={styles.label}>

                <input className={styles.input}
                  fullWidth
                  disabled={disabled}
                  onChange={({ target }) => {
                    let { value } = target;
                    let temp = [...state];
                    temp[index].dob = value;
                    setState(temp);
                  }}
                  placeholder={"Dob"}
                  value={i.dob}
                />
                <span className={styles.span}>Dob</span>
              </label>
              {state.length > 1 && index < state.length - 1 && <hr />}
            </Box>
          );
        })}
        {state.length == 0 && <Typography className={styles.blueTextColor}>No Childrens</Typography>}
      </Box>
    </FormControl>
  );
}
function IntroducedByComponent({ name, state, setState, disabled }) {
  return (
    <FormControl fullWidth>
      {" "}
      <Box className={styles.form} border={"1px solid gray"} p={"20px"}>
        <Typography className={styles.title} fontWeight={"bold"}>{name}</Typography>
        <label className={styles.label}>
          <input className={styles.input}
            fullWidth
            disabled={disabled}
            onChange={(e) => {
              let { value } = e.target;
              setState((prev) => ({ ...prev, name: value }));
            }}
            placeholder={"Name"}
            value={state.name}
          />
          <span className={styles.span}>Name</span>
        </label>
        <label className={styles.label}>
          <input className={styles.input}
            fullWidth
            disabled={disabled}
            onChange={(e) => {
              let { value } = e.target;
              setState((prev) => ({ ...prev, contact: value }));
            }}
            placeholder={"Contact"}
            value={state.contact}
          />
          <span className={styles.span}>Contact</span>
        </label>
      </Box>
    </FormControl>
  );
}
