
import "./Community.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { userData } from "../../app/Slices/userSlice"
import { useNavigate } from 'react-router-dom'
import { updateDetail } from "../../app/Slices/postDetailSlice"
import 'react-toastify/dist/ReactToastify.css';
import { categoryData } from "../../app/Slices/communitySlice"
import { GetGenrePostCall, createPostCall } from "../../services/api.Calls"
import { CInput } from "../../common/CInput/CInput"
import { validate } from "../../utils/validations"
import { CButton } from "../../common/CButton/CButton"
import { ToastContainer, toast } from "react-toastify"
import { CommunityCard } from "../../common/CommunityCard/CommunityCard"



export const Community = () => {

    const reduxUser = useSelector(userData)

    const categorySelection = useSelector(categoryData)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [invisible, setInvisible] = useState(true)

    const [loadedPosts, setLoadedPosts] = useState(false)

    const [posts, setPosts] = useState([])

    
    useEffect(() => {
        if (!reduxUser?.tokenData?.token) {
            navigate("/")
        }
    }, [reduxUser])

    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        picUrl: "",
        topic: "",
        createdAt: "",
        updatedAt: ""
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
                if (reduxUser.tokenData.token) {
                    const fetched = await GetGenrePostCall(reduxUser.tokenData.token, categorySelection.category)

                    if (fetched.success === true) {
                        setPosts(fetched.data)
                        setLoadedPosts(true)
                        setNewPost({
                            title: "",
                            description: "",
                            picUrl: "",
                            topic: categorySelection.category

                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        postFeed()
    }, [categorySelection.category])



    const sendPost = async () => {
        try {
            const fetched = await createPostCall(reduxUser.tokenData.token, newPost)

            if (fetched.data && fetched.data.id) {
                setPosts([fetched.data, ...currentPosts])
                setWrite("disabled")
                setInvisible(true)
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

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="communityDesign">
                <>
                    <div className="inputsCommunityContainerDesign">
                        <div className="communityInputsDesign" hidden={invisible}>
                            <CInput
                                className={"inputNicknameHomeDesign"}
                                type={"text"}
                                disabled={true}
                                name={"owner"}
                                value={reduxUser.tokenData.user.nickname}
                            />
                            <CInput
                                className={"inputTitleCommunityDesign"}
                                type={"text"}
                                name={"title"}
                                placeholder={"Título"}
                                value={newPost.title || ""}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <CInput
                                className={"inputDescriptionHomeDesign"}
                                type={"text"}
                                name={"description"}
                                disabled={write}
                                value={newPost.description}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <CInput
                                className={"inputPicUrlCommunityDesign"}
                                type={"text"}
                                name={"picUrl"}
                                placeholder={"Url"}
                                disabled={write}
                                value={newPost.picUrl}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <CInput
                                className={"inputTopicCommunityDesign"}
                                type={"text"}
                                name={"topic"}
                                disabled={true}
                                value={categorySelection.category}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <div className="sendPostCommunityButton">
                                <CButton
                                    className={write === "" ? " updateButton" : "allowButton"}
                                    title={write === "" ? "Enviar" : "Habilitar"}
                                    emitFunction={write === "" ? sendPost : setWrite("")}
                                />
                            </div>
                        </div>
                        <CButton
                            className={invisible === false ? " hideInputsButton" : "writePostButton"}
                            title={invisible === false ? "Ocultar" : "Escribir nuevo post"}
                            emitFunction={invisible === true ? () => setInvisible(false) : () => setInvisible(true)}
                        />
                    </div>
                    <div className="communityTitle">Foro {newPost.topic}</div>
                    {posts.length !== 0 ? (
                        <div className="communityCardsContainer">
                            {currentPosts.map(
                                post => {
                                    return (
                                        <div className="communityCardDiv" key={post.id}>

                                            <CommunityCard
                                                title={post.title.length > 60 ? post.title.substring(0, 60) : post.title}
                                                nickname={post.owner.nickname}
                                                clickFunction={() => manageDetail(post)}
                                            />
                                        </div>
                                    )
                                })}
                        </div>) : (
                        loadedPosts === false ? <div className="homeDesign">LOADING</div>
                            : <div className="communityNoPostsDesign">AUN NO HAY POST DE ESTA CATEGORIA</div>

                    )}
                </>
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
            <ul className="paginateContainer">
                {pageNumbers.map((number) => (
                    <div key={number} className="pageContainer">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="pageDesign"
                        >
                            {number}
                        </a>
                    </div>
                ))}
            </ul>
        </div>
    )
}