
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
// import { Heart } from "lucide-react";
import { GetCommentsCall,  LikeCall,  PostLikesCall, newCommentCall } from "../../services/api.Calls";
import { toast } from "react-toastify";
import { CInput } from "../../common/CInput/CInput";
import { Heart } from "lucide-react";


export const PostDetail = () => {

    const detailRdx = useSelector(detailData);

    const reduxUser = useSelector(userData)

    const navigate = useNavigate();

    const [loadedComments, setLoadedComments] = useState(false)

    const [postComments, setPostComments] = useState([])

    const [newComment, setNewComment] = useState({
        comment: "",
        url: ""
    })

    const [newCommentError, setNewCommentError] = useState({
        commentError: "",
        urlError: ""
    })

    const [countDone, setCountDone] = useState(false)

    const [likeCount, setLikeCount] = useState([])

    const [write, setWrite] = useState("disabled")

    const [isLikedBefore, setIsLikedBefore] = useState()

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

                setLikeCount(fetched.data)
                setCountDone(true)

            } catch (error) {
                console.log(error.message)
            }
        }
        if (countDone === false) {
            likesCount()
        }
    }, [likeCount])

    useEffect(() => {
        if (!reduxUser?.tokenData?.token) {
            navigate("/")
        }
    }, [reduxUser])

      useEffect(() => {
        toast.dismiss()
        newComment.commentError && 
        toast.warn(newComment.commentError)
        newComment.urlError && 
        toast.warn(newComment.urlError)
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

            setPostComments(fetched.data)
            setLoadedComments(true)
        } catch (error) {
            console.log(error)
        }
    }
    if (loadedComments=== false) {
        bringComments()
    }
    },[postComments])

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
            if (newComment.comment.length=== 0){
                throw new Error("Tu comentario debe tener texto"),
                    toast.error("Comentario es obligatorio")
            }
                if (fetched.success === true && fetched.data && fetched.data.id) {
                    setPostComments([...postComments, fetched.data])
                    setWrite("disabled")
                    setNewComment({
                        comment: "",
                        url: ""
                    })
                }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="detailDesign">
            <div className="undoButton">
                <CButton
                    className={"backButton"}
                    title={"X"}
                    emitFunction={(() => navigate(reduxUser.tokenData.role === "super_admin" ? "/superadmin" : '/community'))}

                />
            </div>
            <div className='myPostCard' key={detailRdx.detail?.id}>
                <PostCard
                    nickname={detailRdx.detail?.owner.nickname}
                    title={detailRdx.detail?.title}
                    description={detailRdx?.detail?.description}
                    picUrl={detailRdx?.detail?.picUrl}
                    createdAt={"Creado:" + detailRdx?.detail?.owner.createdAt}
                    updatedAt={"Actualizado:" + detailRdx?.detail?.owner.updatedAt}
                />
            </div>
            <div className="likeRow">
                <CButton
                    className={"likeButton"}
                    title={<Heart fill={isLikedBefore === true ? "red"
                        : "white"} />}
                    emitFunction={() => likePost((post.id))}
                />
                <div className="likesNum">{likeCount.length}</div>
            </div>
    
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
                        title={write === "" ? "Actualizar" : "Habilitar"}
                        emitFunction={write === "" ? createComment : () => setWrite("")}
                    />

            {postComments.length > 0  ? (
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
                                        updatedAt={comment.updatedAt === comment.createdAt
                                            ? ""
                                            : "Edit:" + comment.updatedAt}
                                    />
                                </div>

                            )
                        }
                    ).reverse()
                    }
                </div>

            ) : (<div>Aun no hay ningún comentario en este post</div>
            )}
        </div>
    )
}