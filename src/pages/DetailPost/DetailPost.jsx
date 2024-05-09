
import "./DetailPost.css";
import { useSelector } from "react-redux";
import { detailData, } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { validate } from "../../utils/validations";
import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from "../../common/PostCard/PostCard";
import { CButton } from "../../common/CButton/CButton";
import { GetCommentsCall, LikeCall, PostLikesCall, bannedPostCall, newCommentCall } from "../../services/api.Calls";
import { ToastContainer, toast } from "react-toastify";
import { CInput } from "../../common/CInput/CInput";
import { Heart } from "lucide-react";


export const PostDetail = () => {

    const detailRdx = useSelector(detailData);

    const reduxUser = useSelector(userData)

    const navigate = useNavigate();


    useEffect(() => {
        if (reduxUser.tokenData.token === "") {
            navigate("/")
        }
    }, [reduxUser?.tokenData?.token])

    const [loadedComments, setLoadedComments] = useState(false)

    const [postComments, setPostComments] = useState([])

    const [newComment, setNewComment] = useState({
        comment: "",
        url: "",
        createdAt: detailRdx?.detail?.createdAt
    })

    const [newCommentError, setNewCommentError] = useState({
        commentError: "",
        urlError: ""
    })

    const [countDone, setCountDone] = useState(false)

    const [likeCount, setLikeCount] = useState([])

    const [write, setWrite] = useState("disabled")

    const [isLikedBefore, setIsLikedBefore] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [post, setPost] = useState({
        id: detailRdx?.detail?.id,
        title: detailRdx?.detail?.title,
        description: detailRdx?.detail?.description,
        topic: detailRdx?.detail?.topic,
        picUrl: detailRdx?.detail?.picUrl,
        ownerId: detailRdx?.detail?.owner.id,
        ownerNickname: detailRdx?.detail?.owner.nickname,
        createdAt: detailRdx?.detail?.owner.createdAt,
        updatedAt: detailRdx?.detail?.owner.updatedAt,
    })

    useEffect(() => {
        const likesCount = async () => {
            try {
                const fetched = await PostLikesCall(reduxUser.tokenData.token, post.id)
                const likes = fetched.data

                if (fetched.success === true) {
                    setCountDone(true)
                    setLikeCount(fetched.data.length)

                    for (let like in likes) {
                        if (likes[like].user?.id === reduxUser?.tokenData?.user.userId) {
                            setIsLikedBefore(true)
                        }
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if (countDone === false) {
            likesCount()
        }
    }, [likeCount])

    useEffect(() => {
        toast.dismiss()
        newCommentError.commentError &&
            toast.warn(newCommentError.commentError)
        newCommentError.urlError &&
            toast.warn(newCommentError.urlError)
    }, [newCommentError])



    const inputHandler = (e) => {
        setNewComment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setNewCommentError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    useEffect(() => {
        const bringComments = async () => {

            try {
                const fetched = await GetCommentsCall(reduxUser.tokenData.token, post.id)
                if (fetched.success === true) {
                    setPostComments(fetched.data)
                    setLoadedComments(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (loadedComments === false) {
            bringComments()
        }
    }, [postComments])

    const likePost = async (id) => {

        try {
            const fetched = await LikeCall(reduxUser.tokenData.token, id)

            if (fetched.message === "Like") {
                setIsLikedBefore(true)
            } else setIsLikedBefore(false)
            setCountDone(false)

            if (fetched.message === "Like") {
                toast.success(fetched.message)
            } else toast.info(fetched.message)

            fetched.message === "Like" ? setLikeCount(countDone + 1)
                : setLikeCount(countDone - 1)

        } catch (error) {
            console.log(error)
        }
    }

    const createComment = async () => {
        try {
            const fetched = await newCommentCall(reduxUser.tokenData.token, post.id, newComment)
            if (newComment.comment.length === 0) {
                throw new Error("Tu comentario debe tener texto"),
                toast.error("Comentario es obligatorio")
            }
            if (fetched.success === true) {
                setLoadedComments(false)
                setPostComments(false)
                setWrite("disabled")
                toast.success(fetched.message)
                setNewComment({
                    comment: "",
                    url: ""
                })
            } else toast.error(fetched.message)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMyPost = async (id) => {
        try {
            const fetched = await bannedPostCall(id, reduxUser.tokenData.token)
            if (fetched.success === true) {
                toast.success(fetched.message)
                setTimeout(() => {
                    navigate("/community")
                }, 1500)
            }else toast.error(fetched.message)

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="detailDesign">
            <div className="undoButton">
                <CButton
                    className={"backButton"}
                    title={"X"}
                    emitFunction={(() => navigate('/community'))}
                />
            </div>
            <div className='myPostCard' key={detailRdx.detail?.id}>
                <PostCard
                    id={detailRdx.detail?.id}
                    nickname={detailRdx.detail?.owner.nickname}
                    title={detailRdx.detail?.title}
                    description={detailRdx?.detail?.description}
                    picUrl={detailRdx?.detail?.picUrl}
                    createdAt={"Creado:" + detailRdx?.detail?.createdAt}
                    updatedAt={"Actualizado:" + detailRdx?.detail?.updatedAt}
                />
            </div>
            <div className="likeRow">
                <CButton
                    className={"likeButton"}
                    title={<Heart fill={isLikedBefore === true ? "red" : "white"} />}
                    emitFunction={() => likePost(post.id)}
                />
                <div className="likesNum">{likeCount}</div>
            </div>
            {detailRdx?.detail?.owner?.id === reduxUser?.tokenData?.user.userId &&
                <CButton
                    className={"editButton"}
                    title={"Actualizar"}
                    emitFunction={() => navigate('/detailMyPost')}
                />

            }

            <CInput
                className={"inputDesign"}
                type={"text"}
                name={"comment"}
                disabled={write}
                value={newComment.comment || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />
            <CInput
                className={"inputDesign"}
                type={"text"}
                name={"url"}
                disabled={write}
                value={newComment.url}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />
            <CButton
                className={write === "" ? " updateButton" : "allowButton"}
                title={write === "" ? "Enviar comentario" : "Escribir comentario"}
                emitFunction={write === "" ? () => createComment() : () => setWrite("")}
            />
            {detailRdx?.detail?.owner?.id === reduxUser?.tokenData?.user.userId &&
                <div className='deleteButton'>
                    <CButton key={post.id}
                        className={"deleteMyPostButton"}
                        title={"Eliminar"}
                        emitFunction={(() => deleteMyPost(post.id))}
                    />
                </div>
            }

            {loadedComments === true ? (
                <div className='myPosts'>
                    {postComments.map(
                        comment => {
                            return (
                                <div className='myPostCard' key={comment.id}>
                                    <PostCard
                                        nickname={comment.user?.nickname}
                                        comment={comment.comment}
                                        url={comment.url}
                                        createdAt={"Creado:" + comment.createdAt}
                                    />
                                </div>

                            )
                        }
                    ).reverse()
                    }
                </div>

            ) : (<div>Aun no hay ningún comentario en este post</div>
            )}
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