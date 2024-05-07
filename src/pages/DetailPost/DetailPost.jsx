
import "./DetailPost.css";
import { useSelector } from "react-redux";
import { detailData, } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
// import { validate } from "../../utils/validations";

import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from "../../common/PostCard/PostCard";
import { CButton } from "../../common/CButton/CButton";
import { Heart } from "lucide-react";
import { GetCommentsCall, LikeCall, PostLikesCall } from "../../services/api.Calls";
import { toast } from "react-toastify";

// import { UpdatePostCall } from "../../services/apiCalls";
// import { useDispatch } from "react-redux";

export const PostDetail = () => {

    const detailRdx = useSelector(detailData);

    const reduxUser = useSelector(userData)

    const navigate = useNavigate();

    const [comments, setComments] = useState([])


    const [countDone, setCountDone] = useState(false)

    const [likeCount, setLikeCount] = useState([])

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

                // if (fetched.message === "Post updated successfully"){
                //   toast.success(fetched.message)
                //   }else toast.error(fetched.message)
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

    //   useEffect(() => {
    //     toast.dismiss()
    //     postError.titleError && 
    //     toast.warn(postError.titleError)
    //     postError.descriptionError && 
    //     toast.warn(postError.descriptionError)
    //     }, [postError])



    // const inputHandler = (e) => {
    //     setPost((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    // const checkError = (e) => {
    //     const error = validate(e.target.name, e.target.value)

    //     setPostError((prevState) => ({
    //         ...prevState,
    //         [e.target.name + "Error"]: error
    //     }))
    // }


    const bringComments = async () => {

        try {
            const fetched = await GetCommentsCall(reduxUser.tokenData.token, post.id)

            setComments(fetched.data)

        } catch (error) {
            console.log(error)
        }
    }
    if (comments.length === 0) {
        bringComments()
    }



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
      
            {comments !== "" ? (
                <div className='myPosts'>
                    {comments.map(
                        comment => {
                            return (
                                <div className='myPostCard' key={comment.id}>
                                    <PostCard
                                        nickname={comment.user.nickname}
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