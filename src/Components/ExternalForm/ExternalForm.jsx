import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from "@mui/material"
import axe from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../Context"
import { uid } from "uid"
import ExternalStep1 from "./Steps/ExternalStep1"
import ExternalStep2 from "./Steps/ExternalStep2"
import ExternalStep3 from "./Steps/ExternalStep3"
import { whatsAppTemplates } from "../WhatsApp/Templates"

const style = {
    margin: "auto",
    width: ["60%", 500],
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

const ExternalForm = () => {
    const { formID } = useParams();
    const [data, setData] = useState({})
    const [configurationSettings, setConfigurationSettings] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [memberId, setMemberId] = useState("")
    const {axios} = useContext(Context)

    async function fetchData(){
      await axe.get(`${apiLink}form/${formID}`).then(({ data }) => {
        setData(data.filledData)
        setMemberId(data.memberID)
        if(data.isFormSubmitted){
          navigate("/")
          ActivateToast("You've already submitted the form","warning")
        }
    }).then(res=>console.log(res)).catch(err=>console.log(err))
   await axios.get(`${apiLink}configuration/${"647589da7d9cb06b225e4638"}`).then(({ data }) => {
        setConfigurationSettings(data)
        console.log(data)
    })
    setIsLoading(false)
    }
    useEffect(() => {
        setIsLoading(true)
        fetchData()
        // axios.get(`${apiLink}form/${formID}`).then(({ data }) => {
        //     setData(data.filledData)
        // })
        // axios.get(`${apiLink}configuration/${"647589da7d9cb06b225e4638"}`).then(({ data }) => {
        //     setConfigurationSettings(data)
        //     console.log(data)
        // })
        
    }, [])
    let {
        assignedCenter,
        membersData,
        setMembersData,
        userID,
        ActivateToast,
        apiLink,
        userName,
        isAdmin, role, hide, PostToLogs, sendWhatsAppMessage, userWhatsApp
      } = useContext(Context);
      let navigate = useNavigate()
      const [open, setOpen] = useState(false);
   
    
      const [activeStep, setActiveStep] = useState(0);
      const [skipped, setSkipped] = useState(new Set());
    
      function createMember() {
        let { mobileNumber: phone, email, dateOfBirth: dob, assignedCenter: center, _id } = data;
        delete data.mobileNumber;
        delete data.email;
        delete data.dateOfBirth;
        delete data.assignedCenter;
        delete data._id;
        let temp = {
          _id:memberId,
          phone, email, dob, center: center || assignedCenter, details: data,
          createdBy: userName,
          userID,
          hidden: hide
        }
        setMembersData([...membersData, temp]);
        
        axios.post(apiLink + "member", temp).then(res=>{
          console.log(res)
          ActivateToast("Member Created Successfully", "success")
          axios.patch(`${apiLink}form/${formID}`,{isFormSubmitted:true})
          PostToLogs(`Created ${temp.details.name} as a new member`)
        }).catch(err=>{
          console.log(err)
          ActivateToast(err.message, "error")
        })
    
        setActiveStep(0)
        setData({
          assignedCenter: assignedCenter,
          profession: "",
          lifePatron: "no",
          donorType: "",
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
          workExperience: [],
          siblings: [],
          fathersName: "",
          fathersDob: "",
          fathersOccupation: "",
          mothersName: "",
          mothersDob: "",
          mothersOccupation: "",
          parentsDateOfMarriage: "",
          resume: "",
          certificates: []
    
        })
        setOpen(false)
        navigate("/")
        
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
      // console.log(configurationSettings)
      return (
        <div>
              <Box sx={style}>
    
                <Container component="main" maxWidth="100%">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
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
                          {activeStep === 0 ? (
                            <ExternalStep1 configurationSettings={configurationSettings} isLoading={isLoading} data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={steps} createMember={createMember} />
                          ) : activeStep === 1 ? (
                            <ExternalStep2 configurationSettings={configurationSettings} isLoading={isLoading} data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={steps} createMember={createMember} />
                          ) : (
                            <ExternalStep3 configurationSettings={configurationSettings} isLoading={isLoading} data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={steps} createMember={createMember} />
                          )}
                          {/* <Box
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
                              <Button variant="contained" onClick={createMember}>
                                Create Member
                              </Button>
                            ) : (
                              <Button variant="outlined" onClick={handleNext}>
                                Next
                              </Button>
                            )}
                          </Box> */}
                        </React.Fragment>
                      )}
                    </Box>
                  </Box>
                </Container>
              </Box>
        </div>
      );
}

export default ExternalForm