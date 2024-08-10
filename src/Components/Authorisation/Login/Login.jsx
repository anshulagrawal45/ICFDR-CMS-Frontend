import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../../Context';
import { LocalDate, LocalTime } from '../../Features/DateAndTime';
import ForgotPasswordPage from '../../Features/ForgotPassword';
import styles from './Login.module.css';

function Login() {
    let navigate = useNavigate()
    const [user, setUser] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
    let signInRef = React.useRef(null)

    const { userName, setCenters, setToken, setUserWhatsApp, axios, setUserCreator, setUserEmailId, setAssignedCenter, PostToLogs, setOwnerID, passwordChanged, setPasswordChanged, setUserName, ActivateToast, setUserID, userID, setUserPermissions, apiLink, setRole, setIsAdmin, setConfigurationSettings } = React.useContext(Context)
    const handleLogin = async (e) => {
        if(!user.email){
            return ActivateToast("Please Enter Email Address","warning")
        }else if(!user.password){
            return ActivateToast("Please Enter Password","warning")
        }
        const { data: res } = await axios.post(apiLink + "signin/", { ...user });
        if (res.message) {
            return ActivateToast(res.message, "error");
        }
        localStorage.setItem(`token`, JSON.stringify(res.token))
        Cookies.set(`token`, JSON.stringify(res.token))
        console.log(res.token)
        Cookies.set(`UserID`, JSON.stringify(res._id))
        ActivateToast("Account Logged In Successfully", "success");
        setUserID(res._id)
        setToken(res.token)
        setIsAdmin(res.isAdmin)
        if (res.isAdmin) {
            if (res.isAdmin) {
                ((async () => {
                    let { data } = await axios.get(`${apiLink}configuration/647589da7d9cb06b225e4638`)
                    setConfigurationSettings(data)
                })())
            }
        }
        setAssignedCenter(res.assignedCenter)
        setRole(res.role)
        setUserPermissions(res.permission)
        setUserName(res.name)
        setUserCreator(res?.creator)
        setPasswordChanged(res.password_changed)
        setOwnerID(res.ownerID)
        setUserEmailId(res.email)
        setUserWhatsApp(res.whatsApp)
        setSubmitted(true)
        setCenters(res.centers)
        axios.post(apiLink + "log", {
            from: {
                name: userName,
                userID,
            },
            activity: `${res.name}(${res.role}) Logged In!`,
            date: LocalDate(),
            time: LocalTime(),
        })
        // PostToLogs(`${res.name}(${res.role}) Logged In!`)
    };
    if (userID && !passwordChanged) return <Navigate to={"/client/changePassword"} />
    if (submitted) return <Navigate to={"/"} />

    if (userID && passwordChanged) return <Navigate to={"/client/dashboard"} />

    return (
        <div className={styles.main}>
            <div className={styles.container}>
            <div className={styles.heading}>Sign In</div>
            <Box sx={{ mt: 1 }}>
                <div className={styles.form} >
                    <input
                        placeholder="E-mail"
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className={styles.input}
                        required=""
                    />
                    <input
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                console.log(signInRef.current.click())
                            }
                        }}
                        className={styles.input}
                        required=""
                    />
                    
                    <button onClick={handleLogin} className={styles["login-button"]} >Sign In</button>
                </div>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <ForgotPasswordPage />
                    <Typography color={"primary"} sx={{ cursor: "pointer" }} onClick={() => {
                        navigate("/client/memberLogin")
                    }} variant="body2">
                        {"Member? Sign In Here"}
                    </Typography>
                </Box>
            </Box>
        </div>
        </div>

    );
}

export default Login;
