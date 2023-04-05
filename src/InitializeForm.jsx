import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { encryption } from "./generateEncryption";
import { setEncryptedSecret, setInitialized } from "./slices/userSlice";
import { useDispatch } from "react-redux";

const InitializeForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret] = useState(encryption.generateSecret());
  const dispatch = useDispatch();

  const handleInitialization = () => {
    if (password === confirmPassword) {
      const encryptedSecret = encryption.encrypt(secret, password);
      dispatch(setEncryptedSecret(encryptedSecret));
      dispatch(setInitialized(true));
      localStorage.setItem('isInitialized', true);
      localStorage.setItem('encryptedSecret', encryptedSecret);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div style={{
      padding: '3rem',
      minWidth: '200px',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div>
        <h2>Your secret:</h2>
        <pre>{secret}</pre>
      </div>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{marginTop: '1rem'}}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{marginTop: '1rem'}}
      />
      <Button variant="contained" onClick={handleInitialization} style={{marginTop: '1rem'}}>
        Initialize
      </Button>
    </div>
  );
};

export default InitializeForm;