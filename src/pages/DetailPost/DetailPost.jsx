
import "./DetailPost.css";
import { useSelector } from "react-redux";
import { detailData,  } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
// import { validate } from "../../utils/validations";

import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from "../../common/PostCard/PostCard";
import { CButton } from "../../common/CButton/CButton";
import { Heart } from "lucide-react";
import { LikeCall } from "../../services/api.Calls";

// import { UpdatePostCall } from "../../services/apiCalls";
// import { useDispatch } from "react-redux";

export const PostDetail = () => {

    const detailRdx = useSelector(detailData);

    const reduxUser = useSelector(userData)

    const navigate = useNavigate();

    // const dispatch = useDispatch();

    const [isLikedBefore, setIsLikedBefore] = useState()

    //   const dispatch = useDispatch();

    //   const [isLikedBefore, setIsLikedBefore] = useState(detailRdx.detail?.likes.includes(reduxUser.tokenData.userId))

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
console.log(post.id)

    // const [postError, setPostError] = useState({
    //     titleError: "",
    //     descriptionError: "",
    //     picUrlError: ""
    // })

    // eslint-disable-next-line no-unused-vars
    const [write, setWrite] = useState("disabled")

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

    //   useEffect(() => {

    //     if (!detailRdx?.detail?.id) {
    //       navigate("/");
    //     }
    //   }, [detailRdx]);

    //   const UpdatePost = async (postId) => {
    //     try {
    //         for (let elemento in post) {
    //             if (post[elemento] === "") {
    //                 throw new Error("All fields are required")
    //             }
    //         }

    //         const fetched = await UpdatePostCall(reduxUser?.tokenData?.token, post, postId)

    //         if (fetched.message === "Post updated successfully"){
    //           toast.success(fetched.message)
    //           }else toast.error(fetched.message)


    //         setWrite("disabled")



    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const likePost = async (id) => {

        try {
            const fetched = await LikeCall(reduxUser.tokenData.token, id)
  
            if(fetched.message ==="Like"){
              setIsLikedBefore(true)
            }else setIsLikedBefore(false)
  
            // dispatch(updateDetail({detail: fetched.data}))
  
          //   if (fetched.message === "Like") {
          //       toast.success(fetched.message)
  
          //   } else toast.info(fetched.message)
  
            if (fetched.data && fetched.data.id) {
                setPost(post?.map(post => post.id === id ? fetched.data
                 : detailRdx.detail))}
  
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
      title={<Heart fill={isLikedBefore===true ? "red"
        : "white"}/>}
      emitFunction={() => likePost(parseInt(post.id))}
      />
      {/* <div className="likesNum">{detailRdx.detail?.likes.length}</div> */}
      </div>
                                </div>
    )
}