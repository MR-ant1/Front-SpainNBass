
import "./LatestDetail.css";
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/postDetailSlice";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from "../../common/PostCard/PostCard";
import { useState } from "react";

export const LatestDetail = () => {

    const detailRdx = useSelector(detailData);

    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const [latest, setLatest] = useState({
        id: detailRdx?.detail?.id,
        title: detailRdx?.detail?.title,
        description: detailRdx?.detail?.description,
        topic: detailRdx?.detail?.topic,
        picUrl: detailRdx?.detail?.picUrl,
        createdAt: detailRdx?.detail?.createdAt,
        updatedAt: detailRdx?.detail?.updatedAt
    })

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
                <PostCard
                    title={latest.title}
                    description={latest.description}
                    picUrl = {latest.picUrl}
                />
            </div>

        </div>
    )
}