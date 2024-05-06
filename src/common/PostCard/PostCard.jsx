
import "./PostCard.css"

// eslint-disable-next-line react/prop-types
export const PostCard = ({id, title, description, nickname, picUrl, updatedAt, createdAt, clickFunction}) => {

    return(
        <div className="postCardDesign" onClick={clickFunction} key={id}>
            <div>{nickname}</div>
            <div>{title}</div>
            <div>{description}</div>
            <div>{picUrl}</div>
            <div>{createdAt}</div>
            <div>{updatedAt}</div>
        </div>
    )
}