import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validSchema = yup.object().shape({
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validSchema) });

  const onSubmitHandler = async (credentials, e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", credentials);
      console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/urlshortener");
    } catch (e) {
      console.log(e.response);
      if (e.response.status == 404) {
        toast.error("404 page not found");
      }
      toast.error(e.response.data.message);
    }

    reset();
  };

  return (
    <div className=" w-full h-full flex ">
      <div className="w-2/4 m-auto justify-around">
        <form
          className="w-[60%] m-auto"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className=" flex-col justify-center my-10">
            <p className="font-bold text-3xl text-center">Login</p>
            <p className="text-gray-400 text-center">Log in to continue....</p>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="tetalenaa@gmail.com"
              required
            />
            <p className="text-red-800">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              placeholder="Enter your password"
            />
            <p className="text-red-800">{errors.password?.message}</p>
          </div>
          <div>
            <input
              type="submit"
              value={"Login"}
              className="bg-[#293241]  text-white font-bold border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <p className="my-4 mx-20">
            {" "}
            Don't have an account?{" "}
            <button
              className="text-[#0d4bb8] font-bold mx-4"
              onClick={() => {
                navigate("/newaccount");
              }}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
