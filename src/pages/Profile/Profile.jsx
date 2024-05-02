

import './Profile.css';
import { userData } from '../../app/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetMyPosts, GetProfile, UpdateCall } from '../../services/apiCalls';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

    const [write, setWrite] = useState("disabled")

    // const dispatch = useDispatch()

    useEffect(() => {
        if (!reduxUser.tokenData.token) {
            navigate("/")
        }
    }, [reduxUser])

    const [user, setUser] = useState({
        nickname: "",
        favSubgenre: "",
        preference: "",
        turntable: "",
        email: ""
    })

    const [userError, setUserError] = useState({
        nicknameError: "",
        favSubgenreError: "",
        preferenceError: "",
        turntableError: "",
        emailError: ""
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

    // const manageDetail = (post) => {
    //     dispatch(updateDetail({ detail: post }));
    //     navigate("/detail");
    // };

    useEffect(() => {

        const UserProfile = async () => {
            try {
                const fetched = await GetProfile(reduxUser.tokenData.token)
                setUser({
                    firstName: fetched.data.firstName,
                    lastName: fetched.data.lastName,
                    email: fetched.data.email
                })

                setLoadedData(true)

            } catch (error) {
                console.log(error.message)
            }
        }
        if (!loadedData) {
            UserProfile()
        }
    }, [user])

    useEffect(() => {
        toast.dismiss()
        userError.firstNameError &&
            toast.warn(userError.firstNameError)
        userError.lastNameError &&
            toast.warn(userError.lastNameError)
    }, [userError])

    useEffect(() => {
        const myPosts = async () => {
            try {
                const fetched = await GetMyPosts(reduxUser.tokenData.token)

                setPosts(fetched.data)

            } catch (error) {
                console.log(error)
            }
        }

        if (reduxUser.tokenData.token && posts.length === 0) {
            myPosts()
        }
    }, [posts])


    const UpdateProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }

            const fetched = await UpdateCall(reduxUser?.tokenData?.token, user)
            if (fetched.success === true) {
                toast.success(fetched.message)
            } else toast.error(fetched.message)

            setWrite("disabled")  
        } catch (error) {
            console.log(error.message)
        }
    }

    // const deletePost = async (id) => {
    //     try {
    //         const fetched = await deletePostCall(id, reduxUser.tokenData.token)
    //         if (fetched.success === true) {
    //             toast.success(fetched.message)
    //         }
    //         if (fetched.success === false) {
    //             toast.error(fetched.message)
    //         }

    //         setPosts(
    //             posts.filter((post) => post._id !== id)
    //         )

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (

        <div className="profileDesign">
            {loadedData ? (
                <div className='inputsContainer'>
                    <div className='editInstruction'>click sobre un post para editarlo y sobre habilitar para cambiar tu información personal</div> 
                    <CInput
                        className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"firstName"}
                        disabled={write}
                        value={user.firstName || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />

                    <CInput
                        className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"lastName"}
                        disabled={write}
                        value={user.lastName || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />

                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"email"}
                        name={"email"}
                        disabled={true}
                        value={user.email || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />

                    <CButton
                        className={write === "" ? " updateButton" : "allowButton"}
                        title={write === "" ? "Actualizar" : <img src="img/EditIcon.png" alt="editIcon"></img>}
                        emitFunction={write === "" ? UpdateProfile : () => setWrite("")}
                    />

                </div>
            ) : (
                <div>loading</div>
            )}
            </div>)
            

}