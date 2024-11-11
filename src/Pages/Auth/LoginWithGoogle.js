import React from "react";
import { loginWithGoogle } from "../authService";

function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      alert("Google sign-in successful!");
    } catch (error) {
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}

export default GoogleSignIn;
