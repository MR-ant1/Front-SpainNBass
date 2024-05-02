
import "./LogoNavigator.css"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const LogoNavigator = ({path, title}) => {

    const navigate = useNavigate()

    return (
        <div className="iconNavigatorDesign" onClick={()=>navigate(path)}>{title}</div>
    )
}