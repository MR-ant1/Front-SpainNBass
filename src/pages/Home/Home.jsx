
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { userData } from "../../app/slices/userSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetLatestsCall } from '../../services/api.Calls';
import { updateDetail } from '../../app/slices/postDetailSlice';
import { PostCard } from '../../common/PostCard/PostCard';

export const Home = () => {

    const navigate = useNavigate();

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch();

    const [latests, setLatests] = useState([])
    
    const manageDetail = (latest) => {
        dispatch(updateDetail({ detail: latest }));
        navigate("/detailLatest");
    };

    useEffect(() => {
        const latestFeed = async () => {
            try {
                const fetched = await GetLatestsCall()
                setLatests(fetched.data)
   

            } catch (error) {
                console.log(error)
            }
        }
        if (latests.length === 0) {
            latestFeed()
        }
    }, [latests])

    return (
        <div className="homeDesign">
        {latests.length > 0 ? (
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
                                    )}).reverse()}
            </div>
        ): (
            <div className="homeDesign">CARGANDO</div>
        )}
        </div>
    )
}