
import './Header.css'
import { Navigator } from '../Navigator/Navigator'
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { LogoNavigator } from '../LogoNavigator/LogoNavigator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateCategory } from '../../app/slices/communitySlice';
import {  LogIn, PowerOff } from 'lucide-react';

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
            setCommunity({election:""})
    }
    return (
        <div className="headerDesign">
                <LogoNavigator
                path="/"
                title={<img src='img/LogoSNB.png' alt="Logo"></img>}
                />
                {reduxUser.tokenData.token &&
            <div className='dropDownContainer'>
            <select
                        className={"dropDownDesign"}
                        type={"text"}
                        name={"election"}
                        value={community.election || ""}
                        onChange={navigateCommunity}
                    >
                        <option className='defaultChoice' value="">Comunidad</option>
                        <option className='clubChoice' value="Club dnb">Club dnb</option>
                        <option className='raggaChoice' value="RaggaJungle">RaggaJungle</option>
                        <option className='rollersChoice' value="Rollers">Rollers</option>
                        <option className='liquidChoice' value="Liquid dnb">Liquid dnb</option>
                        <option className='jumpChoice' value="Jump Up">Jump Up</option>
                        <option className='nueroChoice' value="NeuroFunk">NeuroFunk</option>
                        <option className='memesChoice' value="memes">Memes</option>
                    </select>
                    </div>
                    }
            {reduxUser?.tokenData?.token ? (
                reduxUser.tokenData.user.role === 'super_admin' ? (
                    <div className='navigatorDesignSuper'>
                        <div className='profileSuperContainer'>
                        <div className='superAdminButton'>
                        <Navigator
                            path='/superAdmin' title='super admin' />
                        </div>
                        <div className='homeProfileButton'>
                        <Navigator
                            path='/profile' title={reduxUser?.tokenData?.user.nickname} />
                        </div>
                        </div>
                        <div 
                            
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            <PowerOff />
                        </div>
                    </div>
                ) : (

                    <div className='navigatorUserDesign'>
                        <Navigator
                            path='/profile' title={reduxUser.tokenData.user.nickname} />
                        <div
                            className='logoutSuperDesign'
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            <PowerOff />
                        </div>
                    </div>
                )
            ) : (
                <div className='navigatorForeignDesign'>
                    <div className='loginForeignDesign'>
                    <Navigator
                        path="/login"
                        title={<LogIn />}
                    />
                    </div>
                    <div className='registerForeignDesign'>
                    <Navigator
                        path="/register"
                        title="Crear Cuenta"
                    />
                    </div>
                </div>
            )}
        </div>
    )
}
