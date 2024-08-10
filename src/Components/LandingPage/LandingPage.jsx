import { Box, Typography } from "@mui/material";
import MemberLoginModal from "../MemberLogin/MemberLoginModal";
import OurActivities from "./OurActivities";
import LogoTitle from "./LogoTitle";
import Notifications from "../Notifications/Notifications";

export default function LandingPage() {
   return (
    <Box position={"relative"} >
      <Box
        display={["none", "initial", "initial", "initial"]}
        width={"100%"}
        position={"fixed"}
        top={["40px", "0"]}
        p={"10px 0"}
        bgcolor={"white"}
      >
        <LogoTitle detail={true} />
      </Box>
      <Box
        position={"absolute"}
        right={["20px", "40px"]}
        top={["-30px", "10px", "10px", "25px"]}
        display={"flex"}
        gap={"10px"}
        alignItems={"center"}
      >
      <Notifications />
        <MemberLoginModal />
      </Box>
      <Box
      height={"100%"}
        display={["block", "block", "flex", "flex"]}
        m={"5% 0"}
        justifyContent={"space-evenly"}
        bgcolor={"rgb(235,235,235)"}
      >
        <Box
        height={"100%"}
          p={"20px"}
          maxWidth={["100%", "100%", "60%", "85%"]}
          margin={"5% 0"}
          bgcolor={"rgb(235,235,235)"}
        >
          <Box height={"100%"} display={["block","block","flex","flex"]}  justifyContent={"space-between"} gap={"10px"} >
          <Box>
                <img
                  src={"./radhaVeniJi.png"}
                  width={"100%"}
                  alt="Sri Sri Radha Veni Ji"
                />
              </Box>
            <Box>
            <Typography variant="h3" fontWeight={900}>
            CMS: ISKCON-Prayagraj
          </Typography>
          <br />
              <Typography variant="h4" fontWeight={900}>
                Hare Krishna!
              </Typography>
              <br />
              <Typography variant="h6" fontWeight={700} color={"grey"}>
                Welcome To Sri Sri Radha Venimadhava Ji Temple
              </Typography>
              <hr />
              <br />
              <Typography>
              ISKCON Prayagraj is an authorized Vaishnava temple and is the heart
          of spiritual advancement as well as the centre of vedic culture. Sri Sri Radha Venimadhava Ji Temple is dedicated for worship of the
            Lord by vedic Panchratrik process. We are a branch of the
             International Society for Krishna Consciousness (ISKCON), a
            worldwide spiritual movement founded by His Divine Grace A.C.
             Bhaktivedanta Swami Prabhupada, in New York City in 1966.
              </Typography>

            </Box>
              
          </Box>
          <br />
          <br />
          <br />
          <OurActivities />
        </Box>
        {/* <LandingPageForm /> */}
      </Box>
    </Box>
  );
}
