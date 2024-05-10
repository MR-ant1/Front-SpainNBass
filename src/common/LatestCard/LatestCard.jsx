import "./LatestCard.css"

// eslint-disable-next-line react/prop-types
export const LatestCard = ({id, title, description, picUrl, updatedAt, createdAt, clickFunction}) => {

    return(
        <div className='latestCardDesign' onClick={clickFunction} key={id}>
            <div className="titleLatestDesign">{title}</div>
            <div className="descriptionLatestDesign">{description}</div>
            <div className="picUrlLatestDesign">{picUrl}</div>
            <div className="createdAtLatestDesign">{createdAt}</div>
            <div className="updatedAtLatestDesign">{updatedAt}</div>
        </div>
    )
}
