"use client";
import React, { useState } from "react";
import apis from "../components/apis/apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


const Register = () => {
  const router = useRouter();

  const toastifySettings = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const [details, setDetails] = useState("");
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await apis.registerUser(details);
      setDetails("");
      toast.success(data.message, toastifySettings);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      // console.log(data);
    } catch (error) {
      if (error.response.status == 422) {
        Object.keys(error.response.data.errors).forEach((key) => {
          toast.error(error.response.data.errors[key][0], toastifySettings);
        });
      } else {
        toast.error(error.message, toastifySettings);
      }
    }
  };
  return (
    <div className="container mx-auto flex justify-center items-center mt-12">
      <ToastContainer />
      <div className=" p-5 bg-white rounded-lg shadow-sm items-center flex flex-col gap-3 w-full md:w-1/2">
        <h3 className="text-[24px] font-bold">Register</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Name</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Enter your email address"
            className="rounded-lg w-full md:w-[497px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Enter your email address"
            className="rounded-lg w-full md:w-[497px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Password</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="password"
            placeholder="Enter your password"
            className="rounded-lg w-full md:w-[497px] px-5 py-2 focus:shadow-lg"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-[#3D348B] text-white py-3 w-2/5"
          >
            Sign In
          </motion.button>
        }
      </div>
    </div>
  );
};

export default Register;
