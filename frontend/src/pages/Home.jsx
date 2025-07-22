import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import { BsPlusLg } from "react-icons/bs";
import Docs from '../components/Docs';
import { MdOutlineTitle } from "react-icons/md";
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  const createDoc = () => {
    if(title === "") {
      setError("Please enter title");
    }
    else{
      fetch(api_base_url + "/createDoc",{
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId")
        })
      }).then(res=>res.json()).then(data => {
        if(data.success) {
          setIsCreateModelShow(false);
          setTitle("");
          setError("");
          navigate(`/createDocs/${data.docId}`)
        }
        else{
          setError(data.message);
        }
      }).catch(err => {
        setError("Failed to create document. Please try again.");
      })
    }
  }

  const getData = () => {
    fetch(api_base_url + "/getAllDocs",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data => {
      setData(data.docs || []);
      setFilteredData(data.docs || []);
    }).catch(err => {
      console.error("Error fetching documents:", err);
      setData([]);
      setFilteredData([]);
    })
  };

  // Search functionality
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (!data) return;
    
    if (searchValue === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(doc => 
        doc.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        doc.docName?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const openCreateModal = () => {
    setIsCreateModelShow(true);
    setError("");
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 100);
  };

  const closeCreateModal = () => {
    setIsCreateModelShow(false);
    setTitle("");
    setError("");
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      {/* Pass search props to Navbar */}
      <Navbar onSearch={handleSearch} searchTerm={searchTerm} />
      
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 md:px-[100px] mt-8 mb-6">
        <div>
          <h3 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>All Documents</h3>
          <p className='text-gray-600'>
            {filteredData ? `${filteredData.length} document${filteredData.length !== 1 ? 's' : ''}` : 'Loading...'}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <button 
          className="btnBlue flex items-center gap-2 px-6 py-3 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
          onClick={openCreateModal}
        >
          <BsPlusLg className="text-lg" />
          <span className="hidden sm:inline">Create New Document</span>
          <span className="sm:hidden">New Doc</span>
        </button>
      </div>

      {/* Documents Grid */}
      <div className='allDocs px-4 md:px-[100px] mt-4'>
        {filteredData && filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((el, index) => (
              <Docs 
                key={el._id || `doc-${index}`}
                docs={el} 
                docID={el._id || `doc-${index}`}
                onUpdate={getData}
              />
            ))}
          </div>
        ) : filteredData && filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <BsPlusLg className="text-6xl text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No documents found' : 'No documents yet'}
              </h4>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try searching with different keywords'
                  : 'Create your first document to get started'
                }
              </p>
              {!searchTerm && (
                <button 
                  onClick={openCreateModal}
                  className="btnBlue mx-auto"
                >
                  <BsPlusLg className="mr-2" />
                  Create Your First Document
                </button>
              )}
              {searchTerm && (
                <button 
                  onClick={() => handleSearch("")}
                  className="btnBlue mx-auto"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading documents...</p>
          </div>
        )}
      </div>

      {/* Create Document Modal */}
      {isCreateModelShow && (
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 w-screen h-screen flex flex-col items-center justify-center z-50 p-4">
          <div className="createDocsModel p-6 bg-white rounded-xl w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Create New Document</h3>

            <div className='inputCon mb-6'>
              <p className='text-sm text-gray-600 mb-2'>Document Title</p>
              <div className="inputBox w-full">
                <i className="text-gray-400">
                  <MdOutlineTitle />
                </i>
                <input 
                  ref={titleInputRef}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }} 
                  value={title} 
                  type="text" 
                  placeholder='Enter document title' 
                  className="w-full p-3 bg-transparent border-0 outline-0"
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 justify-between w-full">
              <button 
                onClick={createDoc} 
                disabled={!title.trim()}
                className='btnBlue flex-1 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Create Document
              </button>
              <button 
                onClick={closeCreateModal} 
                className='flex-1 p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg border-0 cursor-pointer transition-all duration-300 font-medium'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
