
import "./PostCard.css"

// eslint-disable-next-line react/prop-types
export const PostCard = ({ id, title, description, nickname, comment, picUrl, url, updatedAt, createdAt, clickFunction }) => {

    return (
        <div className="postCardDesign" onClick={clickFunction} key={id}>
            <div className="nicknamePostCardDesign">{nickname}</div>
            <div>{comment}</div>
            <div>{url}</div>
            <div className="titlePostCardDesign">{title}</div>
            <div className="descriptionPostCardDesign">{description}</div>
            <div className="picUrlPostCardDesign">{picUrl}</div>
            <div className="createdAtPostCardDesign">{createdAt}</div>
            <div className="updatedAtPostCardDesign">{updatedAt}</div>
        </div>
    )
}
