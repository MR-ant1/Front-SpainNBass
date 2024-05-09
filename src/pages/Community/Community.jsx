
import "./Community.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { userData } from "../../app/slices/userSlice"
import { RedirectButton } from "../../common/RedirButton/RedirButton"
import { useNavigate } from 'react-router-dom'
import { updateDetail } from "../../app/slices/postDetailSlice"
import 'react-toastify/dist/ReactToastify.css';
import { categoryData } from "../../app/slices/communitySlice"
import { GetGenrePostCall, createPostCall } from "../../services/api.Calls"
import { CInput } from "../../common/CInput/CInput"
import { validate } from "../../utils/validations"
import { CButton } from "../../common/CButton/CButton"
import { toast } from "react-toastify"



export const Community = () => {

    const reduxUser = useSelector(userData)

    const categorySelection = useSelector(categoryData)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        picUrl: "",
        topic: ""
    })

    // eslint-disable-next-line no-unused-vars
    const [newPostError, setNewPostError] = useState({
        titleError: "",
        descriptionError: "",
        picUrlError: ""
    })

    const [write, setWrite] = useState("disabled")

    const inputHandler = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setNewPostError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const manageDetail = (post) => {
        dispatch(updateDetail({ detail: post }));
        navigate("/detailPost");
    };

    useEffect(() => {
        const postFeed = async () => {
            try {

                const fetched = await GetGenrePostCall(reduxUser.tokenData.token, categorySelection.category)

                if (fetched.success === true) {
                  setPosts(fetched.data)
                setLoadedPosts(true)  
                setNewPost({
                    title:"",
                    description:"",
                    picUrl:"",
                    topic: categorySelection.category
                })
                }
            } catch (error) {
                console.log(error)
            }
        }
        postFeed()
    }, [categorySelection.category])



    const sendPost = async () => {
        try {

            if (newPost.description === "") {
                throw new Error("El campo description es obligatorio"),
                toast.error("Descripción es obligatorio")
            }
            const fetched = await createPostCall(reduxUser.tokenData.token, newPost)
       
            if (fetched.data && fetched.data.id) {
                
                setPosts([...posts, fetched.data])
                setWrite("disabled")
                setNewPost({
                    title: "",
                    description: "",
                    picUrl: "",
                    topic: categorySelection?.category
                })
            }



            if (fetched.success === true) {
                toast.success(fetched.message)
            } else { toast.error(fetched.message) }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="homeDesign">

            {!reduxUser.tokenData.token ? (
                <>
                    <div className="welcomeView">
                        <div className="welcomeMsg">Bienvenido a Community!</div>
                        <RedirectButton
                            className={"loginButtonDesign"}
                            title={"Login"}
                            emitFunction={() => navigate("/login")}
                        />
                        <RedirectButton
                            className={"registerButtonDesign"}
                            title={"Register"}
                            emitFunction={() => navigate("/register")}
                        />
                    </div>
                </>
            ) : (
                <>
                    <CInput
                        className={"inputDesign"}
                        type={"text"}
                        name={"title"}
                        disabled={write}
                        value={newPost.title || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <CInput
                        className={"inputDesign"}
                        type={"text"}
                        name={"description"}
                        disabled={write}
                        value={newPost.description}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <CInput
                        className={"inputDesign"}
                        type={"text"}
                        name={"picUrl"}
                        disabled={write}
                        value={newPost.picUrl}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <CInput
                        className={"inputDesign"}
                        type={"text"}
                        name={"topic"}
                        disabled={true}
                        value={categorySelection.category}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <CButton
                        className={write === "" ? " updateButton" : "allowButton"}
                        title={write === "" ? "Actualizar" : "Habilitar"}
                        emitFunction={write === "" ? sendPost : () => setWrite("")}
                    />
                    {posts.length !== 0 ? (
                        <>
                            {posts.map(
                                post => {
                                    return (
                                        <div className="cardDiv" key={post.id}>
                                            <PostCard
                                                key={post.id}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                description={post.description.length > 20 ? post.description.substring(0, 20) : post.description}
                                                nickname={post.owner.nickname}
                                                clickFunction={() => manageDetail(post)}
                                            />
                                        </div>
                                    )
                                }).reverse()}
                        </>) : (
                        loadedPosts === false ? <div className="homeDesign">LOADING</div>
                            : <div className="homeDesign">AUN NO HAY POST DE ESTA CATEGORIA</div>

                    )}
                </>)}
        </div>
    )
}