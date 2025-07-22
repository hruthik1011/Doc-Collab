import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { MdOutlineWifiPassword } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../Helper';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then(res => res.json()).then(data => {
      if(data.success === true){
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        setError(data.message);
      }
    })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={login}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="inputCon">
            <div className="inputBox">
              <MdEmail />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inputCon">
            <div className="inputBox">
              <MdOutlineWifiPassword />
              <input 
                type="password" 
                placeholder="Password" 
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btnBlue w-full">Login</button>
          <div className="mt-4 text-center">
            <Link to="/signUp" className="text-blue-500">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
