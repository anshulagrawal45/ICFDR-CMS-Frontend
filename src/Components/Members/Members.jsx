import { TableChart, ViewModule } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import LoginRequiredPage from "../CommonStaticPages/LoginRequiredPage";
import NewMemberCards from "./MembersCards/MemberCards";
import MemberCreation from "./MembersCreationModal/MemberCreationModal";
import MembersTable from "./MembersTable/MembersTable";

export default function Members() {
  let {
    centers,
    axios,
    userPermissions,
    membersData,
    setMembersData,
    userID,
    apiLink,
    theme,
    isAdmin,
    role,
    universalLoading,
    hide,
    setHide, setConfigurationSettings
  } = useContext(Context);
  const [filteredMembersData, setFilteredMembersData] = useState([]);
  const [view, setView] = useState("table");
  const [isLoading, setIsLoading] = useState(true);
  let [limit, setLimit] = useState(100);
  let [count, setCount] = useState(10);
  let [page, setPage] = useState(1);

  const handleHideChange = (event) => {
    let value = event.target.checked;
    setHide(value);
    axios.patch(apiLink + "users/" + userID, {
      isDataHidden: value,
    });
    const tempData = membersData.filter((i) => i.userID === userID);
    for (let i of tempData) {
      axios.patch(apiLink + "member/" + i._id, {
        hidden: value,
      });
    }
  };

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  useEffect(() => {
    setFilteredMembersData(membersData);
  }, [membersData]);

  useEffect(() => {
    setIsLoading(true)
    if (isAdmin) {
      (async () => {
        //after limits
        let { data } = await axios.get(`${apiLink}member`);

        let temp = data.data
        console.log("admin hai bhaiya", temp)
        setMembersData(temp);
        setFilteredMembersData(temp);
        setCount(data.count)

        setIsLoading(false);
      })();
    } else {
      (async () => {
        setIsLoading(true)
        let { data } = await axios.post(`${apiLink}member/getDataByCenters`, {
          centers,
        });
        data = data.filter((i) => {
          if (userID === i.userID) return true;
          if (userID !== i.userID && !!i.hidden === true) return false;
          else return true;
        });
        console.log(data)
        setMembersData(data);

        setFilteredMembersData(data);
        setIsLoading(false);
      })();
    }

    // let { data, isLoading, isError } = useFetch(fetchLink, setMembersData)
  }, [apiLink, centers, isAdmin, limit, page, setMembersData, universalLoading, userID]);

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("sortField", sortField);
    queryParams.set("sortDirection", sortDirection);
    queryParams.set("filterValue", filterValue);
    // history.push(`?${queryParams.toString()}`);
  };

  function filterByKeyWord({ target }) {
    if (target.value == "") return setFilteredMembersData([...membersData]);
    let temp = [...membersData].filter((i) => {
      let obj = [
        i.phone,
        i.email,
        i.dob,
        i.details.donorType,
        i.details.lpNumber,
        i.details.name,
        i.details.initiated,
        i.details.initiationName,
        i.details.spiritualMasterName,
        i.details.initiationDate,
        i.details.initiationPlace,
        i.details.residenceAddress,
        i.details.whatsappNumber,
        i.details.panNumber,
        i.details.aadharNumber,
        i.details.officeAddress,
        i.details.introducedBy,
        i.details.gender,
        i.details.spouseName,
        i.details.occupation,
        i.details.currentWork,
        i.details.place,
        i.details.duration,
      ];
      for (let item of i.details.children) {
        for (let el in item) {
          obj.push(item[el]);
        }
      }
      for (let item of i.details.qualification) {
        for (let el in item) {
          obj.push(item[el]);
        }
      }
      for (let item of i.details.workExperience) {
        for (let el in item) {
          obj.push(item[el]);
        }
      }
      for (let i of obj) {
        if (!i) continue;
        if (i.includes(target.value)) {
          console.log(i, i.includes(target.value || ""));
          return true;
        }
      }
      return false;
    });
    setFilteredMembersData(temp);
  }

  useEffect(() => {
    console.log(membersData)
  }, [membersData])
  // useEffect(() => {
  //   console.log("universal",universalLoading)
  // }, [universalLoading])

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
          {view == "table" ? null : (
            <Box m={"10px"} display={["block", "flex"]}>
              <Box
                display={"flex"}
                gap={["10px", "10px"]}
                textAlign={"right"}
                width={["80%", "85%", "70%"]}
              >
                <br />

                {/* Filtering */}
                <Typography variant="subtitle2">Filter:</Typography>
                <TextField
                  onChange={filterByKeyWord}
                  placeholder="Search by Keyword"
                  sx={{
                    width: "100%",
                    minWidth: "100px",
                    background:
                      theme === "dark" ? "rgb(145, 145, 145)" : "white",
                  }}
                />
                <br />

                <Button
                  sx={{
                    minHeight: "fit-content",
                    minWidth: ["100px", "fit-content"],
                  }}
                  variant="contained"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </Box>
            </Box>
          )}
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
                <MenuItem value="1">1</MenuItem>
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
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

            {(userPermissions?.hidden || isAdmin) && <FormControlLabel
              control={
                <Switch
                  name="Hide"
                  checked={hide}
                  onChange={handleHideChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={hide ? "Unhide" : "Hide"}
            />}
            {!isLoading && (role === "Leader" || role === "Admin" || isAdmin) && (
              <MemberCreation />
            )}
          </Box>
        </Box>
        <br />
        <Box m={"auto"} width={"100%"}>
          {(universalLoading || isLoading) ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">Loading, Please Wait!</Typography>
            </Box>
          ) : membersData.length < 1 ? (
            <Box textAlign={"center"}>
              <Typography variant="h4">No Members Made!</Typography>
            </Box>
          ) : (
            <Box>
              {view === "table" ? (
                <MembersTable membersData={membersData} />
              ) : (
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
                  {filteredMembersData.map((el, i) => {
                    return <NewMemberCards key={el._id} member={el} />
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
