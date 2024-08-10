import { CheckCircle } from "@mui/icons-material";
import {
  Autocomplete,
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
import { Context } from "../../../../Context";
import styles from "../../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../../UIComponents/Button/StyledButton";
export default function Step3({ handleBack, handleNext, activeStep, steps, createMember, assignedCenter }) {
  let { configurationSettings, memberDetails, axios, setMemberDetails, ActivateToast, cloudinaryInfo } = useContext(Context);
  let [autocompletePlace, setAutocompletePlace] = useState([])
  const [imageUploadStatus, setImageUploadStatus] = useState({
    aadhar: false,
    pan: false,
    resume: false
  });


  const handleAddCertificate = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      certificates: [...prevmemberDetails.certificates, ""],
    }));
  };
  const handleCertificateChange = async (index, event) => {
    ActivateToast("Please Wait while Image is Uploading", "warning");
    const file = event.target.files[0];
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
    // setMemberDetails({ ...memberDetails, resume: link.secure_url });
    // setImageUploadStatus({ ...imageUploadStatus, resume: true });
    ActivateToast("Image is uploaded, fill other details", "success");
    setMemberDetails((prevmemberDetails) => {
      const updatedChildren = [...prevmemberDetails.certificates];
      updatedChildren[index] = link.secure_url;
      console.log(updatedChildren)
      return {
        ...prevmemberDetails,
        certificates: updatedChildren
      };
    });
  };

  //resume image uploading function
  const resumeImageInput = useRef(null);
  const handleResumeImage = async (e) => {
    ActivateToast("Please Wait while Image is Uploading", "warning");
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
    setMemberDetails({ ...memberDetails, resume: link.secure_url });
    setImageUploadStatus({ ...imageUploadStatus, resume: true });
    ActivateToast("Image is uploaded, fill other details", "success");
  };
  // aadhar image uploading function
  const aadharImageInput = useRef(null);
  const handleAadharImage = async (e) => {
    ActivateToast("Please Wait while Image is Uploading", "warning");
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
    setMemberDetails({ ...memberDetails, aadharImage: link.secure_url });
    setImageUploadStatus({ ...imageUploadStatus, aadhar: true });
    ActivateToast("Image is uploaded, fill other details", "success");
  };
  // pan image uploading function
  const panImageInput = useRef(null);
  const handlePanImage = async (e) => {
    ActivateToast("Please Wait while Image is Uploading", "warning");
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
    setMemberDetails({ ...memberDetails, panImage: link.secure_url });
    setImageUploadStatus({ ...imageUploadStatus, pan: true });
    ActivateToast("Image is uploaded, fill other details", "success");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({ ...memberDetails, [name]: value });
  };

  const handleQualificationChange = (index, event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => {
      const updatedQualification = [...prevmemberDetails.qualification];
      updatedQualification[index][name] = value;
      return {
        ...prevmemberDetails,
        qualification: updatedQualification
      };
    });
  };

  const handleAddQualification = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      qualification: [...prevmemberDetails.qualification, { courseName: '', collegeName: '', year: '' }]
    }));
  };

  const handleWorkExperienceChange = (index, event) => {
    const { name, value } = event.target;
    setMemberDetails((prevmemberDetails) => {
      const updatedWorkExperience = [...prevmemberDetails.workExperience];
      updatedWorkExperience[index][name] = value;
      return {
        ...prevmemberDetails,
        workExperience: updatedWorkExperience
      };
    });
  };

  const handleAddWorkExperience = () => {
    setMemberDetails((prevmemberDetails) => ({
      ...prevmemberDetails,
      workExperience: [...prevmemberDetails.workExperience, { companyName: '', duration: '' }]
    }));
  };

  const handleHasWorkExperienceChange = (event) => {
    const { value } = event.target;
    if (value === "no") {
      setMemberDetails((prevmemberDetails) => ({
        ...prevmemberDetails,
        hasWorkExperience: value,
        workExperience: []
      }));
    } else {
      setMemberDetails((prevmemberDetails) => ({
        ...prevmemberDetails,
        hasWorkExperience: value,
        workExperience: [{ companyName: "", duration: "" }]
      }));

    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createMember()
    // Form submission logic here
  };
  let submitRef = useRef(null)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitRef.current.click()
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.form}>

        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.professionalDetails &&
          <>
            <Typography className={styles.title} variant="h5">Professional Details</Typography>

            <Typography className={styles.blueTextColor} variant="h6">Type of Business/Profession/Occupation</Typography>
            <label className={styles.label}>
              <input className={styles.input}
                label="Current Work"
                name="currentWork"
                defaultValue={memberDetails.currentWork}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Current Work</span>
            </label>
            <label className={styles.label}>
              <input className={styles.input}
                label="Designation"
                name="designation"
                defaultValue={memberDetails.designation || ""}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Designation</span>
            </label>
            <label className={styles.label}>
              <input className={styles.input}
                label="Pin Code"
                name="workPinCode"
                type="number"
                defaultValue={memberDetails.workPinCode}
                onChange={async ({ target }) => {
                  setMemberDetails(prev => {
                    return { ...prev, workPinCode: target.value }
                  });
                  if (target.value.length === 6) {
                    let { data: res } = await axe.get(`https://api.postalpincode.in/pincode/${target.value}`);
                    console.log(res[0].PostOffice)
                    setAutocompletePlace(res[0].PostOffice)
                  }
                  if (target.value.length === 0) {

                    setMemberDetails(prev => {
                      return { ...prev, workPlace: "" }
                    });
                  }

                }}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Pin Code</span>
            </label>
            <FormControl fullWidth>
              <Autocomplete
                options={autocompletePlace}
                getOptionLabel={(option) => option.Name}
                onChange={(event, value) => {
                  setMemberDetails({ ...memberDetails, workPlace: value.Name });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Place" value={memberDetails.workPlace || ""} variant="outlined" />
                )}
              />
            </FormControl>
            <label className={styles.label}>
              <input className={styles.input}
                label="Duration"
                name="duration"
                defaultValue={memberDetails.duration}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Duration</span>
            </label>
            <label className={styles.label}>
              <input className={styles.input}
                label="Office Address"
                name="officeAddress"
                defaultValue={memberDetails.officeAddress}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Office Address</span>
            </label>
          </>
        }
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.workExperience &&
          <><Typography className={styles.title} variant="h6">Work Experience</Typography>
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                name="hasWorkExperience"
                defaultValue={memberDetails.hasWorkExperience}
                onChange={handleHasWorkExperienceChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </>
        }
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.workExperience && memberDetails.hasWorkExperience === 'yes' && (
          <React.Fragment>
            {memberDetails.workExperience.map((exp, index) => (
              <React.Fragment key={index}>
                <label className={styles.label}>
                  <input className={styles.input}
                    label="Company Name / Business Name"
                    name="companyName"
                    defaultValue={exp.companyName}
                    onChange={(event) => handleWorkExperienceChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                  <span className={styles.span}>Company Name /  Business Name</span>
                </label>
                <label className={styles.label}>
                  <input className={styles.input}
                    label="Duration"
                    name="duration"
                    defaultValue={exp.duration}
                    onChange={(event) => handleWorkExperienceChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                  <span className={styles.span}>Duration</span>
                </label>
              </React.Fragment>
            ))}
            <StyledButton text={"Add Work Experience"} tooltip={"Add More Work Experience Fields"} extraFunction={handleAddWorkExperience} />
          </React.Fragment>
        )}
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.uploadResume && <>
          <Box>
            <label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={resumeImageInput}
                onChange={handleResumeImage}
                zIndex={"1000"}
              />
              <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
                <StyledButton
                  w="100%"
                  extraFunction={() => {
                    resumeImageInput.current.click();
                  }}
                  text={imageUploadStatus.resume ? "Reupload?" : "Upload Resume"}
                />
                {imageUploadStatus.resume ? <CheckCircle /> : null}
              </Box>
            </label>
          </Box>
        </>}

        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.certificates && memberDetails.certificates.map((certificate, index) => (
          <div key={index}>
            <Box>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => { handleCertificateChange(index, event) }}
              />
            </Box>
          </div>
        ))}
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.certificates &&
          <StyledButton text={"Add Certificate"} extraFunction={handleAddCertificate} />}

        {/* ////////////// */}
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.IDs && <>
          <label className={styles.label}>
            <input className={styles.input}
              label="PAN Number"
              name="panNumber"
              defaultValue={memberDetails.panNumber}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>PAN Number</span>
          </label>
          <Box>
            <label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={panImageInput}
                onChange={handlePanImage}
                zIndex={"1000"}
              />
              <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
                <StyledButton
                  extraFunction={() => {
                    panImageInput.current.click();
                  }}
                  text={imageUploadStatus.pan ? "Reupload?" : "Upload PAN"}
                />
                {imageUploadStatus.pan ? <CheckCircle /> : null}
              </Box>
            </label>
          </Box>
        </>}
        {configurationSettings?.categoryFormPermission?.[memberDetails?.assignedCenter || assignedCenter]?.[memberDetails?.profession]?.IDs &&
          <>
            <label className={styles.label}>
              <input className={styles.input}
                label="Aadhar Number"
                name="aadharNumber"
                defaultValue={memberDetails.aadharNumber}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <span className={styles.span}>Aadhar Number</span>
            </label>
            <Box>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={aadharImageInput}
                  onChange={handleAadharImage}
                  zIndex={"1000"}
                />
                <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
                  <StyledButton
                    extraFunction={() => {
                      aadharImageInput.current.click();
                    }}
                    text={imageUploadStatus.aadhar ? "Reupload?" : "Upload Aadhar"}
                  />
                  {imageUploadStatus.aadhar ? <CheckCircle /> : null}
                </Box>
              </label>
            </Box>
          </>
        }
        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.school && <>
          <Typography className={styles.title} variant="h6">School/College Details</Typography>
          <label className={styles.label}>
            <input className={styles.input}
              label="School/College Details"
              name="school"
              defaultValue={memberDetails.school || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>School/College Details</span>
          </label>
          <label className={styles.label}>
            <input className={styles.input}
              label="Standard/Branch Name"
              name="standard"
              defaultValue={memberDetails.standard || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Standard/Branch Name</span>
          </label>
          <label className={styles.label}>
            <input className={styles.input}
              label="Disability"
              name="disability"
              defaultValue={memberDetails.disability || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Disability</span>
          </label>
        </>}

        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.nativePlace && <label className={styles.label}>
          <input className={styles.input}
            label="Native Place"
            name="nativePlace"
            defaultValue={memberDetails.nativePlace || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <span className={styles.span}>Native Place</span>
        </label>}
        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.bankDetails && <>
          <Typography className={styles.title} variant="h6">Bank Details</Typography>
          <label className={styles.label}>
            <input className={styles.input}
              label="Bank Name"
              name="bankName"
              defaultValue={memberDetails.bankName || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Bank Name</span>
          </label>
          <label className={styles.label}>
            <input className={styles.input}
              label="Account Number"
              name="accountNumber"
              defaultValue={memberDetails.accountNumber || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Account Number</span>
          </label>
          <label className={styles.label}>
            <input className={styles.input}
              label="IFSC"
              name="ifsc"
              defaultValue={memberDetails.ifsc || ""}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>IFSC</span>
          </label>
        </>}

        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.introducedBy && <>
          <Typography className={styles.title} variant="h6">Introduced By</Typography>
          <label className={styles.label}>
            <input className={styles.input}
              label="Name"
              name="introducedBy"
              defaultValue={memberDetails.introducedBy.name}
              onChange={(event) => {
                let temp = event.target.value
                setMemberDetails(prev => ({ ...prev, introducedBy: { ...prev.introducedBy, name: temp } }))
              }}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Name</span>
          </label>
          <label className={styles.label}>
            <input className={styles.input}
              label="Contact"
              name="introducedBy"
              defaultValue={memberDetails.introducedBy.contact}
              onChange={(event) => {
                let temp = event.target.value

                setMemberDetails(prev => ({ ...prev, introducedBy: { ...prev.introducedBy, contact: temp } }))
              }}
              variant="outlined"
              margin="normal"
            />
            <span className={styles.span}>Contact</span>
          </label>
        </>}

        <Box
          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
        >
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
            <Button ref={submitRef} type="submit">
              <StyledButton text={"Create Member"} />
            </Button>
          ) : (
            <Button type="submit">
              <StyledButton text={"Next"} />
            </Button>
          )}
          {/* </Button> */}
        </Box>
      </Box>
    </form>
  );
}
