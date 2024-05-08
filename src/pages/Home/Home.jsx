
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetLatestsCall, newLatestCall } from '../../services/api.Calls';
import { updateDetail } from '../../app/slices/postDetailSlice';
import { PostCard } from '../../common/PostCard/PostCard';
import { CInput } from '../../common/CInput/CInput';
import { toast } from 'react-toastify';
import { validate } from '../../utils/validations';
import { userData } from '../../app/slices/userSlice';
import { CButton } from '../../common/CButton/CButton';

export const Home = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const reduxUser = useSelector(userData)

    const [loadedData, setLoadedData] = useState(false)

    const [latests, setLatests] = useState([])

    const manageDetail = (latest) => {
        dispatch(updateDetail({ detail: latest }));
        navigate("/latestDetail");
    };

    const [newLatest, setNewLatest] = useState({
        title: "",
        description: "",
        picUrl: ""
    })

    const [newLatestError, setNewLatestError] = useState({
        titleError: "",
        descriptionError: "",
        picUrlError: ""
    })

    const [write, setWrite] = useState("disabled")

    useEffect(() => {
        toast.dismiss()
        newLatest.titleError &&
            toast.warn(newLatest.titleError)
        newLatest.descriptionError &&
            toast.warn(newLatest.descriptionError)
        newLatest.picUrlError &&
            toast.warn(newLatest.picUrlError)
    }, [newLatestError])



    const inputHandler = (e) => {
        setNewLatest((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setNewLatestError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    useEffect(() => {
        const latestFeed = async () => {
            try {
                const fetched = await GetLatestsCall()
                console.log(fetched.data)
                setLatests(fetched.data)
                if (fetched.success === true) {
                    setLoadedData(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (loadedData === false) {
            latestFeed()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latests])

    const createLatest = async () => {
        try {
            for (let elemento in newLatest) {
                if (newLatest[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }
            const fetched = await newLatestCall(reduxUser?.tokenData?.token, newLatest)
            
            if (fetched.success === true && fetched.data) {
                setNewLatest({
                    title: "",
                    description: "",
                    picUrl: ""
                })
                setWrite("disabled")
                setLatests("")
                setLoadedData(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="homeDesign">
            {reduxUser?.tokenData?.user?.role === "super_admin" ? (
                <div>
            <CInput
                className={"inputDesign"}
                type={"text"}
                name={"title"}
                disabled={write}
                value={newLatest.title || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />
            <CInput
                className={"inputDesign"}
                type={"text"}
                name={"description"}
                disabled={write}
                value={newLatest.description || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />
            <CInput
                className={"inputDesign"}
                type={"text"}
                name={"picUrl"}
                disabled={write}
                value={newLatest.picUrl || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
            />
            <CButton
                className={write === "" ? " updateButton" : "allowButton"}
                title={write === "" ? "Publicar" : "Nueva Noticia"}
                emitFunction={write === "" ? createLatest : () => setWrite("")}
            />
            
            {loadedData === true ? (
                <div className="cardsDesign">
                    {latests.slice(0, latests.length).map(
                        latest => {
                            return (
                                <div className="cardDiv" key={latest.id}>
                                    <PostCard
                                        title={latest?.title?.length > 20 ? latest.title.substring(0, 20) : latest?.title}
                                        description={latest?.description.length > 40 ? latest?.description.substring(0, 40) + "..." : latest?.description}
                                        clickFunction={() => manageDetail(latest)}
                                    />
                                </div>
                            )
                        }).reverse()}
                </div>
            ) : (
                <div className="homeDesign">CARGANDO</div>
            )}
        </div>
        ) : (
            <div>
            {loadedData === true ? (
                <div className="cardsDesign">
                    {latests.slice(0, latests.length).map(
                        latest => {
                            return (
                                <div className="cardDiv" key={latest.id}>
                                    <PostCard
                                        title={latest.title.length > 20 ? latest.title.substring(0, 20) : latest.title}
                                        description={latest.description.length > 40 ? latest.description.substring(0, 40) + "..." : latest.description}
                                        clickFunction={() => manageDetail(latest)}
                                    />
                                </div>
                            )
                        }).reverse()}
                </div>
            ) : (
                <div className="homeDesign">CARGANDO</div>
            )}
        </div>
        )}
        </div>
    )
}