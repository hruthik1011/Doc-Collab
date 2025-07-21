// import React, { useEffect, useState } from 'react'
// import { RiSearchLine } from "react-icons/ri";
// import Avatar from 'react-avatar';
// import { api_base_url } from '../Helper';
// import { useNavigate } from 'react-router-dom';


// const Navbar = () => {

//   const [error, setError] = useState("");
//   const [data, setData] = useState(null);

//   const navigate = useNavigate();

//   const getUser = () => {
//     fetch(api_base_url + "/getUser", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: localStorage.getItem("userId")
//       })
//     }).then(res => res.json()).then(data => {
//       if (data.success == false) {
//         setError(data.message)
//       }
//       else {
//         setData(data.user)
//       }
//     })
//   };

//   const logout = () => {
//     fetch(api_base_url + "/logout", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: localStorage.getItem("userId")
//       })
//     }).then(res => res.json()).then(data => {
//       if (data.success == false) {
//         setError(data.message)
//       }
//       else {
//         localStorage.removeItem("userId");
//         localStorage.removeItem("token");
//         localStorage.removeItem("isLoggedIn");
//         navigate("/login");
//       }
//     })

//   }

//   useEffect(() => {
//     getUser();
//   }, [])


//   return (
//     <>
//       {/* <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">

//         <div className="right flex items-center justify-end gap-2">
//           <div className="inputBox w-[30vw]">
//             <i><RiSearchLine /></i>
//             <input type="text" placeholder='Search Here... !' />
//           </div>

//           <button onClick={logout} className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600'>Logout</button>

//           <Avatar name={data ? data.name : ""} className='cursor-pointer' size="40" round="50%" />
//         </div>
//       </div> */}

//       <div className="navbar flex items-center px-4 md:px-[100px] h-[90px] justify-between bg-white shadow-md border-b border-gray-100">
//   {/* Left Side - Logo */}
//   <div className="left">
//     <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//       <span className="text-blue-600">Doc</span> Collab
//     </h1>
//   </div>

//   {/* Right Side - Search, Logout, Avatar */}
//   <div className="right flex items-center gap-4">
//     {/* Search Box */}
//     <div className="hidden md:flex inputBox w-[300px] lg:w-[400px] bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 rounded-xl">
//       <i className="text-gray-400 ml-4">
//         <RiSearchLine />
//       </i>
//       <input 
//         type="text" 
//         placeholder='Search documents...' 
//         className="bg-transparent border-0 outline-0 px-3 py-3 text-gray-700 placeholder-gray-400 w-full"
//       />
//     </div>

//     {/* Mobile Search Button */}
//     <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors">
//       <RiSearchLine size={24} />
//     </button>

//     {/* User Info & Logout */}
//     <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
//       <Avatar 
//         name={data ? data.name : "User"} 
//         className='cursor-pointer hover:scale-105 transition-transform' 
//         size="38" 
//         round="50%" 
//       />
      
//       {/* User Name - Hidden on mobile */}
//       <div className="hidden lg:block">
//         <p className="text-sm font-semibold text-gray-700">
//           {data ? data.name : "User"}
//         </p>
//         <p className="text-xs text-gray-500">Online</p>
//       </div>

//       {/* Logout Button */}
//       <button 
//         onClick={logout} 
//         className='p-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg border-0 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95'
//       >
//         <span className="hidden sm:inline">Logout</span>
//         <span className="sm:hidden">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//         </span>
//       </button>
//     </div>
//   </div>
// </div>

//     </>
//   )
// }

// export default Navbar


import React, { useEffect, useState } from 'react'
import { RiSearchLine } from "react-icons/ri";
import Avatar from 'react-avatar';
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, searchTerm }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  const getUser = () => {
    fetch(api_base_url + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success == false) {
        setError(data.message)
      }
      else {
        setData(data.user)
      }
    }).catch(err => {
      console.error("Error fetching user:", err);
      setError("Failed to fetch user data");
    })
  };

  const logout = () => {
    fetch(api_base_url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success == false) {
        setError(data.message)
      }
      else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    }).catch(err => {
      // If logout API fails, still clear localStorage and redirect
      console.error("Logout API error:", err);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    })
  }

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div className="navbar flex items-center px-4 md:px-[100px] h-[90px] justify-between bg-white shadow-md border-b border-gray-100">
        {/* Left Side - Logo */}
        <div className="left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-blue-600">Doc</span> Collab
          </h1>
        </div>

        {/* Right Side - Search, Logout, Avatar */}
        <div className="right flex items-center gap-4">
          {/* Desktop Search Box */}
          <div className="hidden md:flex inputBox w-[300px] lg:w-[400px] bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 rounded-xl">
            <i className="text-gray-400 ml-4">
              <RiSearchLine />
            </i>
            <input 
              type="text" 
              placeholder='Search documents...'
              value={searchTerm || ''}
              onChange={handleSearchChange}
              className="bg-transparent border-0 outline-0 px-3 py-3 text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          {/* Mobile Search Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <RiSearchLine size={24} />
          </button>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
            <Avatar 
              name={data ? data.name : "User"} 
              className='cursor-pointer hover:scale-105 transition-transform' 
              size="38" 
              round="50%" 
            />
            
            {/* User Name - Hidden on mobile */}
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-700">
                {data ? data.name : "Loading..."}
              </p>
              <p className="text-xs text-gray-500">Online</p>
            </div>

            {/* Logout Button */}
            <button 
              onClick={logout} 
              className='p-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg border-0 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95'
              title="Logout"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="inputBox w-full bg-gray-50 border-2 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 rounded-xl">
            <i className="text-gray-400 ml-4">
              <RiSearchLine />
            </i>
            <input 
              type="text" 
              placeholder='Search documents...'
              value={searchTerm || ''}
              onChange={handleSearchChange}
              className="bg-transparent border-0 outline-0 px-3 py-3 text-gray-700 placeholder-gray-400 w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}
    </>
  )
}

export default Navbar
