import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { encryption } from "./generateEncryption";

const InitializeForm = ({ onInitialization }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret] = useState(encryption.generateSecret());

  const handleInitialization = () => {
    if (password === confirmPassword) {
      const encryptedSecret = encryption.encrypt(secret, password);
      onInitialization(encryptedSecret);
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