import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { SUCCESS } from '../../helpers/api/status';
import responseMessReducer from '../../redux/Reducers/ResponseMess.reducer';
import loginServices from './login.services';

function LoginAdapter() {
  const history = useHistory();
  const [autoLogin, setAutoLogin] = useState<boolean>(true);
  const [userName, setUserName] = useState<boolean>(true);
  const [password, setPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    const response = await loginServices.getInstance().getTokenByPassWord(userName, password);
    if (response && response.status === SUCCESS) {
      setLoginError(false);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token)
      history.push("/");
    } else {
      setLoginError(true);
    }
    setLoading(false);
  }

  const handleChangeUserName = (e: any) => {
    const userName = e.target.value;
    setUserName(userName);
  }

  const handleChangePassWord = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  }

  return {
    autoLogin, setAutoLogin,
    handleChangeUserName, handleChangePassWord,
    userName, password,
    login, loginError,
    loading
  };
}

export default LoginAdapter;
