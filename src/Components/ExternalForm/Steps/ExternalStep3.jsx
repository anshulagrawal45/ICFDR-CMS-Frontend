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
import { useContext, useRef, useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import { Context } from "../../../Context";

export default function ExternalStep3({
  handleBack,
  handleNext,
  activeStep,
  steps,
  createMember,
  assignedCenter,
  data,
  setData,
  configurationSettings,
}) {
  let { ActivateToast, cloudinaryInfo, axios } = useContext(Context);
  const [imageUploadStatus, setImageUploadStatus] = useState({
    aadhar: false,
    pan: false,
    resume: false,
  });

  const handleAddCertificate = () => {
    setData((prevdata) => ({
      ...prevdata,
      certificates: [...prevdata.certificates, ""],
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

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    // setData({ ...data, resume: link.secure_url });
    // setImageUploadStatus({ ...imageUploadStatus, resume: true });
    ActivateToast("Image is uploaded, fill other details", "success");
    setData((prevdata) => {
      const updatedChildren = [...prevdata.certificates];
      updatedChildren[index] = link.secure_url;
      console.log(updatedChildren);
      return {
        ...prevdata,
        certificates: updatedChildren,
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

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setData({ ...data, resume: link.secure_url });
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

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setData({ ...data, aadharImage: link.secure_url });
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

    let link = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData1
    );
    link = link.data;
    setData({ ...data, panImage: link.secure_url });
    setImageUploadStatus({ ...imageUploadStatus, pan: true });
    ActivateToast("Image is uploaded, fill other details", "success");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // const handleQualificationChange = (index, event) => {
  //   const { name, value } = event.target;
  //   setData((prevdata) => {
  //     const updatedQualification = [...prevdata.qualification];
  //     updatedQualification[index][name] = value;
  //     return {
  //       ...prevdata,
  //       qualification: updatedQualification
  //     };
  //   });
  // };

  // const handleAddQualification = () => {
  //   setData((prevdata) => ({
  //     ...prevdata,
  //     qualification: [...prevdata.qualification, { courseName: '', collegeName: '', year: '' }]
  //   }));
  // };

  const handleWorkExperienceChange = (index, event) => {
    const { name, value } = event.target;
    setData((prevdata) => {
      const updatedWorkExperience = [...prevdata.workExperience];
      updatedWorkExperience[index][name] = value;
      return {
        ...prevdata,
        workExperience: updatedWorkExperience,
      };
    });
  };

  const handleAddWorkExperience = () => {
    setData((prevdata) => ({
      ...prevdata,
      workExperience: [
        ...prevdata.workExperience,
        { companyName: "", duration: "" },
      ],
    }));
  };

  const handleHasWorkExperienceChange = (event) => {
    const { value } = event.target;
    setData((prevdata) => ({
      ...prevdata,
      hasWorkExperience: value,
      workExperience: [],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createMember();
    // Form submission logic here
  };

  const handleMarriageChange = (event) => {
    const { value } = event.target;
    setData((prevdata) => ({
      ...prevdata,
      isMarried: value,
      spouseName: "",
      spouseDateOfBirth: "",
      children: [{ dob: "", name: "" }],
    }));
  };

  const handleSpouseChange = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const handleDateOfMarriage = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleChildrenChange = (index, event) => {
    const { name, value } = event.target;
    setData((prevdata) => {
      const updatedChildren = [...prevdata.children];
      updatedChildren[index][name] = value;
      return {
        ...prevdata,
        children: updatedChildren,
      };
    });
  };
  const handleSiblingChange = (index, event) => {
    const { name, value } = event.target;
    setData((prevdata) => {
      const updatedChildren = [...prevdata.children];
      updatedChildren[index][name] = value;
      return {
        ...prevdata,
        children: updatedChildren,
      };
    });
  };

  const handleAddChild = () => {
    setData((prevdata) => ({
      ...prevdata,
      children: [...prevdata.children, { name: "", dob: "" }],
    }));
  };
  const handleAddSibling = () => {
    setData((prevdata) => ({
      ...prevdata,
      siblings: [...prevdata.siblings, { name: "", occupation: "", dob: "" }],
    }));
  };

  const handleQualificationChange = (index, event) => {
    const { name, value } = event.target;
    setData((prevdata) => {
      const updatedQualification = [...prevdata.qualification];
      updatedQualification[index][name] = value;
      return {
        ...prevdata,
        qualification: updatedQualification,
      };
    });
  };

  const handleAddQualification = () => {
    setData((prevdata) => ({
      ...prevdata,
      qualification: [
        ...prevdata.qualification,
        { courseName: "", collegeName: "", year: "" },
      ],
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box display={"flex"} flexDirection={"column"}>

        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.familyDetails && <>
        <Typography variant="h6">Family Details</Typography>
          <div>
            <FormControl fullWidth>
              <TextField
                label="Father's Name"
                name="fathersName"
                value={data.fathersName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Father's Date of Birth"
                name="fathersDob"
                type="date"
                value={data.fathersDob}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Occupation"
                name="fathersOccupation"
                value={data.fathersOccupation}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Mother's Name"
                name="mothersName"
                value={data.mothersName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Mother's Date of Birth"
                name="mothersDob"
                type="date"
                value={data.mothersDob}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Mother's Occupation"
                name="mothersOccupation"
                value={data.mothersOccupation}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Parent's Date of Marriage"
                name="parentsDateOfMarriage"
                type="date"
                value={data.parentsDateOfMarriage}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            {data?.siblings.map((sibling, index) => (
              <div key={index}>
                <FormControl fullWidth>
                  <TextField
                    label="Sibling's Name"
                    name="name"
                    value={sibling.name}
                    onChange={(event) => handleSiblingChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Sibling's Date of Birth"
                    name="dob"
                    type="date"
                    value={sibling.dob}
                    onChange={(event) => handleSiblingChange(index, event)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Sibling's Occupation"
                    name="occupation"
                    value={sibling.occupation}
                    onChange={(event) => handleSiblingChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                </FormControl>
              </div>
            ))}
            <Button onClick={handleAddSibling}>Add Sibling</Button>
          </div>
        </>}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.marrriageDetails && <>
        <Typography variant="h6">Marriage Details</Typography>
        <FormControl component="fieldset" margin="normal">
          <Typography variant="subtitle1">Married</Typography>
          <RadioGroup
            name="isMarried"
            value={data.isMarried}
            onChange={handleMarriageChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        {data.isMarried === "yes" && (
          <div>
            <FormControl fullWidth>
              <TextField
                label="Spouse Name"
                name="spouseName"
                value={data.spouseName}
                onChange={handleSpouseChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Date of Marriage"
                name="dateOfMarriage"
                type="date"
                value={data.dateOfMarriage}
                onChange={handleDateOfMarriage}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Spouse Date of Birth"
                name="spouseDateOfBirth"
                type="date"
                value={data.spouseDateOfBirth}
                onChange={handleSpouseChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <Typography variant="subtitle1">Children</Typography>
            {data.children.map((child, index) => (
              <div key={index}>
                <FormControl fullWidth>
                  <TextField
                    label="Child Name"
                    name="name"
                    value={child.name}
                    onChange={(event) => handleChildrenChange(index, event)}
                    variant="outlined"
                    margin="normal"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Child Date of Birth"
                    name="dob"
                    type="date"
                    value={child.dob}
                    onChange={(event) => handleChildrenChange(index, event)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </div>
            ))}
            <Button onClick={handleAddChild}>Add Child</Button>
          </div>
        )}
        </>}
          {configurationSettings?.categoryFormPermission?.[
            data?.assignedCenter || assignedCenter
          ]?.[data?.profession]?.IDs && (
            <>
              <FormControl fullWidth>
                <TextField
                  label="PAN Number"
                  name="panNumber"
                  value={data.panNumber}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
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
                  <Box
                    display={"flex"}
                    justifyContent={"left"}
                    alignItems={"center"}
                  >
                    <Button
                      w="100%"
                      onClick={() => {
                        panImageInput.current.click();
                      }}
                    >
                      {imageUploadStatus.pan ? "Reupload?" : "Upload PAN"}
                    </Button>
                    {imageUploadStatus.pan ? <CheckCircle /> : null}
                  </Box>
                </label>
              </Box>
              <FormControl fullWidth>
                <TextField
                  label="Aadhar Number"
                  name="aadharNumber"
                  value={data.aadharNumber}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
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
                  <Box
                    display={"flex"}
                    justifyContent={"left"}
                    alignItems={"center"}
                  >
                    <Button
                      w="100%"
                      onClick={() => {
                        aadharImageInput.current.click();
                      }}
                    >
                      {imageUploadStatus.aadhar ? "Reupload?" : "Upload Aadhar"}
                    </Button>
                    {imageUploadStatus.aadhar ? <CheckCircle /> : null}
                  </Box>
                </label>
              </Box>
            </>
          )}
          {configurationSettings?.categoryFormPermission?.[
            data?.assignedCenter || assignedCenter
          ]?.[data?.profession]?.uploadResume && (
            <>
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
                  <Box
                    display={"flex"}
                    justifyContent={"left"}
                    alignItems={"center"}
                  >
                    <Button
                      w="100%"
                      onClick={() => {
                        resumeImageInput.current.click();
                      }}
                    >
                      {imageUploadStatus.resume ? "Reupload?" : "Upload Resume"}
                    </Button>
                    {imageUploadStatus.resume ? <CheckCircle /> : null}
                  </Box>
                </label>
              </Box>
            </>
          )}

          {data.certificates.map((certificate, index) => (
            <div key={index}>
              <Box>
                {/* <label> */}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  // style={{ display: "none" }}
                  // ref={resumeImageInput}
                  onChange={(event) => {
                    handleCertificateChange(index, event);
                  }}
                  // zIndex={"1000"}
                />
              </Box>
            </div>
          ))}
          <Box display={"flex"} width={"100%"} justifyContent={"flex-start"}>
            <Button
              title="Upload College/School Certificates"
              onClick={handleAddCertificate}
            >
              Add School/College Certificate
            </Button>
          </Box>
          {configurationSettings?.categoryFormPermission[
            data?.assignedCenter || assignedCenter
          ][data?.profession]?.nativePlace && (
            <FormControl fullWidth>
              <TextField
                label="Native Place"
                name="nativePlace"
                value={data.nativePlace || ""}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
          )}
          {configurationSettings?.categoryFormPermission[
            data?.assignedCenter || assignedCenter
          ][data?.profession]?.bankDetails && (
            <>
              <FormControl fullWidth>
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={data.bankName || ""}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={data.accountNumber || ""}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="IFSC"
                  name="ifsc"
                  value={data.ifsc || ""}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
            </>
          )}
          {configurationSettings?.categoryFormPermission[
            data?.assignedCenter || assignedCenter
          ][data?.profession]?.introducedBy && (
            <>
            <Typography variant="h6">Introduced By</Typography>
            <FormControl fullWidth>
            <TextField
              label="Name"
              title="Name of person who introduced you to us!"
              name="Contact"
              value={data?.introducedBy?.name}
              onChange={(e)=>{
                setData(prev=>{
                  let temp = {...prev.introducedBy,name:e.target.value}
                  prev.introducedBy=temp
                  return {...prev}
                })
              }}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
            <FormControl fullWidth>
            <TextField
              label="Contact"
              title="Contact of person who introduced you to us!"
              name="Contact"
              value={data?.introducedBy?.contact}
              onChange={(e)=>{
                setData(prev=>{
                  let temp = {...prev.introducedBy,contact:e.target.value}
                  prev.introducedBy=temp
                  return {...prev}
                })
              }}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
            </>
          )}
          
        </Box>
        <br />
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
            <Button variant="contained" type="submit">
              Create Member
            </Button>
          ) : (
            <Button variant="outlined" type="submit">
              Next
            </Button>
          )}
          {/* </Button> */}
        </Box>
      </Box>
    </form>
  );
}
