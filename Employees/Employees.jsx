import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import EmployeeCreation from "./EmployeeCreation/EmployeeCreationModal";
import { TableChart, ViewModule } from "@mui/icons-material";
import EmployeesTable from "./EmployeesTable/EmployeesTable";
import EmployeeCards from "./EmployeeCards/EmployeeCards";

export default function Employees() {
  let {
    employeesData,
    axios,
    setEmployeesData,
    userID,
    apiLink,
    isAdmin,
    centers,
    universalLoading,
    userPermissions
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  let [limit, setLimit] = useState(100);
  let [count, setCount] = useState(10);
  let [page, setPage] = useState(1);
  useEffect(() => {
    if (universalLoading) {
      return;
    }
    if (isAdmin) {
      (async () => {
        // let  {data}  = await axios.get(`${apiLink}users`)
        let { data } = await axios.get(
          `${apiLink}users?page=${page}&limit=${limit}`
        );
        console.log(data)
        const filteredData = data.data.filter((obj) => obj._id !== userID);
        // const filteredData = data.data.filter(obj => obj._id !== userID && !obj.isAdmin);
        // const filteredData = data.filter(obj => obj._id !== userID && !obj.isAdmin);
        setEmployeesData(filteredData);
        setCount(data.count);
        setIsLoading(false);
      })();
    } else {
      (async () => {
        let { data } = await axios.post(`${apiLink}users/getDataByCenters`, {
          centers,
          userID,
        });
        const filteredData = data.filter(
          (obj) => obj._id !== userID && !obj.isAdmin
        );
        setEmployeesData(filteredData);
        // setFilteredMembersData(data)
        setIsLoading(false);
      })();
    }
  }, [
    apiLink,
    centers,
    isAdmin,
    limit,
    page,
    setEmployeesData,
    universalLoading,
    userID,
  ]);

  const [view, setView] = useState("table");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  async function test() {
    let temp = {
      Admin: {
        create: true,
        update: true,
        delete: true,
      },
      Varanasi: {
        create: true,
        update: true,
        delete: true,
      },
      Center: {
        create: true,
        update: true,
        delete: true,
      },
      Leader: {
        create: true,
        update: true,
        delete: true,
      },
      Configuration: {
        create: true,
        update: true,
        delete: true,
      },
    };
    axios.patch(`${apiLink}users/647589da7d9cb06b225e4638`, {
      permissions: temp,
    });
  }
  // const totalPages = Math.ceil(count / limit);
  // console.log(count,limit)
  // test()
  return !userID ? (
    <LoginRequiredPage />
  ) : (
    <Box m={"10px 10px"}>
      <Box textAlign={"right"} m={"auto"} mt={"10px"} width={["100%", "90%"]}>
        <Box 
        display={"flex"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
            <ToggleButton value="table" aria-label="table">
              <TableChart />
            </ToggleButton>
            <ToggleButton value="cards" aria-label="cards">
              <ViewModule />
            </ToggleButton>
          </ToggleButtonGroup>
          <Box display={"flex"} gap={"5px"} alignItems={"center"}>
            <FormControl sx={{ width: "100px" }} margin="normal">
              <InputLabel>Limit</InputLabel>
              <Select
                name="limit"
                label="role"
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              >
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              onChange={(e, v) => {
                setPage(v);
              }}
              count={Math.ceil(count / limit)}
              variant="outlined"
            />
          </Box>
          <EmployeeCreation />
        </Box>
        <br />
        <Box m={"auto"} width={"100%"}>
          {isLoading ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">Loading, Please Wait!</Typography>
            </Box>
          ) : employeesData.length < 1 ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">No Employees Made!</Typography>
            </Box>
          ) : (
            <Box>
              {view === "table" ? (
                <EmployeesTable employeesData={employeesData} />
              ) : (
                <Box
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
                  {employeesData.map((el, i) => {
                    return <EmployeeCards key={i} employee={el} />
                    {/* return <EmployeeCardModal key={i} employee={el} />; */}
                  })}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
