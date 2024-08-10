import { NextPlan, PersonAdd } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../../Context";
import styles from "../../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../../UIComponents/Button/StyledButton";

function Step1({ handleBack, handleNext, activeStep, steps, createMember }) {
  const { axios, memberDetails, apiLink, setMemberDetails, assignedCenter, isAdmin, centers, configurationSettings, ActivateToast, universalLoading, setUniversalLoading } = useContext(Context);

  let [allMembersData, setAllMembersData] = useState([])
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");

  const handleLifePatrionChange = (event) => {
    const { value } = event.target;
    setMemberDetails({
      ...memberDetails,
      lifePatron: value,
    });
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${apiLink}member`);
      setAllMembersData(data);
    })();
    setMemberDetails({ ...memberDetails, assignedCenter: assignedCenter });
  }, [])

  const handleInitiatedChange = (event) => {
    const { value } = event.target;
    setMemberDetails({
      ...memberDetails,
      initiated: value,
      initiationName: "",
      spiritualMasterName: "",
      initiationDate: "",
      initiationPlace: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberDetails({ ...memberDetails, [name]: value });
    if (name === "mobileNumber" && value.length === 10) {
      for (let i of allMembersData) {
        if (i.phone === value) {
          ActivateToast("User with this Number Already Exists!", "warning")
          setMemberDetails({ ...memberDetails, mobileNumber: '' });
          break;
        }
      }
    }
    if (name === "email") {
      for (let i of allMembersData) {
        if (i.email === value) {
          ActivateToast("User with this Email Already Exists!", "warning")
          setMemberDetails({ ...memberDetails, email: '' });
          break;
        }
      }
    }
    if (name === "whatsappNumber") {
      for (let i of allMembersData) {
        if (i.details.whatsappNumber === value) {
          ActivateToast("User with this WhatsApp Number Already Exists!", "warning")
          setMemberDetails({ ...memberDetails, whatsappNumber: '' });
          break;
        }
      }
    }
  };

  let submitRef = useRef(null)
  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext()
  };
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

  return universalLoading ? (
    <Typography>Loading</Typography>
  ) : (
    <form onSubmit={handleSubmit}>
      <Box className={styles.form}>
        <label className={styles.label}>
          <select
            className={styles.input}
            name="assignedCenter"
            label="Assign a Center"
            defaultValue={assignedCenter || ""}
            value={memberDetails.assignedCenter || assignedCenter || ""}
            onChange={handleChange}
            required
          >
            <option value="">None</option>
            {universalLoading === false ? (
              isAdmin ? (
                configurationSettings?.centers?.map((center, i) => {
                  return (
                    <option key={i} value={center}>
                      {center.toUpperCase()}
                    </option>
                  );
                })
              ) : (
                centers?.map((center, i) => {
                  return (
                    <option key={i} value={center}>
                      {center.toUpperCase()}
                    </option>
                  );
                })
              )
            ) : null}
          </select>

          <span className={styles.span}>Assign A Center</span>
        </label>
        {/* <FormControl fullWidth margin="normal"> */}
        {/* <InputLabel>Assign a Profession</InputLabel> */}
        <label className={styles.label}>
          <select
            className={styles.input}
            name="profession"
            label="Assign a Profession"
            defaultValue={memberDetails?.profession || ""}
            onChange={handleChange}
            required
          >
            {universalLoading === false && configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter] ?
              Object?.keys(configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter])?.map((center, i) => {
                return (
                  <option key={i} value={center}>
                    {center?.toUpperCase()}
                  </option>
                );
              })
              : null}
          </select>
          <span className={styles.span}>Assign A Profession</span>
        </label>
        {/* </FormControl> */}
        <label className={styles.label}>
          <input
            className={styles.input}
            // label="Date of Membership"
            name="dateOfMembership"
            type="date"
            defaultValue={new Date().getUTCDate()}
            onChange={handleChange}
            required
          />
          <span className={styles.span} style={{ top: "25px" }}>Date of Membership</span>
        </label>
        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter] && configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.lifePatron && <FormControl component="fieldset" margin="normal" sx={{ fontWeight: 700 }}>
          <Typography className={styles.blueTextColor} variant="subtitle1">Life Patron</Typography>
          <RadioGroup
            name="lifePatron"
            defaultValue={memberDetails.lifePatron}
            onChange={handleLifePatrionChange}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>}
        {configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter] && configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter][memberDetails?.profession]?.lifePatron && memberDetails.lifePatron === "yes" && (
          <>
            <label className={styles.label}>
              <select
                className={styles.input}
                // label="Donor Type" 
                name="donorType"
                defaultValue={memberDetails.donorType || ""}
                onChange={handleChange}
                required
              >
                {universalLoading === false && configurationSettings?.categoryFormPermission[memberDetails?.assignedCenter || assignedCenter] ?
                  configurationSettings?.donorTypeForm[memberDetails?.assignedCenter || assignedCenter]?.map((center, i) => {
                    return (
                      <option key={i} value={center}>
                        {center.toUpperCase()}
                      </option>
                    );
                  })
                  : null}
              </select>
              <span className={styles.span}>Donor Type</span>
            </label>
            <label className={styles.label}>
              <input
                className={styles.input}
                label="LP Number"
                name="lpNumber"
                defaultValue={memberDetails.lpNumber}
                onChange={handleChange}
              />
              <span className={styles.span}>LP Number</span>
            </label>
          </>
        )}
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

          {activeStep === steps.length - 1 ? (
            <Button onClick={createMember}>
              <StyledButton text={"Create Member"} icon={<PersonAdd />} />
            </Button>
          ) : (
            <Button ref={submitRef} type="submit">
              <StyledButton text={"Next"} icon={<NextPlan />} />
            </Button>
          )}
        </Box>
      </Box>
    </form>
  )
}
export default (Step1)