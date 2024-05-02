
import { Route, Routes} from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';

export const Body = () => {

    return (
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/login' element = {<Login />} />
            <Route path='/register' element = {<Register />} />

        </Routes>
    )
}