
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Access } from '../Login/Login';
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
            <Route path='/access' element={<Access />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/detailMyPost' element={<MyPostDetail />} />
            <Route path='/detailPost' element={<PostDetail />} />
            <Route path='/latestDetail' element={<LatestDetail />} />
            <Route path='/community' element={<Community />} />
            <Route path='/superadmin' element={<SuperAdmin />} />

        </Routes>
    )
}