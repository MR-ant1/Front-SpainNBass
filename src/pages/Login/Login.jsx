
import { useNavigate } from 'react-router-dom/dist'
import './Login.css'
import { login, userData } from '../../app/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { validate } from '../../utils/validations'
import { toast } from 'react-toastify'
import { loginCall } from '../../services/api.Calls'
import { decodeToken } from 'react-jwt'
import { CInput } from '../../common/CInput/CInput'
import { CButton } from '../../common/CButton/CButton'
import { RedirectButton } from '../../common/RedirButton/RedirButton'

export const Login = () => {
    const navigate = useNavigate()

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reduxUser?.tokenData?.token) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [reduxUser?.tokenData?.token])
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    useEffect(() => {
        toast.dismiss()
        userError.emailError
        toast.error(userError.emailError)
        userError.passwordError && 
        toast.error(userError.passwordError)
    }, [userError])

    const loginUser = async () => {

        try {
            const fetched = await loginCall(user);
            
            
            if (fetched.message === "Usuario logueado correctamente") {
                toast.success(fetched.message)
            } else (toast.error(fetched.message))


            if (fetched.token) {
                const decoded = decodeToken(fetched.token)

                const passInfo = {
                    token: fetched.token,
                    user: decoded
                };
                dispatch(login({ tokenData: passInfo })
            );

                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="loginDesign">
            <CInput
                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                type={"email"}
                name={"email"}
                placeholder={"email"}
                value={user.email || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <CInput
                className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                type={"password"}
                name={"password"}
                placeholder={"password"}
                value={user.password || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <CButton
                className={"cbuttonDesign"}
                title={"Login"}
                emitFunction={(loginUser)}
            />
         
            <div className="redirectRegisterMsg">Si no dispones de una cuenta, haz click aqui abajo</div>
            <RedirectButton
                className={"RedirectButtonDesign"}
                title={"Register"}
                emitFunction={() => navigate("/register")}
            />
            {/* <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            /> */}
        </div>
    )
}