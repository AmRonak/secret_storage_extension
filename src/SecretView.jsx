import { Button } from "@mui/material";
import { encryption } from "./generateEncryption";
import { useDispatch, useSelector } from "react-redux";
import { setEncryptedSecret, setLoggedIn, setPassword, setSecret } from "./slices/userSlice";

const SecretView = () => {
  const { secret, password,  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRegenerateSecret = () => {
    const newSecret = encryption.generateSecret();
    const encryptedSecret = encryption.encrypt(newSecret, password);
    dispatch(setEncryptedSecret(encryptedSecret));
    dispatch(setSecret(newSecret));
    localStorage.setItem('encryptedSecret', encryptedSecret);
    localStorage.setItem('secret', newSecret);
  };
  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    dispatch(setSecret(null));
    dispatch(setPassword(null));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('secret');
    localStorage.removeItem('password');
  };
  
  return (
    <div 
      style={{
        padding: '3rem'
      }}
    >
      <div>
        <h1 style={{color:'#1976D2'}}>You're logged In</h1>
      </div>
      <div>
        <h2>Your secret:</h2>
        <pre>{secret}</pre>
      </div>
      <Button variant="contained" onClick={handleRegenerateSecret} style={{margin: '1rem'}}>
        Regenerate Secret
      </Button>
      <Button variant="contained" onClick={handleLogout} style={{margin: '1rem'}}>
        Logout
      </Button>
    </div>
  );
};

export default SecretView;