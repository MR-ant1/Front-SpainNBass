
import "./DetailMyPost.css";
import { useSelector } from "react-redux";
import { detailData } from "../../app/Slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { userData } from "../../app/Slices/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import { UpdatePostCall, deleteMyPostCall } from "../../services/api.Calls";
import { ToastContainer, toast } from "react-toastify";
import { validate } from "../../utils/validations";
import { Trash, Undo2 } from "lucide-react";

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


    const [postError, setPostError] = useState({
        titleError: "",
        descriptionError: "",
        picUrlError: ""
    })


    const [write, setWrite] = useState("disabled")

    useEffect(() => {
        if (!reduxUser?.tokenData?.token) {
            navigate("/")
        }
    }, [reduxUser])

    useEffect(() => {
        toast.dismiss()
        postError.titleError &&
            toast.warn(postError.titleError)
        postError.descriptionError &&
            toast.warn(postError.descriptionError)
        postError.picUrlError &&
            toast.warn(postError.picUrlError)
    }, [postError])



    const inputHandler = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setPostError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }
    const deleteMyPost = async (id) => {
        try {
            const fetched = await deleteMyPostCall(id, reduxUser.tokenData.token)

            if (fetched.success === true) {
                toast.success(fetched.message)
            } else toast.error(fetched.message)

            if (fetched.success === true) {
                setTimeout(() => {
                    navigate("/profile")
                }, 1000)
            }


        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {

        if (!detailRdx?.detail?.id) {
            navigate("/");
        }
    }, [detailRdx]);

    const UpdatePost = async (postId) => {
        try {

            if (post.description === "") {
                throw new Error("La descripción es obligatoria")
            }

            const fetched = await UpdatePostCall(reduxUser?.tokenData?.token, post, postId)

            if (fetched.message === "Post actualizado correctamente") {
                toast.success(fetched.message)
            } else toast.error(fetched.message)
            setWrite("disabled")

        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        detailRdx?.detail?.id &&
        <div className="detailDesign">
            <div className="detailPostContainerDesign">
                <div className="xButton">
                    <CButton
                        className={"backButton"}
                        title={<Undo2 />}
                        emitFunction={(() => navigate('/detailPost'))}
                    />
                    <div className="mypostInfoMessage"><h1>Edita tu post</h1></div>
                </div>
                <div className="postFieldsDesign">
                    <CInput
                        className={`inputDesign ${postError.titleError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"title"}
                        disabled={write}
                        value={post.title || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />

                    <CInput
                        className={`inputDescriptionHomeDesign ${postError.descriptionError !== "" ? "inputDescriptionHomeDesignError" : ""
                            }`}
                        type={"text"}
                        name={"description"}
                        disabled={write}
                        value={post.description || ""}
                        changeFunction={inputHandler}
                        blurFunction={checkError}
                    />
                    <div className="inputsNButtonsContainer">
                        <div className="prueba">
                            <CInput
                                className={"inputDesign"}
                                type={"text"}
                                name={"picUrl"}
                                disabled={write}
                                value={post.picUrl || ""}
                                changeFunction={inputHandler}
                                blurFunction={checkError}
                            />
                            <CInput
                                className={"inputDesign"}
                                type={"text"}
                                name={"ownerNickname"}
                                disabled={true}
                                value={post.ownerNickname}
                            />
                            <CInput
                                className={"inputDesign"}
                                type={"text"}
                                name={"createdAt"}
                                disabled={true}
                                value={"Fecha de creación:" + post.createdAt}
                            />
                        </div>
                        <div className="buttonsMyPostContainer">
                            <div className='deleteMyPostContainerDesign'>
                                <CButton key={post.id}
                                    className={"deleteMyPostButton"}
                                    title={<Trash />}
                                    emitFunction={(() => deleteMyPost(post.id))}
                                />
                            </div>
                            <CButton
                                className={write === "" ? " updateButton" : "allowButton"}
                                title={write === "" ? "Actualizar" : "Habilitar"}
                                emitFunction={write === "" ? () => UpdatePost(post.id) : () => setWrite("")}
                            />
                        </div>
                    </div>
                </div>
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