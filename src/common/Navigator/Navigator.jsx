
import "./Navigator.css"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const Navigator = ({ path, title }) => {

    const navigate = useNavigate()

    return (
        <div className="navigatorDesign" onClick={() => navigate(path)}>{title}</div>
    )
}