import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import AccountCreationModal from "./AccountCreation/AccountCreationModal";
import AccountsCards from "./AccountCards/AccountCards";

export default function Accounts(){
    let {accountsData, setAccountsData,userID,axios, apiLink} = useContext(Context)
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!userID) return
    (async () => {
      setIsLoading(true);
      let data = await axios.get(
        `${apiLink}accounts?userID=${userID}`
      );
      setAccountsData(data.data);
      // setAccountsData(data.data.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1));
      setIsLoading(false);
      // setAccountsData(notesData.sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1))
    })();
  }, []);
  
  return !userID?<LoginRequiredPage />: <Box m={"10px 10px"}>
    <Box textAlign={"right"} mt={"10px"} width={["100%","90%"]} m={"auto"}>
    {/* her for the top button model */}
    <AccountCreationModal />
        <br />
        <Box m={"auto"} width={"100%"}>
          {isLoading ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">Loading, Please Wait!</Typography>
            </Box>
          ) : accountsData.length<1?<Box textAlign={"center"}>
              <Typography variant="h4">No Accounts to Show</Typography>
            </Box>: (
              <Box
            // className={s.productsGrid}
            minHeight={["auto","auto"]}
            width={["100%"]}
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
          
            {accountsData.map((el, i) => {
              return (
                <AccountsCards state={accountsData} setState={setAccountsData} set key={i} data={el} />
              );
            })} 
            </Box>
          )}
        </Box>
      </Box>
    </Box>
}