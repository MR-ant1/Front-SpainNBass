
import './Header.css'
import { Navigator } from '../Navigator/Navigator'
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/Slices/userSlice";
import { LogoNavigator } from '../LogoNavigator/LogoNavigator';


export const Header = () => {

    const reduxUser = useSelector(userData);

    const dispatch = useDispatch();

    return (
        <div className="headerDesign">
            <div className='titleRow'>
            <div className='webTitle'>
                <LogoNavigator
                path="/"
                title="INICIO"
                />
            </div>
            </div>
            
            {reduxUser.tokenData.token ? (
                reduxUser.tokenData.user.role === 'super_admin' ? (
                    <div className='navigatorDesign'>
                        <Navigator
                            path='/superAdmin' title='super admin' />
                        <Navigator
                            path='/profile' title={reduxUser?.tokenData?.user.nickname} />
                        <div
                            className='logoutDesign'
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            log out
                        </div>
                    </div>
                ) : (

                    <div className='navigatorDesign'>
                        <Navigator
                            path='/profile' title={reduxUser.tokenData.user.nickname} />
                        <div
                            className='logoutDesign'
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            log out
                        </div>
                    </div>
                )
            ) : (
                <div className='navigatorDesign'>
                    <Navigator
                        path="/login"
                        title="Login"
                    />
                    <Navigator
                        path="/register"
                        title="Register"
                    />
                </div>
            )}
        </div>
    )
}