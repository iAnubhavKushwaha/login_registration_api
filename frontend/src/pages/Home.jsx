import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const fetchUser = async () => {

    try{
      
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status !== 201){
        navigate('/login')
      }
    } catch (err){
      navigate('/login')
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);


    // Logout function
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">
          Welcome to MyApp
        </h1>
        <p className="text-xl text-gray-200">
          Your go-to platform for seamless user authentication.
        </p>
        <div className = "mt-8">
        <button 
              onClick={handleLogout}
              className="bg-red-500 text-white w-30 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
