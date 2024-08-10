import { Cancel, NextPlan } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axe from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { uid } from "uid";
import { Context } from "../../../../Context";
import styles from "../../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../../UIComponents/Button/StyledButton";

function Step2({ handleBack, handleNext, activeStep, steps, createMember }) {
  let {
    memberDetails,
    axios,
    cloudinaryInfo,
    ActivateToast,
    setMemberDetails,
    configurationSettings,
    assignedCenter,
    apiLink,
  } = useContext(Context);
  let [autocompletePlace, setAutocompletePlace] = useState([]);
  let [formLink, setFormLink] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({ ...memberDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
    // Form submission logic here
  };

  const handleMarriageChange = (event) => {
    const { value } = event.target;
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      isMarried: value,
      spouseName: "",
      spouseDateOfBirth: "",
      children: [{ dob: "", name: "" }],
    }));
  };

  const handleSpouseChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      [name]: value,
    }));
  };
  const handleDateOfMarriage = (event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      [name]: value,
    }));
  };

  const handleChildrenChange = (index, event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => {
      const updatedChildren = [...prevmemberDetails.children];
      updatedChildren[index][name] = value;
      return {
        ...prevmemberDetails,
        children: updatedChildren,
      };
    });
  };
  const handleSiblingChange = (index, event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => {
      const updatedChildren = [...prevmemberDetails?.siblings];
      updatedChildren[index][name] = value;
      return {
        ...prevmemberDetails,
        children: updatedChildren,
      };
    });
  };

  const handleAddChild = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      children: [...prevmemberDetails.children, { name: "", dob: "" }],
    }));
  };
  const handleAddSibling = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      siblings: [
        ...prevmemberDetails.siblings,
        { name: "", occupation: "", dob: "" },
      ],
    }));
  };

  const handleQualificationChange = (index, event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => {
      const updatedQualification = [...prevmemberDetails.qualification];
      updatedQualification[index][name] = value;
      return {
        ...prevmemberDetails,
        qualification: updatedQualification,
      };
    });
  };

  const handleAddQualification = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      qualification: [
        ...prevmemberDetails.qualification,
        { courseName: "", collegeName: "", year: "" },
      ],
    }));
  };

  function copyText() {
    // Get the input element
    console.log("askjfd");
    var text = document.getElementById("textInput").value;
    navigator.clipboard.writeText(text);

    // Update the button text to indicate success (optional)
    const copyButton = document.querySelector("#copyButton");
    copyButton.innerHTML = "Copied!";
    setTimeout(() => {
      copyButton.innerHTML = "Copy";
    }, 3000); // Reset the button text after 1.5 seconds
  }

  const imageInput = useRef(null);
  let [image, setImage] = useState();
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
    setImage(link.secure_url);
    setMemberDetails({ ...memberDetails, photo: link.secure_url });
    ActivateToast("Image uploaded, fill in other details", "success");
  };

  function handleRemoveImage() {
    setImage(null);
  }

  let submitRef = useRef(null);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.form}>
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
        <br />
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            disabled
            id="textInput"
            value={formLink}
            fullWidth
          />
          <span className={styles.span}>Link</span>
        </label>
        <Box className={styles.flex}>
          <Button variant="contained" onClick={copyText} id="copyButton">
            Copy
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              let obj = {
                _id: uid(24),
                memberID: memberDetails._id,
                isFormSubmitted: false,
                filledData: memberDetails,
                // configurationSettings
              };
              setFormLink(apiLink + "client/form/" + obj._id);
              axios.post(`${apiLink}form`, obj);
            }}
            id="copyButton"
          >
            Generate
          </Button>
        </Box>
        <br />
        <br />
        <Typography className={styles.title} fontWeight="900">
          Personal Details
        </Typography>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="Legal Name"
            name="name"
            defaultValue={memberDetails.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <span className={styles.span}>Legal Name</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="Residence Address"
            name="residenceAddress"
            defaultValue={memberDetails.residenceAddress}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <span className={styles.span}>Residence Address</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="Pin Code"
            name="pinCode"
            type="number"
            defaultValue={memberDetails.pinCode}
            onChange={async ({ target }) => {
              setMemberDetails((prev) => {
                return { ...prev, pinCode: target.value };
              });

              if (target.value.length === 6) {
                axe
                  .get(`https://api.postalpincode.in/pincode/${target.value}`)
                  .then((data) => {
                    let res = data.data;
                    setAutocompletePlace(
                      res[0].PostOffice || [
                        { Name: "Please Try Writing Again" },
                      ]
                    );

                    if (res[0]?.PostOffice[0]?.Name) {
                      setMemberDetails((prev) => {
                        return {
                          ...prev,
                          place:
                            res[0]?.PostOffice[0]?.Name || "Try Writing Again",
                        };
                      });
                    }
                  })
                  .catch((err) => console.log(err));
              }
              if (target.value.length === 0) {
                setMemberDetails((prev) => {
                  return { ...prev, place: "" };
                });
              }
            }}
            variant="outlined"
            margin="normal"
            required
          />
          <span className={styles.span}>Pin Code</span>
        </label>
        <FormControl fullWidth>
          <Autocomplete
            options={autocompletePlace}
            getOptionLabel={(option) => option.Name}
            onChange={(event, value) => {
              setMemberDetails({ ...memberDetails, place: value.Name });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Post Office"
                value={memberDetails.place || ""}
                variant="outlined"
              />
            )}
          />
        </FormControl>

        <label className={styles.label}>
          <input
            className={styles.input}
            type="number"
            label="Mobile Number"
            name="mobileNumber"
            color={
              memberDetails.mobileNumber.length < 10 ||
                memberDetails.mobileNumber.length > 10
                ? "warning"
                : "success"
            }
            defaultValue={memberDetails.mobileNumber}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <span className={styles.span}>Number</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="WhatsApp Number"
            name="whatsappNumber"
            color={
              memberDetails.whatsappNumber.length < 10 ||
                memberDetails.whatsappNumber.length > 10
                ? "warning"
                : "success"
            }
            defaultValue={memberDetails.whatsappNumber}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <span className={styles.span}>WhatsApp Number</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="Email"
            name="email"
            type="email"
            defaultValue={memberDetails.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
          <span className={styles.span}>Email</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            defaultValue={memberDetails.dateOfBirth}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span className={styles.span} style={{ top: "25px" }}>
            Date of Birth
          </span>
        </label>
        <FormControl component="fieldset" margin="normal">
          <Typography variant="subtitle1" className={styles.blueTextColor}>
            Gender
          </Typography>
          <RadioGroup
            name="gender"
            defaultValue={memberDetails.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        {configurationSettings?.categoryFormPermission[
          memberDetails?.assignedCenter || assignedCenter
        ][memberDetails?.profession]?.qualification && (
            <Typography variant="h6" className={styles.title}>
              Qualification
            </Typography>
          )}
        {configurationSettings?.categoryFormPermission[
          memberDetails?.assignedCenter || assignedCenter
        ][memberDetails?.profession]?.qualification &&
          memberDetails.qualification.map((qual, index) => (
            <React.Fragment key={index} className={styles.form}>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Course Name"
                  name="courseName"
                  defaultValue={qual.courseName}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Course Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="College Name"
                  name="collegeName"
                  defaultValue={qual.collegeName}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>College Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Year"
                  name="year"
                  defaultValue={qual.year}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Year</span>
              </label>
            </React.Fragment>
          ))}
        {configurationSettings?.categoryFormPermission[
          memberDetails?.assignedCenter || assignedCenter
        ][memberDetails?.profession]?.qualification && (
            <StyledButton
              text={"Add Qualification"}
              extraFunction={handleAddQualification}
              tooltip={"Add More Qualification Fields"}
            />
          )}

        {configurationSettings?.categoryFormPermission[
          memberDetails?.assignedCenter || assignedCenter
        ][memberDetails?.profession]?.familyDetails && (
            <React.Fragment className={styles.form}>
              <Typography variant="h6" className={styles.title}>
                Family Details
              </Typography>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Father's Name"
                  name="fathersName"
                  defaultValue={memberDetails.fathersName}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Father's Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Father's Date of Birth"
                  name="fathersDob"
                  type="date"
                  defaultValue={memberDetails.fathersDob}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span className={styles.span}>Father's Date of Birth</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Occupation"
                  name="fathersOccupation"
                  defaultValue={memberDetails.fathersOccupation}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Father's Occupation</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Mother's Name"
                  name="mothersName"
                  defaultValue={memberDetails.mothersName}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Mother's Name</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Mother's Date of Birth"
                  name="mothersDob"
                  type="date"
                  defaultValue={memberDetails.mothersDob}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span className={styles.span}>Mother's Date of Birth</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Mother's Occupation"
                  name="mothersOccupation"
                  defaultValue={memberDetails.mothersOccupation}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
                <span className={styles.span}>Mother's Occupation</span>
              </label>
              <label className={styles.label}>
                <input
                  className={styles.input}
                  label="Parent's Date of Marriage"
                  name="parentsDateOfMarriage"
                  type="date"
                  defaultValue={memberDetails.parentsDateOfMarriage}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span className={styles.span}>Parent's Date of Marriage</span>
              </label>
              {memberDetails?.siblings.map((sibling, index) => (
                <React.Fragment key={index}>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      label="Sibling's Name"
                      name="name"
                      defaultValue={sibling.name}
                      onChange={(event) => handleSiblingChange(index, event)}
                      variant="outlined"
                      margin="normal"
                    />
                    <span className={styles.span}>Sibling's Name</span>
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      label="Sibling's Date of Birth"
                      name="dob"
                      type="date"
                      defaultValue={sibling.dob}
                      onChange={(event) => handleSiblingChange(index, event)}
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <span className={styles.span}>Sibling's Date of Birth</span>
                  </label>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      label="Sibling's Occupation"
                      name="occupation"
                      defaultValue={sibling.occupation}
                      onChange={(event) => handleSiblingChange(index, event)}
                      variant="outlined"
                      margin="normal"
                    />
                    <span className={styles.span}>Sibling's Occupation</span>
                  </label>
                </React.Fragment>
              ))}
              <StyledButton
                extraFunction={handleAddSibling}
                text={"Add Sibling"}
                tooltip={"Add More Sibling's Fields"}
              />
            </React.Fragment>
          )}

        {configurationSettings?.categoryFormPermission[
          memberDetails?.assignedCenter || assignedCenter
        ][memberDetails?.profession]?.marriageDetails && (
            <FormControl component="fieldset" margin="normal">
              <Typography className={styles.blueTextColor} variant="subtitle1">
                Married
              </Typography>
              <RadioGroup
                name="isMarried"
                defaultValue={memberDetails.isMarried}
                onChange={handleMarriageChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          )}
        {memberDetails.isMarried === "yes" && (
          <React.Fragment>
            <label className={styles.label}>
              <input
                className={styles.input}
                label="Spouse Name"
                name="spouseName"
                defaultValue={memberDetails.spouseName}
                onChange={handleSpouseChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Spouse Name</span>
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                label="Date of Marriage"
                name="dateOfMarriage"
                type="date"
                defaultValue={memberDetails.dateOfMarriage}
                onChange={handleDateOfMarriage}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <span className={styles.span}>Date of Marriage</span>
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                label="Spouse Date of Birth"
                name="spouseDateOfBirth"
                type="date"
                defaultValue={memberDetails.spouseDateOfBirth}
                onChange={handleSpouseChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <span className={styles.span}>Spouse Date of Birth</span>
            </label>
            <Typography className={styles.blueTextColor} variant="subtitle1">
              Children
            </Typography>
            {memberDetails.children.map((child, index) => (
              <React.Fragment key={index}>
                <label className={styles.label}>
                  <input
                    className={styles.input}
                    label="Child's Name"
                    name="name"
                    defaultValue={child.name}
                    onChange={(event) => handleChildrenChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                  <span className={styles.span}>Child's Name</span>
                </label>
                <label className={styles.label}>
                  <input
                    className={styles.input}
                    label="Child Date of Birth"
                    name="dob"
                    type="date"
                    defaultValue={child.dob}
                    onChange={(event) => handleChildrenChange(index, event)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span className={styles.span}>Child's Date of Birth</span>
                </label>
              </React.Fragment>
            ))}
            <StyledButton extraFunction={handleAddChild} text={"Add Child"} />
          </React.Fragment>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          {/* <Button onClick={handleNext}> */}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={createMember}>
              Create Member
            </Button>
          ) : (
            <Button ref={submitRef} type="submit">
              <StyledButton text={"Next"} icon={<NextPlan />} />
            </Button>
          )}
          {/* </Button> */}
        </Box>
      </Box>
    </form>
  );
}

export default Step2;
