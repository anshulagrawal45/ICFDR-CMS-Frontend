import React, { useContext, useState } from "react";
import { Context } from "../../../Context";
import styles from "../../Features/Styles/CustomInputs.module.css";
import StyledButton from "../../UIComponents/Button/StyledButton";
import ViewMemberComplaint from "../MembersComplaint/ViewMemberComplaint";

function ComplaintForm() {
  const { memberLoginData, apiLink, axios, ActivateToast } = useContext(Context);
  console.log(memberLoginData)
  let [data, setData] = useState({
    name: memberLoginData?.details?.name,
    memberID: memberLoginData?._id,
    phone: memberLoginData?.phone,
    email: memberLoginData?.email,
    address: memberLoginData?.details?.residenceAddress,
    center: memberLoginData?.center,
    subject: "",
    description: "",
    createdBy: memberLoginData?.createdBy,
    userID: memberLoginData?.userID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    axios
      .post(`${apiLink}complaint`, data)
      .then((res) => {
        console.log(res);
        ActivateToast("Complaint Added in Records", "success");
      })
      .catch((err) => {
        console.log(err);
        ActivateToast("Something Went Wrong", "error");
      });
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>Complaint Form</h1>
        <div className={styles.form}>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={data?.name}
              placeholder="Name"
              disabled
            />
            <span className={styles.span}>Name</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="memberID"
              value={data?.memberID}
              placeholder="MemberId"
              disabled
            />
            <span className={styles.span}>Member Id</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="phone"
              value={data?.phone}
              placeholder="Phone Number"
              disabled
            />
            <span className={styles.span}>Phone Number</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={data?.email}
              placeholder="Email"
              disabled
            />
            <span className={styles.span}>Email</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="address"
              value={data?.address}
              placeholder="Address"
            />
            <span className={styles.span}>Address</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="subject"
              value={data?.subject}
              placeholder="Subject"
              onChange={handleChange}
            />
            <span className={styles.span}>Subject</span>
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              name="description"
              value={data?.description}
              placeholder="Description"
              onChange={handleChange}
            />
            <span className={styles.span}>Description</span>
          </label>
          <div>
            <StyledButton text={"Submit"} tooltip={"Raise a Complaint"} extraFunction={handleSubmit} />
          </div>
        </div>
      </div>
      <div>
        <ViewMemberComplaint />
      </div>
    </>
  );
}

export default ComplaintForm;
