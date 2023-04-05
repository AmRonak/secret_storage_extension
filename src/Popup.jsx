import { useState } from "react";
import InitializeForm from "./InitializeForm";
import LoginForm from "./LoginForm";
import SecretView from "./SecretView";
import { Button } from "@mui/material";

const Popup = () => {
  const isInitialized = localStorage.getItem('isInitialized');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userSecret = localStorage.getItem('secret');
  const userEncryptedSecret = localStorage.getItem('encryptedSecret');
  const userPassword = localStorage.getItem('password');

  const [initialized, setInitialized] = useState(isInitialized);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [encryptedSecret, setEncryptedSecret] = useState(userEncryptedSecret);
  const [secret, setSecret] = useState(userSecret);
  const [password, setPassword] = useState(userPassword);

  const handleInitialization = (newEncryptedSecret) => {
    setEncryptedSecret(newEncryptedSecret);
    setInitialized(true);
    localStorage.setItem('isInitialized', true);
    localStorage.setItem('encryptedSecret', newEncryptedSecret);
  };

  const handleLoginSuccess = (secret, password) => {
    setSecret(secret);
    setPassword(password);
    setLoggedIn(true);
    localStorage.setItem('password', password);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('secret', secret);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setSecret(null);
    setPassword(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('secret');
    localStorage.removeItem('password');
  };

  const handleUpdateSecret = (newEncryptedSecret, newSecret) => {
    setEncryptedSecret(newEncryptedSecret);
    setSecret(newSecret);
    localStorage.setItem('encryptedSecret', newEncryptedSecret);
    localStorage.setItem('secret', newSecret);
  };

  const handleReset = () => {
    setInitialized(false);
    setEncryptedSecret(null);
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
        <InitializeForm onInitialization={handleInitialization} />
      ) : !loggedIn ? (
        <LoginForm
          encryptedSecret={encryptedSecret}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <SecretView
          secret={secret}
          password={password}
          onLogout={handleLogout}
          onUpdateSecret={handleUpdateSecret}
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