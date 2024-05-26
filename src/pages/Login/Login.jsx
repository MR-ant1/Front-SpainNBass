
import './Login.css'
import { useNavigate } from 'react-router-dom/dist'
import { login, userData } from '../../app/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { validate } from '../../utils/validations'
import { ToastContainer, toast } from 'react-toastify'
import { loginCall, registerCall } from '../../services/api.Calls'
import { decodeToken } from 'react-jwt'
import { CInput } from '../../common/CInput/CInput'
import { CButton } from '../../common/CButton/CButton'

export const Access = () => {
    const navigate = useNavigate()

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reduxUser?.tokenData?.token) {
            navigate('/')
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

    const [userRegister, setUserRegister] = useState({
        nickname: "",
        favSubgenre: "",
        preference: "",
        turntable: "",
        email: "",
        password: ""
    })


    const [userRegisterError, setuserRegisterError] = useState({
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
        }));
    };

    const inputHandlerRegister = (e) => {
        setUserRegister((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkErrorRegister = (e) => {
        const error = validate(e.target.name, e.target.value)

        setuserRegisterError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    useEffect(() => {
        toast.dismiss()
        userError.emailError &&
            toast.error(userError.emailError)
        userError.passwordError &&
            toast.error(userError.passwordError)
    }, [userError])

    useEffect(() => {
        toast.dismiss()
        userRegisterError.nicknameError &&
            toast.error(userRegisterError.nicknameError)
        userRegisterError.turntableError &&
            toast.error(userRegisterError.turntableError)
        userRegisterError.emailError &&
            toast.error(userRegisterError.emailError)
        userRegisterError.passwordError &&
            toast.error(userRegisterError.passwordError)
    }, [userRegisterError])

    const loginUser = async () => {

        try {
            const fetched = await loginCall(user);

            if (fetched.message === "Usuario logueado correctamente") {
                toast.success(fetched.message)
            } else toast.error(fetched.message)


            if (fetched.token) {
                const decoded = decodeToken(fetched.token)

                const passInfo = {
                    token: fetched.token,
                    user: decoded
                };
                setTimeout(() => {
                    dispatch(login({ tokenData: passInfo }))
                    navigate("/")
                }, 1500)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const registerUser = async () => {
        try {
            const fetched = await registerCall(userRegister)

            if (fetched.success === true) {
                toast.success(fetched.message)
            } else toast.error(fetched.message)

        } catch (error) {
            throw new Error("No se pudo registrar el usuario")
        }
    }

    return (
        <div className='accessDesign'>
            <div className="loginRegisterMainDesign">
                <div className="registerContainerDesign">
                    <div className="welcomeMessageAccess">REGISTRO</div>
                    <CInput
                        className={`inputDesign ${userRegisterError.nicknameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        placeholder={"nickname"}
                        name={"nickname"}
                        value={userRegister.nickname || ""}
                        changeFunction={inputHandlerRegister}
                        blurFunction={checkErrorRegister}
                    />

                    <select
                        className={`inputDesign ${userRegisterError.favSubgenreError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"favSubgenre"}
                        value={userRegister.favSubgenre || ""}
                        onChange={inputHandlerRegister}
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
                        className={`inputDesign ${userRegisterError.preferenceError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"preference"}
                        value={userRegister.preference || ""}
                        onChange={inputHandlerRegister}
                    >
                        <option value="">¿Cual es tu rol?</option>
                        <option value="dnb Lover">dnb Fan</option>
                        <option value="DJ">DJ</option>
                        <option value="Producer">Producer</option>
                        <option value="DJ/Producer">DJ/Producer
                        </option>
                    </select>

                    <CInput
                        className={`inputDesign ${userRegisterError.turntableError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        placeholder={"Bio (equipo, anécdotas, influencias...)"}
                        name={"turntable"}
                        value={userRegister.turntable || ""}
                        changeFunction={inputHandlerRegister}
                        blurFunction={checkErrorRegister}
                    />

                    <CInput
                        className={`inputDesign ${userRegisterError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"email"}
                        placeholder={"email"}
                        name={"email"}
                        value={userRegister.email || ""}
                        changeFunction={inputHandlerRegister}
                        blurFunction={checkErrorRegister}
                    />

                    <CInput
                        className={`inputDesign ${userRegisterError.passwordError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"password"}
                        placeholder={"password"}
                        name={"password"}
                        value={userRegister.password || ""}
                        changeFunction={inputHandlerRegister}
                        blurFunction={checkErrorRegister}
                    />

                    <CButton
                        className={"cbuttonDesign"}
                        title={"Register"}
                        emitFunction={registerUser}
                    />
                </div>
                <div className='middleLineDesign'></div>
                <div className='loginContainerDesign'>
                    <div className='loginInputsDesign'>
                        <div className="welcomeMessageAccess">INICIO DE SESIÓN</div>
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
                            emitFunction={loginUser}
                        />
                    </div>
                </div>
            </div>
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