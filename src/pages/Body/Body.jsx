
import { Route, Routes} from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { PostDetail } from '../DetailPost/DetailPost';
import { LatestDetail } from '../LatestDetail/LatestDetail';
import { Community } from '../Community/Community';


export const Body = () => {

    return (
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/profile' element = {<Profile />} />
            <Route path='/detailPost' element = {<PostDetail />} />
            <Route path='/latestDetail' element = {<LatestDetail />} />
            <Route path='/community' element = {<Community />} />

        </Routes>
    )
}