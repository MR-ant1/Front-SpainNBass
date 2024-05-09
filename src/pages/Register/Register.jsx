
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { CButton } from '../../common/CButton/CButton';
import { CInput } from "../../common/CInput/CInput"
import { useEffect, useState } from 'react';
import { RedirectButton } from '../../common/RedirButton/RedirButton';
import { registerCall } from '../../services/api.Calls';
import { validate } from '../../utils/validations'
import { userData } from '../../app/slices/userSlice';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export const Register = () => {

    const navigate = useNavigate();

    const reduxUser = useSelector(userData)

    useEffect(() => {
        if (reduxUser.tokenData.token) {
            navigate("/")
        }
    }, [reduxUser.tokenData.token])

    const [user, setUser] = useState({
        nickname: "",
        favSubgenre: "",
        preference: "",
        turntable: "",
        email: "",
        password: ""

    })


    const [userError, setUserError] = useState({
        nicknameError: "",
        favSubgenreError: "",
        preferenceError: "",
        turntableError: "",
        emailError: "",
        passwordError: ""

    })

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
        }))
    }

    useEffect(() => {
        toast.dismiss()
        userError.nicknameError &&
            toast.error(userError.nicknameError)
        userError.turntableError &&
            toast.error(userError.turntableError)
        userError.emailError &&
            toast.error(userError.emailError)
        userError.passwordError &&
            toast.error(userError.passwordError)
    }, [userError])

    const registerUser = async () => {
        try {
            const fetched = await registerCall(user)

            if (fetched.success === true) {
                toast.success(fetched.message)
            } else toast.error(fetched.message)

            if (fetched.success === true) {
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } else navigate("/register")

        } catch (error) {
            throw new Error("No se pudo registrar el usuario")
        }
    }
    return (
        <div className="registerDesign">
            <CInput
                className={`inputDesign ${userError.nicknameError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"nickname"}
                name={"nickname"}
                value={user.nickname || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <select
                className={`inputDesign ${userError.favSubgenreError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                name={"favSubgenre"}
                value={user.favSubgenre || ""}
                onChange={inputHandler}
            >
                <option value="">Elige un subgenero</option>
                <option value="Club dnb">Club dnb</option>
                <option value="RaggaJungle">RaggaJungle</option>
                <option value="Rollers">Rollers</option>
                <option value="Liquid dnb">Liquid dnb</option>
                <option value="Jump Up">Jump Up</option>
                <option value="NeuroFunk">NeuroFunk</option>
            </select>


            <select 
                className={`inputDesign ${userError.preferenceError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                name={"preference"}
                value={user.preference || ""}
                onChange={inputHandler}
            >
                <option value="">¿Cual es tu rol?</option>
                <option value="dnb Lover">dnb Fan</option>
                <option value="DJ">DJ</option>
                <option value="Producer">Producer</option>
                <option value="DJ/Producer">DJ/Producer
                </option>
            </select>

            <CInput
                className={`inputDesign ${userError.turntableError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"Bio (equipo, anécdotas, influencias...)"}
                name={"turntable"}
                value={user.turntable || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <CInput
                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <CInput
                className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                type={"password"}
                placeholder={"password"}
                name={"password"}
                value={user.password || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />

            <CButton
                className={"cbuttonDesign"}
                title={"Register"}
                emitFunction={registerUser}
            />

            <div className="redirectMsg">Si ya dispones de cuenta, haz click aqui abajo</div>
            <RedirectButton
                className={"RedirectButtonDesign"}
                title={"Login"}
                emitFunction={() => navigate("/login")}
            />
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}