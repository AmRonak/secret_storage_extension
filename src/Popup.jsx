import InitializeForm from "./InitializeForm";
import {useEffect} from 'react';
import LoginForm from "./LoginForm";
import SecretView from "./SecretView";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEncryptedSecret, setInitialized, setLoggedIn, setPassword, setSecret } from "./slices/userSlice";

const Popup = () => {
  const isInitialized = localStorage.getItem('isInitialized');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userSecret = localStorage.getItem('secret');
  const userEncryptedSecret = localStorage.getItem('encryptedSecret');
  const userPassword = localStorage.getItem('password');

  const { initialized, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setEncryptedSecret(userEncryptedSecret));
    dispatch(setInitialized(isInitialized));
    dispatch(setSecret(userSecret));
    dispatch(setPassword(userPassword));
    dispatch(setLoggedIn(isLoggedIn));
   }, [dispatch, isInitialized, isLoggedIn, userEncryptedSecret, userPassword, userSecret]);

  const handleReset = () => {
    dispatch(setInitialized(false));
    dispatch(setEncryptedSecret(null));
    localStorage.removeItem('isInitialized', false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('secret');
    localStorage.removeItem('password');
    localStorage.removeItem('encryptedSecret');
  };

  return (
    <div 
      style={{
        padding: '3rem',
        minWidth: '200px',
        minHeight: '400px',
      }}
    >
      {!initialized ? (
        <InitializeForm />
      ) : !loggedIn ? (
        <LoginForm />
      ) : (
        <SecretView
          style={{marginTop: '1rem'}}
        />
      )}
      {initialized && !loggedIn && (
        <Button variant="contained" onClick={handleReset} style={{marginTop: '1rem'}}>
          Reset Extension
        </Button>
      )}
    </div>
  );
};

export default Popup;