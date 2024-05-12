
import "./SuperAdmin.css"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { userData } from "../../app/Slices/userSlice"
import { useNavigate } from 'react-router-dom'
import { UserCard } from "../../common/UserCard/UserCard"
import { deleteUserCall, getAllUsersCall } from "../../services/api.Calls"
import { CButton } from "../../common/CButton/CButton"
import { ToastContainer, toast } from "react-toastify"
import { Trash } from "lucide-react"

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
            const fetched = await deleteUserCall(reduxUser?.tokenData?.token, id)

            if (fetched.message === "Este usuario ha sido borrado correctamente") {
                setUsers(users.filter((user) => user.id !== id))
                toast.success(fetched.message)
            } else toast.error(fetched.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;
    const currentUsers = users.slice(firstUserIndex, lastUserIndex);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="adminDesign">
            {loadedData === true ? (
                <div className="userCards">
                    <div className="usersColumnTitle"><h2>USUARIOS</h2></div>
                    {currentUsers.map(
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
                                    <CButton key={user.id}
                                        className={"deleteMyPostButton"}
                                        title={<Trash />}
                                        emitFunction={(() => deleteUser(user.id))}
                                    />

                                </div>
                            )
                        })}
                </div>
            ) : (
                <div className="loadingUsers">LOADING</div>
            )}
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ul className="paginateContainer">
                {pageNumbers.map((number) => (
                    <div key={number} className="pageContainer">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="pageDesign"
                        >
                            {number}
                        </a>
                    </div>
                ))}
            </ul>
        </div>
    )
}