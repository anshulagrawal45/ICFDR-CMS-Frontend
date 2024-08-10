import { TableChart, ViewModule } from "@mui/icons-material";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import MeetingsCreationModal from "./MeetingCreation/MeetingCreationModal";
import MeetingsCard from "./MeetingsCards/MeetingsCard";
import MeetingsTable from "./MeetingsTable/MeetingsTable";

export default function Meetings() {
  let { meetingsData, setMeetingsData, userID, apiLink, axios } = useContext(Context)
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userID) {
      navigate("/client/login")
    }
    (async () => {
      setIsLoading(true);
      let { data } = await axios.get(
        `${apiLink}meetings?userID=${userID}`
      );
      setMeetingsData(data.data);
      console.log(data.data)
      // setmeetingsData(data.data.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1));
      setIsLoading(false);
      // setmeetingsData(meetingsData.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1))
    })();
  }, [apiLink, navigate, setMeetingsData, userID]);

  const [view, setView] = useState('table');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return !userID ? <LoginRequiredPage /> : <Box m={"10px 10px"}>
    <Box textAlign={"right"} m={"auto"} mt={"10px"} width={["100%", "90%"]}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="table" aria-label="table">
            <TableChart />
          </ToggleButton>
          <ToggleButton value="cards" aria-label="cards">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
        <MeetingsCreationModal />
      </Box>
      <br />
      <Box m={"auto"} width={"100%"}>
        {isLoading ? (
          <Box textAlign={"center"}>
            <Typography variant="h4">Loading, Please Wait!</Typography>
          </Box>
        ) : meetingsData.length < 1 ? <Box textAlign={"center"}>
          <Typography variant="h4">No Meetings Scheduled!</Typography>
        </Box> : (
          <Box>
            {view === "table" ? <MeetingsTable meetingsData={meetingsData} /> : <Box
              // className={s.productsGrid}
              minHeight={["fit-content", "auto"]}
              width={["100%"]}
              margin={"auto"}
              display={["grid", "grid", "grid", "grid"]}
              gridTemplateColumns={[
                "repeat(1,1fr)",
                "repeat(2,1fr)",
                "repeat(3,1fr)",
                "repeat(4,1fr)",
              ]}
              m={"auto"}
              gap={"20px"}
            >
              {meetingsData.map((el, i) => {
                return (
                  <div>
                    <MeetingsCard  key={i} data={el} />
                  </div>
                );
              })}
            </Box>}
          </Box>

        )}
      </Box>
    </Box>
  </Box>
}