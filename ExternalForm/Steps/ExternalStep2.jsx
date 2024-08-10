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
import { useContext, useState } from "react";
import { Context } from "../../../Context";
import axios from "axios";

export default function ExternalStep2({
  handleBack,
  handleNext,
  activeStep,
  steps,
  createMember,
  data,
  setData,
  configurationSettings
}) {
  let { assignedCenter } = useContext(Context);
  let [autocompletePlace, setAutocompletePlace] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
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
  return (
    <form onSubmit={handleSubmit}>
      <Box display={"flex"} flexDirection={"column"}>
        <FormControl fullWidth>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <Typography variant="subtitle1">Gender</Typography>
          <RadioGroup
            name="gender"
            value={data.gender}
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
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.school && <>
          <FormControl fullWidth>
          <TextField
            label="School"
            name="school"
            value={data.school || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Standard"
            name="standard"
            value={data.standard || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Disability"
            name="disability"
            value={data.disability || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </FormControl>
        </>}
          {configurationSettings?.categoryFormPermission?.[
            data?.assignedCenter || assignedCenter
          ]?.[data?.profession]?.professionalDetails && (
            <>
              <Typography variant="h5">Professional Details</Typography>

              <Typography variant="h6">
                Type of Business/Profession/Occupation
              </Typography>
              <FormControl fullWidth>
                <TextField
                  label="Current Work"
                  name="currentWork"
                  value={data.currentWork}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Designation"
                  name="designation"
                  value={data.designation || ""}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Pin Code"
                  name="workPinCode"
                  type="number"
                  value={data.workPinCode}
                  onChange={async ({ target }) => {
                    setData((prev) => {
                      return { ...prev, workPinCode: target.value };
                    });
                    if (target.value.length === 6) {
                      let { data: res } = await axios.get(
                        `https://api.postalpincode.in/pincode/${target.value}`
                      );
                      setAutocompletePlace(res[0].PostOffice);
                    }
                    if (target.value.length === 0) {
                      setData((prev) => {
                        return { ...prev, workPlace: "" };
                      });
                    }
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <Autocomplete
                  options={autocompletePlace}
                  getOptionLabel={(option) => option.Name}
                  onChange={(event, value) => {
                    setData({ ...data, workPlace: value.Name });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Place"
                      value={data.workPlace || ""}
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Duration"
                  name="duration"
                  value={data.duration}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Office Address"
                  name="officeAddress"
                  value={data.officeAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
            </>
          )}
          {configurationSettings?.categoryFormPermission?.[
            data?.assignedCenter || assignedCenter
          ]?.[data?.profession]?.workExperience && (
            <>
              <Typography variant="h6">Work Experience</Typography>
              <FormControl component="fieldset" margin="normal">
                <RadioGroup
                  name="hasWorkExperience"
                  value={data.hasWorkExperience}
                  onChange={handleHasWorkExperienceChange}
                  row
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </>
          )}
          {configurationSettings?.categoryFormPermission?.[
            data?.assignedCenter || assignedCenter
          ]?.[data?.profession]?.workExperience &&
            data.hasWorkExperience === "yes" && (
              <div>
                {data.workExperience.map((exp, index) => (
                  <div key={index}>
                    <FormControl fullWidth>
                      <TextField
                        label="Company Name / Business Name"
                        name="companyName"
                        value={exp.companyName}
                        onChange={(event) =>
                          handleWorkExperienceChange(index, event)
                        }
                        variant="outlined"
                        margin="normal"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        label="Duration"
                        name="duration"
                        value={exp.duration}
                        onChange={(event) =>
                          handleWorkExperienceChange(index, event)
                        }
                        variant="outlined"
                        margin="normal"
                      />
                    </FormControl>
                  </div>
                ))}
                <Button onClick={handleAddWorkExperience}>
                  Add Work Experience
                </Button>
              </div>
            )}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.qualification && <Typography variant="h6">Qualification</Typography>}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.qualification &&
          data.qualification.map((qual, index) => (
            <div key={index}>
              <FormControl fullWidth>
                <TextField
                  label="Course Name"
                  name="courseName"
                  value={qual.courseName}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="College Name"
                  name="collegeName"
                  value={qual.collegeName}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Year"
                  name="year"
                  value={qual.year}
                  onChange={(event) => handleQualificationChange(index, event)}
                  variant="outlined"
                  margin="normal"
                />
              </FormControl>
            </div>
          ))}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.qualification && <Button fullWidth onClick={handleAddQualification}>Add Qualification</Button>}

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
          <Button variant="contained" onClick={createMember}>
            Create Member
          </Button>
        ) : (
          <Button variant="outlined" type="submit">
            Next
          </Button>
        )}
        {/* </Button> */}
      </Box>
    </form>
  );
}
