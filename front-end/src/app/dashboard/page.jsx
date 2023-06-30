"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import apis from "../components/apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";

import {
  handleComplianceDate,
  updateFormValue,
  resetForm,
} from "@/redux/features/complianceSlice";

const Dashboard = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.value.userToken);
  const complianceDetails = useSelector((state) => state.compliance.value);
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered")
  );
  const [complianceFile, setComplianceFile] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

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

  const checkUserToken = () => {
    if (auth == null) {
      router.push("/login");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormValue({ field: name, value }));
  };

  const handleDate = () => {
    const date = startDate;
    const fdate = date.toISOString();
    dispatch(handleComplianceDate(fdate));
  };

  useEffect(() => {
    handleDate();
  }, [startDate]);

  const encryptData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("company_name", complianceDetails.company_name);
      formData.append("company_address", complianceDetails.company_address);
      formData.append("date", complianceDetails.date);
      formData.append("file", complianceFile);

      // const encryptedData = encryptData(formData, "compliance");

     const { data } = await apis.complianceRegistration(formData);
     console.log(data);
      localStorage.setItem("registered", "yes");
      toast.success("Successfully registered", toastifySettings);
      dispatch(resetForm());

    } catch (error) {
      if (error?.response?.status === 422) {
        Object.keys(error.response.data.errors).forEach((key) => {
          toast.error(error.response.data.errors[key][0], toastifySettings);
        });
      } else {
        toast.error(error.message, toastifySettings);
      }
    }
  };

  useEffect(() => {
    // localStorage.removeItem("registered");
    setRegistered(localStorage.getItem("registered"));
  }, [registered, handleSubmit]);

  useEffect(() => {
    checkUserToken();
  }, [auth]);

  return (
    <div>
      <ToastContainer />
      <div className="md:px-9 px-2 flex flex-wrap gap-10 justify-center">
        {registered != null ? (
          <div
            className="flex items-center justify-center mt-52 bg-white p-5 rounded-md flex-col"
            key={"yes"}
          >
            <span className="material-icons-outlined text-[#F18701]">
              assignment_turned_in
            </span>
            <p className="">Form registration has been registered!</p>
          </div>
        ) : (
          <div
            className="md:mt-16 mt-5 rounded-lg shadow-sm bg-white md:p-7 p-3 md:w-[740px] w-full"
            key={"no"}
          >
            <h1 className="text-2xl font-semibold mb-4">
              Compliance registration
            </h1>
            <p className="mb-5 ">
              Welcome to our Compliance Registration Form. This form is designed
              to gather important information from you to ensure compliance with
              industry regulations and standards. Please take a few moments to
              provide accurate and complete details. Your cooperation is greatly
              appreciated.
            </p>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="company_name">Company name</label>
              <motion.input
                whileHover={{ scale: 1.05 }}
                type="text"
                placeholder="Enter your company name"
                className="rounded-lg w-full md:w-[680px] px-5 py-2 focus:shadow-lg"
                onChange={(e) => handleInputChange(e)}
                name="company_name"
                id="company_name"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="company_address">Company address</label>
              <motion.textarea
                whileHover={{ scale: 1.05 }}
                placeholder="Give a company_address about the event..."
                className="rounded-lg w-full md:w-[680px] px-5 py-2 focus:shadow-lg"
                name="company_address"
                onChange={(e) => handleInputChange(e)}
                id="company_address"
                rows="4"
              ></motion.textarea>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="date_time">Corporation date and time</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                className="rounded-lg w-full md:w-[680px] px-5 py-2 focus:shadow-lg"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                id="date_time"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="cover_photo">
                Use this field to Upload any relevant documents
              </label>
              <motion.input
                whileHover={{ scale: 1.05 }}
                type="file"
                className="rounded-lg w-full md:w-[680px] px-5 py-2 focus:shadow-lg
             file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-[#F18701]
            hover:file:bg-violet-100
            "
                onChange={(e) => {
                  setComplianceFile(e.target.files[0]);
                }}
                id="cover_photo"
              />
            </div>

            <div className="flex justify-end">
              {
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-lg bg-[#3D348B] text-white py-3 md:w-1/5 w-full"
                >
                  Create
                </motion.button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
