

import './Profile.css';
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetMyPosts, GetProfile, UpdateCall } from '../../services/api.Calls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from '../../common/PostCard/PostCard';
import { updateDetail } from '../../app/slices/postDetailSlice';
import { Pencil } from 'lucide-react';




export const Profile = () => {

    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false)

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    const reduxUser = useSelector(userData)

    const [write, setWrite] = useState("disabled")

    const [invisible, setInvisible] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!reduxUser?.tokenData?.token) {
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

    const manageDetail = (post) => {
        dispatch(updateDetail({ detail: post }));
        navigate("/detailMyPost");
    };

    useEffect(() => {

        const UserProfile = async () => {
            try {
                const fetched = await GetProfile(reduxUser.tokenData.token)
                setUser({
                    nickname: fetched.data.nickname,
                    favSubgenre: fetched.data.favSubgenre,
                    preference: fetched.data.preference,
                    turntable: fetched.data.turntable,
                    email: fetched.data.email,
                    createdAt: fetched.data.createdAt,
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
        userError.nicknameError &&
            toast.warn(userError.nicknameError)
        userError.turntableError &&
            toast.warn(userError.turntableError)
    }, [userError])

    useEffect(() => {
        const myPosts = async () => {
            try {
                const fetched = await GetMyPosts(reduxUser.tokenData.token)

                setPosts(fetched.data)
                setLoadedPosts(true)
            } catch (error) {
                console.log(error)
            }
        }

        if (!loadedPosts || loadedPosts.length === 0) {
            myPosts()
        }
    }, [posts])


    const UpdateProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] && elemento !== user.turntable === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }

            for (let elemento in userError) {
                if (userError[elemento] !== "") {
                    throw new Error("no puedes actualizar hasta que todos los campos sean válidos")
                }
            }

            const fetched = await UpdateCall(reduxUser?.tokenData?.token, user)
            if (fetched.success === true) {
                toast.success(fetched.message)
                setWrite("disabled")
            } else toast.error(fetched.message)

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="profileMainDesign">
            <div className='profileContainer'>
                {loadedData ? (
                    <div className='inputsContainer'>
                        
                            <div className='editInstruction'><h2>Haz click sobre habilitar para cambiar tu información personal</h2></div>
                            <div className='inputsRowDesign'> 
                            <CInput
                                className={`inputDesign ${userError.nicknameError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"text"}
                                name={"nickname"}
                                disabled={write}
                                value={user.nickname || ""}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <select
                                className={`inputDesign ${userError.favSubgenreError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"text"}
                                name={"favSubgenre"}
                                disabled={write}
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
                            </div>
                            <div className='inputsRowDesign1'> 
                            <select
                                className={`inputDesign ${userError.preferenceError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"text"}
                                name={"preference"}
                                disabled={write}
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
                                type={"textarea"}
                                name={"turntable"}
                                disabled={write}
                                value={user.turntable || ""}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            </div>
                            <div className='inputsRowDesign2'> 
                            <CInput
                                className={"inputDesign"}
                                type={"email"}
                                name={"email"}
                                disabled={true}
                                value={user.email || ""}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <CInput
                                className={"inputDesign"}
                                type={"text"}
                                name={"createdAt"}
                                disabled={true}
                                value={"Fecha de creación:" + user.createdAt}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            </div>
                        
                        <div className='updateProfileContainer'>
                            <CButton
                                className={write === "" ? " updateButton" : "allowButton"}
                                title={write === "" ? "Actualizar" : <Pencil />}
                                emitFunction={write === "" ? UpdateProfile : () => setWrite("")}
                            />
                        </div>
                    </div>
                ) : (
                    <div>loading</div>
                )}

                {posts.length !== 0 ? (

                    <div className='myPosts'>
                        <CButton
                            className={invisible === false ? " hideInputsButton" : "writePostButton"}
                            title={invisible === false ? "Ocultar" : "Mis posts"}
                            emitFunction={invisible === true ? () => setInvisible(false) : () => setInvisible(true)}
                        />
                        <div className='hiddenCardsDesign' hidden={invisible}>
                            <div className='editInstruction'><h2>Haz click sobre un post para verlo, editarlo o borrarlo</h2></div>
                            {posts.map(
                                post => {
                                    return (
                                        <div className='myPostCardProfile' key={post.id}>
                                            <PostCard
                                                nickname={post.owner.nickname}
                                                title={post.title && post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 40 ? post.description.substring(0, 40) + "..." : post.description}
                                                picUrl={post.picUrl}
                                                createdAt={"Creado:" + post.createdAt}
                                                updatedAt={"Edit:" + post.updatedAt}
                                                clickFunction={() => manageDetail(post)}
                                            />
                                        </div>

                                    )
                                }
                            ).reverse()
                            }
                        </div>
                    </div>


                ) : (<div>Aun no has creado ningún post</div>
                )}
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