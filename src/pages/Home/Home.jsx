
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetLatestsCall, newLatestCall } from '../../services/api.Calls';
import { updateDetail } from '../../app/slices/postDetailSlice';
import { CInput } from '../../common/CInput/CInput';
import { ToastContainer, toast } from 'react-toastify';
import { validate } from '../../utils/validations';
import { userData } from '../../app/slices/userSlice';
import { CButton } from '../../common/CButton/CButton';
import { LatestCard } from '../../common/LatestCard/LatestCard';

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
        newLatestError.titleError &&
            toast.warn(newLatestError.titleError)
        newLatestError.descriptionError &&
            toast.warn(newLatestError.descriptionError)
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
    }, [latests])

    const createLatest = async () => {
        try {
            if (!newLatest.title) {
                toast.error("El título debe estar relleno")
            }
            if (!newLatest.description) {
                toast.error("La descripción debe estar rellena")
            }
            const fetched = await newLatestCall(reduxUser?.tokenData?.token, newLatest)

            if (fetched.success === true && fetched.data) {
                toast.success(fetched.message)
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
            
            <div className='viewTitleDesign'>NOTICIAS Y EVENTOS</div>
            {!reduxUser.tokenData.token &&
                <div className='viewSubTitleDesign'>Registrate o inicia sesión para participar en nuestra comunidad en la sección foro</div>}

            {reduxUser?.tokenData?.user?.role === "super_admin" ? (
                <div className='homeSuperDesign'>
                    <div className='inputSuperContainer'>
                        <CInput
                            className={`inputTitleDesign ${newLatestError.titleError !== "" ? "inputTitleDesignError" : ""}`}
                            type={"text"}
                            name={"title"}
                            placeholder={"Titular"}
                            disabled={write}
                            value={newLatest.title || ""}
                            changeFunction={inputHandler}
                            blurFunction={checkError}
                        />
                        <CInput
                            className={`inputDescriptionHomeDesign ${newLatestError.descriptionError !== "" ? "inputDescriptionHomeDesignError" : ""}`}
                            type={"text"}
                            name={"description"}
                            placeholder={"Información detallada"}
                            disabled={write}
                            value={newLatest.description || ""}
                            changeFunction={inputHandler}
                            blurFunction={checkError}
                        />
                        <CInput
                            className={"inputDesign"}
                            type={"text"}
                            name={"picUrl"}
                            placeholder={"url"}
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
                    </div>
                    {loadedData === true ? (
                        <div className="cardsHomeDesign">
                            {latests.slice(0, latests.length).map(
                                latest => {
                                    return (
                                        <div className='cardDivDesign' key={latest.id}>
                                            <LatestCard
                                                title={latest?.title?.length > 20 ? latest.title.substring(0, 20) : latest?.title}
                                                description={latest?.description.length > 20 ? latest?.description.substring(0, 20) + "..." : latest?.description}
                                                clickFunction={() => manageDetail(latest)}
                                            />
                                        </div>
                                    )
                                }).reverse()}
                        </div>
                    ) : (
                        <div className="homeSuperLoadingDesign">CARGANDO</div>
                    )}
                </div>
            ) : (
                <div className='homeUserDesign'>
                    {loadedData === true ? (
                        <div className="cardsHomeDesign">
                            {latests.slice(0, latests.length).map(
                                latest => {
                                    return (
                                        <div className="cardDivDesign" key={latest.id}>
                                            <LatestCard
                                                title={latest.title.length > 20 ? latest.title.substring(0, 20) : latest.title}
                                                description={latest.description.length > 40 ? latest.description.substring(0, 40) + "..." : latest.description}
                                                clickFunction={() => manageDetail(latest)}
                                            />
                                        </div>
                                    )
                                }).reverse()}
                        </div>
                    ) : (
                        <div className="homeLoadingDesign">CARGANDO</div>
                    )}
                </div>
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