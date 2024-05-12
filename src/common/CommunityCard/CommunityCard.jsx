
import "./CommunityCard.css"

// eslint-disable-next-line react/prop-types
export const CommunityCard = ({ id, title, nickname, clickFunction }) => {

    return (
        <div className="communityCardDesign" onClick={clickFunction} key={id}>
            <div className="nicknameCommunityCardDesign">{nickname}</div>
            <div className="titleCommunityCardDesign">{title}</div>
        </div>
    )
}
