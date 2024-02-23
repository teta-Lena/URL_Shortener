import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/newaccount");
  };
  return (
    <div className="flex justify-center  w-full h-full ">
      <div className="mx-auto my-20 ">
        <p className="text-3xl font-bold">Welcome to the URL Shortener! </p>
        <button
          onClick={handleClick}
          className="p-2 border bg-[#3D5A80] color-white my-4 text-white rounded-md"
        >
          Create your account to shorten your URL
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
