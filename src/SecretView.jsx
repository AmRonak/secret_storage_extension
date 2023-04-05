import { Button } from "@mui/material";
import { encryption } from "./generateEncryption";

const SecretView = ({ secret, password, onLogout, onUpdateSecret }) => {
  const handleRegenerateSecret = () => {
    const newSecret = encryption.generateSecret();
    const encryptedSecret = encryption.encrypt(newSecret, password);
    onUpdateSecret(encryptedSecret, newSecret);
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
      <Button variant="contained" onClick={onLogout} style={{margin: '1rem'}}>
        Logout
      </Button>
    </div>
  );
};

export default SecretView;