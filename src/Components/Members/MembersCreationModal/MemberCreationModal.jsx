import { Close } from "@mui/icons-material";
import { IconButton, Step, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { uid } from "uid";
import { Context } from "../../../Context";
import StyledButton from "../../UIComponents/Button/StyledButton";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
const style = {
  margin: "auto",
  width: ["90%", 500],
  height: ["auto"],
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: [1, "20px 0"],
};

export default function MemberCreation() {
  let {
    assignedCenter,
    memberDetails,
    membersData,
    setMembersData,
    setMemberDetails,
    userID,
    ActivateToast,
    apiLink,
    axios,
    userName,
    isAdmin,
    role,
    hide,
    PostToLogs,
  } = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  try {
    const handleOpen = () => {
      if (role === "Admin" || role === "Leader" || isAdmin) {
        return setOpen(true);
      }
      return ActivateToast("Access Denied", "error");
    };
    const handleClose = () => setOpen(false);

    function createMember() {
      let {
        whatsappNumber,
        mobileNumber: phone,
        email,
        dateOfBirth: dob,
        assignedCenter: center,
        _id,
      } = memberDetails;
      delete memberDetails.mobileNumber;
      delete memberDetails.email;
      delete memberDetails.dateOfBirth;
      delete memberDetails.assignedCenter;
      delete memberDetails._id;
      let temp = {
        _id,
        phone,
        email,
        dob,
        center: center || assignedCenter,
        details: memberDetails,
        createdBy: userName,
        userID,
        hidden: hide,
      };
      axios
        .post(apiLink + "member", temp)
        .then((res) => {
          if (res.data.error) {
            return ActivateToast(res.data.error, "error")
          }
          else {
            setMembersData([...membersData, temp]);
            axios.post(apiLink + "customersInfo", {
              name: temp.details.name,
              email: temp.email,
              contact: temp.phone,
              userID,
            });
            axios.post(apiLink + "whatsappMemberCreated", { number: whatsappNumber })
            PostToLogs(`Created ${temp.details.name} as a new member`);
          }
          ActivateToast("Member Created Successfully", "success");
        })
        .catch((err) => {
          console.log(err);
        });

      setActiveStep(0);
      setMemberDetails({
        assignedCenter: assignedCenter,
        profession: "",
        lifePatron: "no",
        donorType: "Occasional",
        lpNumber: "",
        name: "",
        initiated: "no",
        initiationName: "",
        spiritualMasterName: "",
        initiationDate: "",
        initiationPlace: "",
        residenceAddress: "",
        mobileNumber: "",
        whatsappNumber: "",
        dateOfBirth: "",
        email: "",
        photo: "",
        panNumber: "",
        panImage: "",
        aadharNumber: "",
        aadharImage: "",
        officeAddress: "",
        introducedBy: "",
        dateOfMembership: "",
        dateOfMarriage: "",
        gender: "",
        isMarried: "",
        spouseName: "",
        spouseDateOfBirth: "",
        children: [],
        qualification: [{ courseName: "", collegeName: "", year: "" }],
        designation: "",
        currentWork: "",
        workPinCode: "",
        workPlace: "",
        place: "",
        duration: "",
        hasWorkExperience: "no",
        workExperience: [{ companyName: "", duration: "" }],
        siblings: [],
        fathersName: "",
        fathersDob: "",
        fathersOccupation: "",
        mothersName: "",
        mothersDob: "",
        mothersOccupation: "",
        parentsDateOfMarriage: "",
        resume: "",
        certificates: [],
      });
      setOpen(false);
    }

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = ["Step 1", "Step 2", "Step 3"];

    const handleReset = () => {
      setActiveStep(0);
    };
    return (
      <div>
        <StyledButton text={"Create Member"} tooltip={"Create a New Member"} extraFunction={() => {
          handleOpen();
          setMemberDetails((prev) => {
            return {
              ...prev,
              _id: uid(24),
            };
          });
        }} />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          sx={{ overflow: "scroll" }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Container component="main" maxWidth="100%">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", top: 20, right: 15 }}
                  >
                    <Close />
                  </IconButton>
                  <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    {activeStep === steps.length ? (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {/* render component here for different steps */}
                        {activeStep == 0 ? (
                          <Step1
                            handleNext={handleNext}
                            handleBack={handleBack}
                            activeStep={activeStep}
                            steps={steps}
                            createMember={createMember}
                          />
                        ) : activeStep == 1 ? (
                          <Step2
                            handleNext={handleNext}
                            handleBack={handleBack}
                            activeStep={activeStep}
                            steps={steps}
                            createMember={createMember}
                          />
                        ) : (
                          <Step3
                            handleNext={handleNext}
                            handleBack={handleBack}
                            activeStep={activeStep}
                            steps={steps}
                            createMember={createMember}
                          />
                        )}
                      </React.Fragment>
                    )}
                  </Box>
                </Box>
              </Container>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  } catch (error) {
    return <div>
      <h1>Error occurred</h1>
      <p>{error.message}</p>
      {/* You can render an error message or an alternate component here */}
    </div>
  }
}
