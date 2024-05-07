
import "./Community.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PostCard } from "../../common/PostCard/PostCard"
import { userData } from "../../app/slices/userSlice"
import { RedirectButton } from "../../common/RedirButton/RedirButton"
import { useNavigate } from 'react-router-dom'
import { CButton } from "../../common/CButton/CButton"
import { updateDetail } from "../../app/slices/postDetailSlice"
import 'react-toastify/dist/ReactToastify.css';
import { categoryData } from "../../app/slices/communitySlice"
import { GetGenrePostCall } from "../../services/api.Calls"



export const Community = () => {

    const reduxUser = useSelector(userData)

    const categorySelection = useSelector(categoryData)

    console.log(categorySelection.category)

    const navigate = useNavigate()

    const [loadedPosts, setLoadedPosts] = useState(false)

    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])

    // const inputHandler = (e) => {
    //     setNewPost((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const manageDetail = (post) => {
        dispatch(updateDetail({ detail: post }));
        navigate("/detailPost");
    };

    // eslint-disable-next-line no-unused-vars
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        picUrl: ""
    })

    useEffect(() => {
        const postFeed = async () => {
            try {
                
                const fetched = await GetGenrePostCall(reduxUser.tokenData.token, categorySelection.category)
                
                setPosts(fetched.data)
                setLoadedPosts(true)

            } catch (error) {
                console.log(error)
            }
        }
        if ( loadedPosts=== false) {
            postFeed()
        }
    }, [posts])



    // const sendPost = async () => {
    //     try {
    //         for (let elemento in story) {
    //             if (story[elemento] === "") {
    //                 throw new Error("All fields are required"),
    //                 toast.error("All fields are required")
    //             }
    //         }
          
    //         const fetched = await createPostCall(reduxUser.tokenData.token, story)

    //         if (fetched.data && fetched.data._id) {
    //             setPosts([...posts, fetched.data])
    //         }
    //         setPosts({
    //             title:"",
    //             description:"",
    //             picUrl: ""
    //         })
            

    //         if (fetched.success === true) {
    //             toast.success(fetched.message)
    //         } else { toast.error(fetched.message) }

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    // const likePost = async (postId) => {

    //     try {
    //         const fetched = await likeCall(reduxUser.tokenData.token, postId)

    //         if (fetched.message === "Like") {
    //             toast.success(fetched.message)
    //         } else toast.info(fetched.message)

    //         if (fetched.data && fetched.data._id) {
    //             setPosts(posts.map(post => post._id === postId ? fetched.data
    //              : post))}

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className="homeDesign">

            {!reduxUser.tokenData.token  ? (
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

                posts.length !== 0 ? (
                    <>
                    <div className="homeHeader">
                    FEED
                    </div>
                        <div className="postPanel">
                            {/* <div className="writeBox">
                                <PostInput
                                    className={`postTitleInput`}
                                    type={"text"}
                                    name={"title"}
                                    value={newPost.title}
                                    placeholder={"¿Qué hay de nuevo?"}
                                    changeFunction={inputHandler}

                                />
                                <PostInput
                                    className={`createPostInput`}
                                    type={"text"}
                                    name={"description"}
                                    value={newPost.description}
                                    placeholder={"Desarrolla tu historia"}
                                    changeFunction={inputHandler}
                                />
                            </div> */}

                            <div className="sendButton">
                                <CButton
                                    className={"createPostButton"}
                                    title={"Publicar"}
                                    // emitFunction={(sendPost)}
                                />

                            </div>
                        </div>

                        <div className="cardsDesign">
                            {posts.map(     
                                post => {
                                    return (
                                        <div className="cardDiv" key={post.id}>
                                            <PostCard
                                                key={post.id}
                                                title={post.title.length > 20 ? post.title.substring(0, 20) : post.title}
                                                clickFunction={() => manageDetail(post)}
                                            />
                                            {/* <div className="likeContainer" key={post._id} >
                                                <CButton
                                                className={"likeButton"}
                                                title={<Heart fill={post.likes.includes(reduxUser.tokenData.user.userId) ? "red"
                                                : "white"} />}
                                                // emitFunction={() => likePost(post._id)}
                                                />
                                                <div className="likesNum">{post.likes.length}</div>
                                            </div> */}
                                            
                                        </div>
                                    )
                                }).reverse()}
                        </div>
                    </>

                ) : (
                    <div className="homeDesign">LOADING</div>
                ))}
        </div>
    )
}