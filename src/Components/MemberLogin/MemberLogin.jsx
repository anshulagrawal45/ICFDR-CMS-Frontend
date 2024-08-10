import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context';
import styles from './MemberLogin.module.css';



function MemberLogin2({ extraFunction }) {

    const [phone, setPhone] = React.useState("")
    const [dob, setDob] = React.useState("")
    const navigate = useNavigate()
    const { apiLink, setToken, ActivateToast, axios, memberLoginData, setMemberLoginData, setUserID, setRole } = React.useContext(Context)
    async function handleLogin() {
        let temp = {
            phone, dob
        }
        const { data } = await axios.post(apiLink + "memberLogin", temp);
        console.log(data)
        if(data.token){
            setMemberLoginData(data)
        setUserID(data._id)
        setRole("Member")
        localStorage.setItem(`token`, JSON.stringify(data.token))
        Cookies.set(`token`, JSON.stringify(data.token))
        Cookies.set(`MemberID`, JSON.stringify(data._id))
        setToken(data.token)
        Cookies.set(`UserID`, JSON.stringify(data._id))
        ActivateToast("Member Logged In Successfully", "success")
        navigate("/")
        if (extraFunction) {
            extraFunction()
        }
        }else{
            ActivateToast("Check Your Credentials Again!","error")
        }
    }
    console.log(memberLoginData);
    // if (memberLoginData._id) return <Navigate to={"/client/dashboard"} />
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.heading}>Member Sign In</div>
                <Box sx={{ mt: 1 }}>
                    <div className={styles.form} >
                        <input
                            placeholder="Phone"
                            id="phone"
                            name="phone"
                            type="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.input}
                            required=""
                        />
                        <input
                            placeholder="Date"
                            id="date"
                            name="date"
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            className={styles.input}
                            required=""
                        />

                        <button onClick={handleLogin} className={styles["login-button"]} >Sign In</button>
                    </div>
                </Box>
            </div>
        </div>

    );
}

export default MemberLogin2;