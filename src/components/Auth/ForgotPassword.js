import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
function ForgotPassword() {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
    } catch (err) {
      console.log("Error Sending Email", err);
      setIsPasswordReset(false);
      setPasswordResetError(err.message);
    }
  }
  return (
    <div>
      <input
        className="input"
        type="email"
        placeholder="Provide your email"
        value={resetPasswordEmail}
        onChange={(event) => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
