import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { encryption } from "./generateEncryption";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setPassword, setSecret } from "./slices/userSlice";

const LoginForm = ({ onLoginSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const { encryptedSecret } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogin = () => {
    const secret = encryption.decrypt(encryptedSecret, inputValue);
    if (secret) {
      dispatch(setSecret(secret));
      dispatch(setPassword(inputValue));
      dispatch(setLoggedIn(true));
      localStorage.setItem('password', inputValue);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('secret', secret);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1 style={{color:'#1976D2'}}>Please Sign In</h1>
      <div>
        <TextField
          label="Password"
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{marginTop: '1rem'}}
        />
        <Button variant="contained" onClick={handleLogin} style={{marginTop: '1rem', marginLeft: '1rem'}}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;