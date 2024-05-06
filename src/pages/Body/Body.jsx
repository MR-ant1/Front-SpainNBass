
import { Route, Routes} from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { PostDetail } from '../PostDetail/PostDetail';
import { LatestDetail } from '../LatestDetail/LatestDetail';


export const Body = () => {

    return (
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/profile' element = {<Profile />} />
            <Route path='/postDetail' element = {<PostDetail />} />
            <Route path='/latestDetail' element = {<LatestDetail />} />

        </Routes>
    )
}