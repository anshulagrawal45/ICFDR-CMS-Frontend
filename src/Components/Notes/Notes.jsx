import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import NotesCard from "./NotesCard/NotesCard";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import NewCardDesign from "../UIComponents/CardDesign/NewCardDesign";

export default function Notes(){
    let {notesData, setNotesData,userID, apiLink,axios} = useContext(Context)
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  console.log(notesData);
  useEffect(() => {
    if(!userID) {
      navigate("/client/login")
      return
    }
    (async () => {
      setIsLoading(true);
      let {data} = await axios.get(
        `${apiLink}notes/query?userID=${userID}`
      );
      console.log(data)
      setNotesData(data?.sort((a, b) => (a?.favorite === b?.favorite) ? 0 : a?.favorite ? -1 : 1));
      setIsLoading(false);
      // setNotesData(notesData.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1))
    })();
  }, []);
  console.log(notesData)
  
  return !userID?<LoginRequiredPage />: <Box m={"10px 10px"}>
  
    <Box zIndex={1000} textAlign={"right"} margin={"auto"}  mt={"10px"} width={["100%","90%"]}>
        {/* <NotesCreation /> */}
        {/* <Button variant="contained" onClick={createNote}>Create Note</Button> */}
        <br />
        <Box m={"auto"} width={"100%"}>
          {isLoading ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">Loading, Please Wait!</Typography>
            </Box>
          ) : notesData?.length==0?<Box textAlign={"center"}>
              <Typography variant="h4">No Notes Made!</Typography>
            </Box>:(
              <Box
            // className={s.productsGrid}
            minHeight={["auto","auto"]}
            width={["100%"]}
            margin={"auto"}
            sx={{placeItems:'center'}}
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
            {notesData?.map((el, i) => {
              return (
                // <NotesCard key={i} data={el} />
                <NewCardDesign key={i} data={el} />
              );
            })} </Box>
          )}
        </Box>
      </Box>
    </Box>
}