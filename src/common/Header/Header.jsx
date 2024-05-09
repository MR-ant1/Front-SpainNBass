
import './Header.css'
import { Navigator } from '../Navigator/Navigator'
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { LogoNavigator } from '../LogoNavigator/LogoNavigator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateCategory } from '../../app/slices/communitySlice';


export const Header = () => {

    const navigate = useNavigate()

    const [community, setCommunity] = useState({
        election: ""
    })

    const reduxUser = useSelector(userData);

    const dispatch = useDispatch();

    const navigateCommunity = (e) => {
        
        setCommunity((prevState) => ({
            ...prevState,
            election: e.target.value
        }))
            if(e.target.value !== ""){
            dispatch(navigateCategory({ category: e.target.value }))
            navigate('/community')}
    }
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
            
            {reduxUser?.tokenData?.token ? (
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
                        <select
                        className={"inputDesign"}
                        type={"text"}
                        name={"election"}
                        value={community.election || ""}
                        onChange={navigateCommunity}
                    >
                        
                        <option value="">Community</option>
                        <option value="Club dnb">Club dnb</option>
                        <option value="RaggaJungle">RaggaJungle</option>
                        <option value="Rollers">Rollers</option>
                        <option value="Liquid dnb">Liquid dnb</option>
                        <option value="Jump Up">Jump Up</option>
                        <option value="NeuroFunk">NeuroFunk</option>
                        <option value="memes">Memes</option>
                    </select>
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
                        
                        <select
                        className={"inputDesign"}
                        type={"text"}
                        name={"election"}
                        value={community.election || ""}
                        onChange={navigateCommunity}
                    >
                        
                        <option value="">COMMUNITY</option>
                        <option value="Club dnb">Club dnb</option>
                        <option value="RaggaJungle">RaggaJungle</option>
                        <option value="Rollers">Rollers</option>
                        <option value="Liquid dnb">Liquid dnb</option>
                        <option value="Jump Up">Jump Up</option>
                        <option value="NeuroFunk">NeuroFunk</option>
                        <option value="memes">Memes</option>
                    </select>
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
                    <select
                        className={"inputDesign"}
                        type={"text"}
                        name={"election"}
                        value={community.election || ""}
                        onChange={navigateCommunity}
                    >
                        <option value="">COMMUNITY</option>
                        <option value="Club dnb">Club dnb</option>
                        <option value="RaggaJungle">RaggaJungle</option>
                        <option value="Rollers">Rollers</option>
                        <option value="Liquid dnb">Liquid dnb</option>
                        <option value="Jump Up">Jump Up</option>
                        <option value="NeuroFunk">NeuroFunk</option>
                        <option value="memes">Memes</option>
                    </select>
                </div>
            )}
        </div>
    )
}
