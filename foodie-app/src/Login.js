import { useState } from "react";
import "./Login.css";

const Login = ({ users, setUsers }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    const user = (users || []).find((u) => u.email === email && u.password === password);

    if (user) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSignup = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (!email.endsWith("@gmail.com")) {
      setError("Please enter a valid Gmail address (e.g., example@gmail.com)");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    // Add new user
    setUsers([...users, { fullName, email, password }]);
    setIsSignup(false);
    setError("");
    alert("Signup successful! Please login.");
  };
  

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Welcome to Foodies<br></br> World </h1>
      </div>
      <div className="right-panel">
        {isAuthenticated ? (
          <h2>You are Logged in ..!</h2>
        ) : (
          <div className="form-container">
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button onClick={isSignup ? handleSignup : handleLogin}>
              {isSignup ? "Sign Up" : "Login"}
            </button>
            <p>
              {isSignup ? "Already have an account? " : "New user? "}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login here" : "Sign up"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
