import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { getMonthName } from "../Features/DateAndTime";
import styles from "./Donations.module.css";
import DonationsTable, { DonationsTableByMonth } from "./DonationsTable";
export default function NonMembers() {
    let [membersData, setMembersData] = useState([]);
    let {
        apiLink,
        axios,
        assignedCenter,
        userID,
        configurationSettings,
        centers,
        isAdmin,
        userPermissions,
        universalLoading,
        ActivateToast,
    } = useContext(Context);
    let [allDonations, setAllDonations] = useState([]);
    let [monthlyData, setMonthlyData] = useState([]);
    let [donorType, setDonorType] = useState("");
    let [selectedCenter, setSelectedCenter] = useState(assignedCenter);
    let centerOptions = configurationSettings?.centers;
    let [fetchCenter, setFetchCenter] = useState(centers);
    let [monthAndYear, setMonthAndYear] = useState({ month: "", year: "" });
    const [isLoading, setIsLoading] = useState(true);
    let [selectedId, setSelectedId] = useState("");
    let [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    let [filteredMembers, setFilteredMembers] = useState([]);
    let [selectedDonorType, setSelectedDonorType] = useState("");
    let [limit, setLimit] = useState(10);
    let [count, setCount] = useState(10);
    let [page, setPage] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const isDonorMember = !!selectedId;
        let temp = {
            date: data.get("date"),
            name: data.get("name"),
            address: data.get("address"),
            paymentMode: data.get("paymentMode"),
            transactionNumber: data.get("transactionNumber"),
            donation: data.get("donation"),
            purpose: data.get("purpose"),
            tempReceiptNumber: data.get("tempReceiptNumber"),
            permReceiptNumber: data.get("permReceiptNumber"),
            bankName: data.get("bankName"),
            donorType: donorType || "Occasional",
            center: selectedCenter || assignedCenter,
            year: monthAndYear.year,
            month: monthAndYear.month,
            memberID: isDonorMember ? selectedId : null,
            isMember: isDonorMember,
            userID,
        };

        let temp2 = {
            name: data.get("name"),
            data: {
                [monthAndYear.year]: {
                    [monthAndYear.month]: data.get("donation"),
                },
            },
        };
        // Find the index of the member's existing data in the monthlyData array
        const existingMemberIndex = monthlyData.findIndex(
            (el) => el._id === selectedId
        );

        if (existingMemberIndex !== -1) {
            // Member's data already exists, update the donation for the specified month
            const updatedMemberData = { ...monthlyData[existingMemberIndex] };
            if (updatedMemberData.data[monthAndYear.year]) {
                if (updatedMemberData.data[monthAndYear.year][monthAndYear.month]) {
                    updatedMemberData.data[monthAndYear.year][monthAndYear.month] =
                        +updatedMemberData.data[monthAndYear.year][monthAndYear.month] +
                        +temp.donation;
                } else {
                    updatedMemberData.data[monthAndYear.year][monthAndYear.month] =
                        temp.donation;
                }
            } else {
                updatedMemberData.data[monthAndYear.year] = {};
                if (updatedMemberData.data[monthAndYear.year][monthAndYear.month]) {
                    updatedMemberData.data[monthAndYear.year][monthAndYear.month] +=
                        +updatedMemberData.data[monthAndYear.year][monthAndYear.month] +
                        +temp.donation;
                } else {
                    updatedMemberData.data[monthAndYear.year][monthAndYear.month] =
                        temp.donation;
                }
            }

            const updatedMonthlyData = [...monthlyData];
            updatedMonthlyData[existingMemberIndex] = updatedMemberData;
            setMonthlyData(updatedMonthlyData);

            axios.patch(`${apiLink}monthlyData/${selectedId}`, updatedMemberData);
        } else {
            // Member's data doesn't exist, add a new entry to the monthlyData array
            setMonthlyData((prev) => [...prev, temp2]);
            axios.post(`${apiLink}monthlyData`, temp2);
        }

        // setAllDonations((prev) => [...prev, temp]);
        setAllDonations((prev) => [...prev, temp]);
        axios
            .post(`${apiLink}allDonations`, temp)
            .then((res) => {
                console.log(res);
                ActivateToast("Donation Added in Records", "success");
            })
            .catch((err) => {
                console.log(err);
                ActivateToast("Something Went Wrong", "error");
            });
    }
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            let { data } = await axios.post(
                `${apiLink}member/getDataByCenters?donorType=${selectedDonorType}`,
                {
                    centers: fetchCenter,
                }
            );
            let temp = data.map((el, i) => ({
                name: el.details.name,
                address: el.details.residenceAddress,
                // id: el._id,
                donorType: el.details.donorType || "Occasional",
                lpNumber: el.details.lpNumber || "None",
                center: el.center,
            }));

            setMembersData(temp);
            setIsLoading(true);
            setIsLoading(false);
        })();
        (async () => {
            setIsLoading(true);
            let { data } = await axios.get(
                `${apiLink}monthlyData?page=${page}&limit=${limit}`
            );
            setMonthlyData(data.data);
            setIsLoading(false);
        })();
        (async () => {
            setIsLoading(true);
            let { data } = await axios.get(
                `${apiLink}allDonations?page=${page}&limit=${limit}`
            );
            setAllDonations(data.data);
            setCount(data.count);
            setIsLoading(false);
        })();

        // }
    }, [
        apiLink,
        centers,
        fetchCenter,
        isAdmin,
        userID,
        selectedDonorType,
        page,
        limit,
        axios,
    ]);

    useEffect(() => {
        (async () => {
            console.log(selectedCenter)
            setIsLoading(true);
            let { data } = await axios.get(
                `${apiLink}configuration/647589da7d9cb06b225e4638`
            );
            console.log(data)
            console.log(data.donorTypeForm[selectedCenter || assignedCenter])
            setFilteredMembers(data.donorTypeForm[selectedCenter || assignedCenter]);
            setIsLoading(false);
        })();
    }, [universalLoading, selectedCenter, axios, apiLink, assignedCenter]);
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = 2020; year <= currentYear; year++) {
        years.push(year.toString());
    }
    return (
        <>
            <Box
                display={"flex"}
                flexDirection={["column", "column", "row-reverse", "row-reverse"]}
                justifyContent={"space-evenly"}
            >
                <Box>
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
                    <Box className={styles.form}>
                        <Typography
                            variant="subtitle2"
                            width={"fit-content"}
                            p={"0 10px"}
                            sx={{ border: "1px dashed red", fontSize: "11px", fontWeight: 700 }}
                            className={styles.blueTextColor}
                        >
                            Select a Center and Donor Type to Fetch Specific Members
                        </Typography>
                        <label className={styles.label}>
                            <select
                                defaultValue={"None"}
                                name="assignedCenter"
                                className={styles.input}
                                // value={newEmployeeData.assignedCenter}

                                onChange={(e) => {
                                    setSelectedCenter(e.target.value) // donor types were not fetching because we weren't not setting 193 was not working because of this line missing
                                    if (isAdmin && e.target.value === "All") {
                                        setFetchCenter(centerOptions);
                                    } else if (!isAdmin && e.target.value === "All") {
                                        setFetchCenter(centers);
                                    } else {
                                        setFetchCenter([e.target.value]);
                                    }
                                }}
                                required
                            >
                                <option value={"None"} disabled>
                                    None
                                </option>
                                {<option value={"All"}>ALL</option>}
                                {centerOptions?.map((center, i) => {
                                    if (isAdmin) {
                                        return (
                                            <option key={i} value={center}>
                                                {center.toUpperCase()}
                                            </option>
                                        );
                                    } else if (userPermissions[center]?.create) {
                                        return (
                                            <option key={i} value={center}>
                                                {center.toUpperCase()}
                                            </option>
                                        );
                                    }
                                })}
                            </select>
                            <span className={styles.span}>Choose a Centre</span>
                        </label>
                        <label className={styles.label}>
                            <select
                                defaultValue={"All"}
                                // value={selectedDonorType}
                                onChange={(e) => {
                                    setSelectedDonorType(e.target.value);
                                }}
                                className={styles.input}
                                required
                            >
                                {/* <option value={"All"}>All</option> */}
                                {(filteredMembers || []).map((item, i) => {
                                    return (
                                        <option key={item + i} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                            <span className={styles.span}>Donor Type</span>
                        </label>
                    </Box>
                </Box>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className={styles.title}>Donations
                        <Link to="/client/NonMembers" > NMbs</Link>
                        {' / '}
                        <Link to="/client/donations" > Mbs</Link>
                    </p>
                    <div className={styles.flex}>
                        <label className={styles.label}>
                            <input
                                required=""
                                placeholder=""
                                defaultValue={new Date().toISOString().slice(0, 10)}
                                name={"date"}
                                type="date"
                                className={styles.input}
                            />
                            <span className={styles.span}>Date</span>
                        </label>
                        <label className={styles.label}>
                            <input
                                required=""
                                placeholder="Month and Year"
                                name={"month"}
                                type="month"
                                className={styles.input}
                                onChange={(e) => {
                                    let temp = e.target.value.split("-");
                                    setMonthAndYear((prev) => ({
                                        ...prev,
                                        month: getMonthName(temp[1]),
                                        year: temp[0],
                                    }));
                                }}
                            />
                            <span className={styles.span}>Month and Year</span>
                        </label>
                    </div>
                    <label className={styles.label}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter the Name"
                            className={styles.input}
                            required=""
                        />
                        <span className={styles.span}>Name</span>
                    </label>
                    <label className={styles.label}>
                        <input
                            required=""
                            placeholder="Address"
                            name={"address"}
                            type="text"
                            className={styles.input}
                        />
                        <span className={styles.span}>Address</span>
                    </label>
                    <div className={styles.flex}>
                        <label className={styles.label}>
                            <input
                                required=""
                                placeholder="LP Number"
                                name={"lpNumber"}
                                type="text"
                                className={styles.input}
                            />
                            <span className={styles.span}>LP Number</span>
                        </label>
                        <label className={styles.label}>
                            <select
                                className={styles.input}
                                required
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="paymentMode"
                                label="Payment Mode"
                                defaultValue={"Online"}
                            >
                                <option value={"Online"}>Online</option>
                                <option value={"Cash"}>Cash</option>
                                <option value={"Cheque"}>Cheque</option>
                                <option value={"credit/debit"}>Credit/Debit</option>
                                <option value={"Other"}>Other</option>
                            </select>
                            <span className={styles.span}>Payment Mode</span>
                        </label>
                    </div>
                    <label className={styles.label}>
                        <input
                            placeholder="Bank Name"
                            name={"bankName"}
                            type="text"
                            className={styles.input}
                        />
                        <span className={styles.span}>Bank Name</span>
                    </label>
                    <label className={styles.label}>
                        <input
                            placeholder="Donation Amount"
                            name={"donation"}
                            type="number"
                            className={styles.input}
                        />
                        <span className={styles.span}>Donation Amount</span>
                    </label>
                    <label className={styles.label}>
                        <input
                            placeholder="Donation Purpose"
                            name={"purpose"}
                            type="text"
                            className={styles.input}
                        />
                        <span className={styles.span}>Donation Purpose</span>
                    </label>
                    <label className={styles.label}>
                        <input
                            placeholder="Transaction Number/ Cheque Number"
                            name={"transactionNumber"}
                            type="text"
                            className={styles.input}
                        />
                        <span className={styles.span}>
                            Transaction Number/ Cheque Number
                        </span>
                    </label>
                    <label className={styles.label}>
                        <input
                            placeholder="Temporary Receipt Number"
                            name={"tempReceiptNumber"}
                            type="number"
                            className={styles.input}
                        />
                        <span className={styles.span}>Temporary Receipt Number</span>
                    </label>
                    <label className={styles.label}>
                        <input
                            placeholder="Permanent Receipt Number"
                            name={"permReceiptNumber"}
                            type="number"
                            className={styles.input}
                        />
                        <span className={styles.span}>Temporary Receipt Number</span>
                    </label>

                    <button type="submit" className={styles.submit}>
                        Submit
                    </button>
                </form>
            </Box>
            <br />
            <br />
            <br />
            {isLoading === false && (
                <>
                    <DonationsTable donationsData={allDonations} />
                    <br />
                    <FormControl>
                        <InputLabel>Year</InputLabel>
                        <Select
                            label="Year"
                            // value={newEmployeeData.assignedCenter}
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                            }}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DonationsTableByMonth
                        donationsData={monthlyData}
                        selectedYear={selectedYear}
                    />
                </>
            )}
        </>
    );
}
