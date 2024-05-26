
// eslint-disable-next-line react/prop-types
export const UserCard = ({key, nickname, favSubgenre, preference,  turntable, email, role, createdAt}) => {

    return(
        <div className="postCardDesign" key={key}>
            <div>{nickname}</div>
            <div>{favSubgenre}</div>
            <div>{preference}</div>
            <div>{turntable}</div>
            <div>{email}</div>
            <div>{role}</div>
            <div>{createdAt}</div>
        </div>
    )
}