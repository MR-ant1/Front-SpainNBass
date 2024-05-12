
import "./LatestDetail.css";
import { useSelector } from "react-redux";
import { detailData } from "../../app/Slices/postDetailSlice";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import 'react-toastify/dist/ReactToastify.css';
import { PostCard } from "../../common/PostCard/PostCard";
import { useState } from "react";
import { Undo2 } from "lucide-react";

export const LatestDetail = () => {

    const detailRdx = useSelector(detailData);

    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const [latest, setLatest] = useState({
        id: detailRdx?.detail?.id,
        title: detailRdx?.detail?.title,
        description: detailRdx?.detail?.description,
        picUrl: detailRdx?.detail?.picUrl,
        createdAt: detailRdx?.detail?.createdAt
    })

    return (
        detailRdx?.detail?.id &&
        <div className="detailLatestDesign">
            <div className="detailLatestContainer">
                <div className="xButton">
                    <CButton
                        className={"backButton"}
                        title={<Undo2 />}
                        emitFunction={(() => navigate('/'))}
                    />
                </div>
                <div className="postFieldsDesign">
                    <PostCard
                        title={latest.title}
                        description={latest.description}
                        picUrl={latest.picUrl}
                    />
                </div>
            </div>
        </div>
    )
}