
import "./DetailMyPost.css";
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { userData } from "../../app/slices/userSlice";
// import { validate } from "../../utils/validations";
import 'react-toastify/dist/ReactToastify.css';
import { deleteMyPostCall } from "../../services/api.Calls";

// import { UpdatePostCall } from "../../services/apiCalls";
// import { useDispatch } from "react-redux";

export const MyPostDetail = () => {

    const detailRdx = useSelector(detailData);

    const reduxUser = useSelector(userData)

    const navigate = useNavigate();

    const [post, setPost] = useState({
        id: detailRdx?.detail?.id,
        title: detailRdx?.detail?.title,
        description: detailRdx?.detail?.description,
        topic: detailRdx?.detail?.topic,
        picUrl: detailRdx?.detail?.picUrl,
        ownerId: detailRdx?.detail?.owner.id,
        ownerNickname: detailRdx?.detail?.owner.nickname,
        createdAt: detailRdx?.detail?.createdAt
    })


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



    const inputHandler = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // const checkError = (e) => {
    //     const error = validate(e.target.name, e.target.value)

    //     setPostError((prevState) => ({
    //         ...prevState,
    //         [e.target.name + "Error"]: error
    //     }))
    // }
    const deleteMyPost = async (id) => {
        try {
            const fetched = await deleteMyPostCall(id, reduxUser.tokenData.token)

            if(fetched.success === true) {
                navigate('/profile')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

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

    

    return (
        detailRdx?.detail?.id &&
        <div className="detailDesign">
            <div className="undoButton">
                <CButton
                    className={"backButton"}
                    title={"X"}
                    emitFunction={(() => navigate('/profile'))}
                />
            </div>
            <div className="postFields">
                <CInput
                    className={"InputDesign"}
                    type={"text"}
                    name={"title"}
                    disabled={write}
                    value={post.title || ""}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />

                <CInput
                    className={"InputDesign"}
                    type={"text"}
                    name={"description"}
                    disabled={write}
                    value={post.description || ""}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />

                <CInput
                    className={"topicInputDesign"}
                    type={"text"}
                    name={"topic"}
                    disabled={true}
                    value={post.topic}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />

                <CInput
                    className={"InputDesign"}
                    type={"text"}
                    name={"picUrl"}
                    disabled={write}
                    value={post.picUrl || ""}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"ownerNickname"}
                    disabled={write}
                    value={post.ownerNickname}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"createdAt"}
                    disabled={true}
                    value={"Fecha de creación:" + post.createdAt}
                    changeFunction={inputHandler}
                    // blurFunction={checkError}
                />
                <div className='deleteButton'>
                    <CButton key={post.id}
                        className={"deleteMyPostButton"}
                        title={"Eliminar"}
                        emitFunction={(() => deleteMyPost(post.id))}
                    />
                </div>
                <CButton
                    className={write === "" ? " updateButton" : "allowButton"}
                    title={write === "" ? "Actualizar" : <img src="img/EditIcon.png" alt="editIcon"></img>}
                //   emitFunction={write === "" ? () => UpdatePost(post._id) : () => setWrite("")}
                />
            </div>
        </div>
    )
    }