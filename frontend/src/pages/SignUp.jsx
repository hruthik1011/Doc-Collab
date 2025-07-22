import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from '../Helper';

const SignUp = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          if(data.success === false){
            setError(data.message)
          }
          else{
            navigate("/login");
          }
      });
  };
  
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Doc Collab</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
          
          <form onSubmit={createUser}>
            <div className="inputCon">
              <p className="text-[14px] text-[#808080] mb-2">Username</p>
              <div className="inputBox w-full">
                <i>
                  <FaUser />
                </i>
                <input
                  onChange={(e)=>{setUsername(e.target.value)}} 
                  value={username}
                  type="text"
                  placeholder="Enter username"
                  id="username"
                  name="username"
                  required
                />
              </div>
            </div>

            <div className="inputCon">
              <p className="text-[14px] text-[#808080] mb-2">Name</p>
              <div className="inputBox w-full">
                <i>
                  <FaUser />
                </i>
                <input
                  onChange={(e)=>{setName(e.target.value)}} 
                  value={name}
                  type="text"
                  placeholder="Enter your full name"
                  id="Name"
                  name="Name"
                  required
                />
              </div>
            </div>

            <div className="inputCon">
              <p className="text-[14px] text-[#808080] mb-2">Email</p>
              <div className="inputBox w-full">
                <i>
                  <FaUser />
                </i>
                <input
                  onChange={(e)=>{setEmail(e.target.value)}} 
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  id="Email"
                  name="Email"
                  required
                />
              </div>
            </div>

            <div className="inputCon">
              <p className="text-[14px] text-[#808080] mb-2">Password</p>
              <div className="inputBox w-full">
                <i>
                  <FaUser />
                </i>
                <input
                  onChange={(e)=>{setPwd(e.target.value)}} 
                  value={pwd}
                  type="password"
                  placeholder="Enter password"
                  id="Password"
                  name="Password"
                  required
                />
                <i className="cursor-pointer !mr-3 !text-[25px]">
                  
                </i>
              </div>
            </div>

            {error && <p className='text-red-500 text-[14px] my-3 text-center bg-red-50 p-2 rounded'>{error}</p>}
            
            <p className="text-center mb-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Login
              </Link>
            </p>

            <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
