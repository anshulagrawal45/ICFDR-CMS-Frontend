import { useContext, useEffect, useState } from "react"
import { Context } from "../../../Context"
import NotAuthorizedPage from "../../Features/StaticPages/NotAuthorised"
import LoginRequiredPage from "../../CommonStaticPages/LoginRequiredPage"
import { Box, Typography } from "@mui/material"
import NewPermissionCard from "./NewPermissionCard"

export default function ManagePermissions() {
  let { isAdmin, employeesData,axios, setEmployeesData, userID, apiLink, role, centers, userPermissions } = useContext(Context)
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ((async () => {
      if(isAdmin) {
        let { data } = await axios.get(`${apiLink}users`, {
          centers,
          userID
        })
        const filteredData = data.data.filter(obj => obj._id !== userID && !obj.isAdmin);
        setEmployeesData(filteredData)
        setIsLoading(false)
      }
      else {
        let { data } = await axios.post(`${apiLink}users/getDataByCenters`, {
          centers,
          userID
        })
        const filteredData = data.filter(obj => obj._id !== userID && !obj.isAdmin);
        setEmployeesData(filteredData)
        setIsLoading(false)
      }
      // console.log(data)
    })())
  }, [apiLink, centers, isAdmin, setEmployeesData, userID])
  return !userID ? <LoginRequiredPage /> : isAdmin || role === "Admin" || userPermissions.Configuration.create ? <Box m={"10px 10px"}>
    <Box textAlign={"right"} m={"auto"} mt={"10px"} width={["100%", "90%"]}>
      <Box m={"auto"} width={"100%"}>
        {isLoading ? (
          <Box textAlign={"center"}>
            <Typography variant="h4">Loading, Please Wait!</Typography>
          </Box>
        ) : employeesData.length < 1 ? <Box textAlign={"center"}>
          <Typography variant="h4">No Employees Made!</Typography>
        </Box> : (
          <Box
            // className={s.productsGrid}
            minHeight={["auto", "auto"]}
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
            {employeesData.map((el, i) => {
              return <NewPermissionCard key={i} employee={el} />
              {/* return <PermissionsCard key={i} employee={el} /> */}
            })}
          </Box>
        )}
      </Box>
    </Box>
  </Box> : <NotAuthorizedPage message={"You're Not Authorised to access this Page"} advice={"Contact your superior to allow you to access this page!"} />
}