import { TableChart, ViewModule } from "@mui/icons-material";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import ContactsCard from "./ContactsCard/ContactsCard";
import ContactCreationModal from "./ContactsCreation/ContactsCreationModal";
import ContactsTable from "./ContactsTable/ContactsTable";

export default function Contacts() {
  let { isAdmin, contactsData, setContactsData, userID, apiLink, axios } = useContext(Context)
  let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userID) {
      navigate("/client/login")
      return
    }
    (async () => {
      setIsLoading(true);
      let { data } = isAdmin ? await axios.get(
        `${apiLink}contacts`
      ) : await axios.get(
        `${apiLink}contacts?userID=${userID}`
      );
      setContactsData(data.data);
      // setContactsData(data.data.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1));
      setIsLoading(false);
      // setContactsData(notesData.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1))
    })();
  }, [isAdmin, userID]);

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
        <ContactCreationModal />
      </Box>
      <br />
      <Box m={"auto"} width={"100%"}>
        {isLoading ? (
          <Box textAlign={"center"}>
            <Typography variant="h4">Loading, Please Wait!</Typography>
          </Box>
        ) : contactsData.length < 1 ? <Box textAlign={"center"}>
          <Typography variant="h4">No Contacts Made!</Typography>
        </Box> : (
          <Box>
            {view === "table" ? <ContactsTable contactsData={contactsData} /> : <Box
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
              {contactsData.map((el, i) => {
                return (
                  <div>
                    <ContactsCard state={contactsData} setState={setContactsData} key={i} data={el} />
                  </div>
                );
              })}
            </Box>}
          </Box>

        )}
      </Box>
    </Box>
  </Box>
  // return  <Box m={"10px 10px"}>
  //   <Box textAlign={"right"} mt={"10px"} width={["100%","90%"]} m={"auto"}>
  //   {/* her for the top button model */}
  //   <ContactCreationModal />
  //       <br />
  //       <Box m={"auto"} width={"100%"}>
  //         {isLoading ? (
  //           <Box textAlign={"center"}>
  //             <Typography variant="h4">Loading, Please Wait!</Typography>
  //           </Box>
  //         ) : contactsData.length<1?<Box textAlign={"center"}>
  //             <Typography variant="h4">No Contacts to Show</Typography>
  //           </Box>: (
  //             <Box
  //           // className={s.productsGrid}
  //           minHeight={["auto","auto"]}
  //           width={["100%"]}
  //           display={["grid", "grid", "grid", "grid"]}
  //           gridTemplateColumns={[
  //             "repeat(1,1fr)",
  //             "repeat(2,1fr)",
  //             "repeat(3,1fr)",
  //             "repeat(4,1fr)",
  //           ]}
  //           m={"auto"}
  //           gap={"20px"}
  //         >

  //           {contactsData.map((el, i) => {
  //             return (
  //               <ContactsCards state={contactsData} setState={setContactsData} key={i} data={el} />
  //             );
  //           })} 
  //           </Box>
  //         )}
  //       </Box>
  //     </Box>
  //   </Box>
}