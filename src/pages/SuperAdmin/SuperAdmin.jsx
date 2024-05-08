
import "./SuperAdmin.css"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from 'react-router-dom'
import { UserCard } from "../../common/UserCard/UserCard"
import { deleteUserCall, getAllUsersCall } from "../../services/api.Calls"
import { CButton } from "../../common/CButton/CButton"

export const SuperAdmin = () => {

    const reduxUser = useSelector(userData)

    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [loadedData, setLoadedData] = useState(false)

    // const [deleteMsgError, setDeleteMsgError] = useState("")

    useEffect(() => {
        if (reduxUser?.tokenData?.user?.role !== "super_admin") {
            navigate("/")
        }
    }, [reduxUser])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetched = await getAllUsersCall(reduxUser.tokenData.token)

                setUsers(fetched.data)

                setLoadedData(true)

            } catch (error) {
                console.log(error)
            }
        }
        if (loadedData === false) {
            getUsers()
        }
    }, [users])

    const deleteUser = async (id) => {
        try {
            const fetched = await deleteUserCall(id, reduxUser.tokenData.token, reduxUser.tokenData)
            if(fetched.success === true) {
                setUsers(users.filter((user) => user.id !== id))
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="adminDesign">
                    {loadedData === true ? (
                        <div className="userCards">
                            <div className="usersColumnTitle">USERS</div>
                            {users.slice(0, users.length).map(
                                user => {
                                    return (
                                        <div className="userContainer" key={user.id}>
                                            <UserCard
                                                nickname={user.nickname}
                                                favSubgenre={user.favSubgenre}
                                                preference={user.preference}
                                                turntable={user.turntable}
                                                email={user.email}
                                                createdAt={user.createdAt}
                                            />
                                             <div className='deleteButton'>
                    <CButton key={user.id}
                        className={"deleteMyPostButton"}
                        title={"Eliminar"}
                        emitFunction={(() => deleteUser(user.id))}
                    />
                </div>
                                        </div>
                                    )
                                })}
                        </div>
                    ) : (
                        <div className="loadingUsers">LOADING</div>
                    )}
        </div>
    )
}