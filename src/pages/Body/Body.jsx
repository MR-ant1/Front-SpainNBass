
import { Route, Routes} from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';

export const Body = () => {

    return (
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/register' element = {<Register />} />
            
        </Routes>
    )
}