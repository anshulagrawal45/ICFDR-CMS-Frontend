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

export default function ExternalStep1({
  handleBack,
  handleNext,
  activeStep,
  steps,
  createMember,
  data,
  setData,
  isLoading,
  configurationSettings
}) {
  const {
    apiLink,
    assignedCenter,
    membersData,
    isAdmin,
    centers,
    cloudinaryInfo,
    ActivateToast,
    universalLoading,
    role,
  } = useContext(Context);

  let [allMembersData, setAllMembersData] = useState([]);
  let [autocompletePlace, setAutocompletePlace] = useState([]);
  

  const handleLifePatrionChange = (event) => {
    const { value } = event.target;
    setData({
      ...data,
      lifePatron: value,
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     let { data } = await axios.get(`${apiLink}member`);
  //     setAllMembersData(data);
  //   })();
  //   setData({ ...data, assignedCenter: assignedCenter });
  // }, [])

  const handleInitiatedChange = (event) => {
    const { value } = event.target;
    setData({
      ...data,
      initiated: value,
      initiationName: "",
      spiritualMasterName: "",
      initiationDate: "",
      initiationPlace: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    if (name === "mobileNumber" && value.length === 10) {
      for (let i of allMembersData) {
        if (i.phone === value) {
          ActivateToast("User with this Number Already Exists!", "warning");
          setData({ ...data, mobileNumber: "" });
          break;
        }
      }
    }
    if (name === "email") {
      for (let i of allMembersData) {
        if (i.email === value) {
          ActivateToast("User with this Email Already Exists!", "warning");
          setData({ ...data, email: "" });
          break;
        }
      }
    }
    if (name === "whatsappNumber") {
      for (let i of allMembersData) {
        if (i.details.whatsappNumber === value) {
          ActivateToast(
            "User with this WhatsApp Number Already Exists!",
            "warning"
          );
          setData({ ...data, whatsappNumber: "" });
          break;
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
    // Form submission logic here
  };

  return isLoading===false ?(
    <form onSubmit={handleSubmit}>
      <Box display={"flex"} flexDirection={"column"}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Assign a Center"
            name="assignedCenter"
            type="text"
            value={data.assignedCenter}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth >
          <TextField
            label="Assign a Profession"
            name="profession"
            type="text"
            value={data?.profession}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Date of Membership"
            name="dateOfMembership"
            type="date"
            value={data?.dateOfMembership}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        {configurationSettings?.categoryFormPermission[data?.assignedCenter][data?.profession]?.lifePatron && <FormControl component="fieldset" margin="normal" sx={{ fontWeight: 700 }}>
          <Typography variant="subtitle1">Life Patron</Typography>
          <RadioGroup
            name="lifePatron"
            value={data.lifePatron}
            onChange={handleLifePatrionChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.lifePatron && data.lifePatron === "yes" && (
          <div>
            <FormControl fullWidth>
              <TextField
                label="Donor Type"
                name="donorType"
                value={data.donorType}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="LP Number"
                name="lpNumber"
                value={data.lpNumber}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
          </div>
        )}
        <br />
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.initiated && <FormControl component="fieldset" margin="normal" sx={{ fontWeight: 700 }}>
          <Typography variant="subtitle1">Initiated</Typography>
          <RadioGroup
            name="initiated"
            value={data.initiated}
            onChange={handleInitiatedChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>}
        {configurationSettings?.categoryFormPermission[data?.assignedCenter || assignedCenter][data?.profession]?.initiated && data.initiated === "yes" && (
          <div>
            <FormControl fullWidth>
              <TextField
                label="Initiation Name"
                name="initiationName"
                value={data.initiationName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Spiritual Master Name"
                name="spiritualMasterName"
                value={data.spiritualMasterName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Initiation Date"
                name="initiationDate"
                type="date"
                value={data.initiationDate}
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
                label="Initiation Place"
                name="initiationPlace"
                value={data.initiationPlace}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </FormControl>

          </div>
        )}
        <Typography fontWeight="900">Personal Details</Typography>
        <FormControl fullWidth>
          <TextField
            label="Legal Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Residence Address"
            name="residenceAddress"
            value={data.residenceAddress}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Pin Code"
            name="pinCode"
            type="number"
            value={data.pinCode}
            onChange={async ({ target }) => {
                 setData((prev) => {
                return { ...prev, pinCode: target.value };
              });

              if (target.value.length === 6) {
                axios.get(
                  `https://api.postalpincode.in/pincode/${target.value}`
                ).then(data => {
                  let res = data.data
                  setAutocompletePlace(res[0].PostOffice || [{ Name: "Please Try Writing Again" }]);

                  if (res[0]?.PostOffice[0]?.Name) {
                        setData((prev) => {
                  return { ...prev, place: res[0].PostOffice[0].Name || "" };
                });
                  }
                }).catch(err => console.log(err))

              }
              if (target.value.length === 0) {
                    setData((prev) => {
                  return { ...prev, place: "" };
                });
              }
            }}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <Autocomplete
            options={autocompletePlace}
            getOptionLabel={(option) => option.Name}
            onChange={(event, value) => {
              setData({ ...data, place: value.Name });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Post Office"
                value={data.place || ""}
                variant="outlined"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="number"
            label="Mobile Number"
            name="mobileNumber"
            color={
              data.mobileNumber.length < 10 ||
                data.mobileNumber.length > 10
                ? "warning"
                : "success"
            }
            value={data.mobileNumber}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="WhatsApp Number"
            name="whatsappNumber"
            color={
              data.whatsappNumber.length < 10 ||
                data.whatsappNumber.length > 10
                ? "warning"
                : "success"
            }
            value={data.whatsappNumber}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
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
  ):"Loading"
}
