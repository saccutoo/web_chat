import React from 'react';
import LoadingSpinnerScreen from '../../libraries/Features/loading-spinner/loading-spinner.screen';
import { LoginImage, LogoIhcm } from '../../libraries/Icons/icon.screen';
import LoginAdapter from './login.adapter';
import './login.scss';

function LoginScreen() {
    const { 
        autoLogin, setAutoLogin, 
        handleChangeUserName, handleChangePassWord, 
        userName, password, 
        login, loginError,
        loading } = LoginAdapter();

    return (
        <div className="login-container">
            <div className="left-container">
                <LoginImage className="image-login"></LoginImage>
            </div>

            <div className="right-container-wrapper">
                <div className="login-container">
                    <div className="login-wrapper">
                        <div>
                            <LogoIhcm className="logo-ihcm"></LogoIhcm>
                            <div className="line"></div>
                            <h1>Đăng Nhập</h1>
                            <label className="label-input body-semibold" htmlFor="account">Tài khoản</label>
                            <input type="text" name="account" onChange={handleChangeUserName} placeholder="Nhập tài khoản của bạn"></input>
                            <label className="label-input body-semibold" htmlFor="password">Mật khẩu</label>
                            <input type="password" name="password" onChange={handleChangePassWord} placeholder="Nhập mật khẩu"></input>

                            { loginError && (<div className="login-error"><span>Tài khoản hoặc mật khẩu không đúng</span></div>)}
                            <div className="auto-login">
                                <label className="checkbox body-regular">
                                    <input type="checkbox" className="checkbox" checked={autoLogin}/><i></i>
                                    <label className="float-left" onClick={() => {setAutoLogin(!autoLogin)}}>Tự động đăng nhập lần sau</label>
                                </label> 
                            </div>

                            <div className="btn-login">
                                <button className="width-200 body-bold color-neutral-white" onClick={login}>
                                    {!loading && (<span>Đăng nhập</span>)} 
                                    {loading && (<LoadingSpinnerScreen class="loader-small margin-auto"></LoadingSpinnerScreen>)}
                                </button>
                            </div>
                        </div>
                        
                        <a className="forgot-password">Bạn quên mật khẩu?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
