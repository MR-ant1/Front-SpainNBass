
import { Route, Routes } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { MyPostDetail } from '../DetailMyPost/DetailMyPost';
import { LatestDetail } from '../LatestDetail/LatestDetail';
import { Community } from '../Community/Community';
import { PostDetail } from '../DetailPost/DetailPost';
import { SuperAdmin } from '../SuperAdmin/SuperAdmin';


export const Body = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/detailMyPost' element={<MyPostDetail />} />
            <Route path='/detailPost' element={<PostDetail />} />
            <Route path='/latestDetail' element={<LatestDetail />} />
            <Route path='/community' element={<Community />} />
            <Route path='/superadmin' element={<SuperAdmin />} />

        </Routes>
    )
}