import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { encryption } from "./generateEncryption";

const LoginForm = ({ encryptedSecret, onLoginSuccess }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const secret = encryption.decrypt(encryptedSecret, password);
    if (secret) {
      onLoginSuccess(secret, password);
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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