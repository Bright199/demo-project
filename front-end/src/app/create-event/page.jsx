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
import { createEvent } from "@/redux/features/eventSlice";

const Dashboard = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.value.userToken);
  const dispatch = useDispatch();

  const [event, setEvent] = useState("");
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

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  useEffect(() => {
    setEvent({ ...event, date: startDate });
  }, [startDate]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    try {
      const formData = new FormData();
      formData.append("title", event.title);
      formData.append("description", event.description);
      formData.append("price", event.price);
      formData.append("date", event.date);
      formData.append("file", event.file);
      formData.append("location", event.location);
      formData.append("attendees", event.attendees);
      const { data } = await apis.createAnEvent(event);
      setEvent("");
      dispatch(createEvent(data));
      toast.success("Successfully created event", toastifySettings);
      setTimeout(() => {
        router.push("/my-events");
      }, 2000);

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
    checkUserToken();
  }, [auth]);

  return (
    <div className="container mx-auto md:px-9 px-2 flex flex-wrap gap-10 justify-center">
      <ToastContainer />
      <div className="md:mt-16 mt-5 rounded-lg shadow-sm bg-white md:p-7 p-3">
        <h1 className="text-2xl font-semibold mb-4">Create event</h1>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="title">Event title</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Event title"
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="title"
            id="title"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="description">Event description</label>
          <motion.textarea
            whileHover={{ scale: 1.05 }}
            placeholder="Give a description about the event..."
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            name="description"
            onChange={(e) => handleChange(e)}
            id="description"
            rows="5"
          ></motion.textarea>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="date_time">Event date and time</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            id="date_time"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="location">Event location</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Event location"
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="location"
            id="location"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="location">Event price</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Event price"
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="price"
            id="price"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="attendees">Number of attendees</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="text"
            placeholder="Attendee limit"
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg"
            onChange={(e) => handleChange(e)}
            name="attendees"
            id="attendees"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="cover_photo">Event cover photo</label>
          <motion.input
            whileHover={{ scale: 1.05 }}
            type="file"
            className="rounded-lg w-full md:w-[697px] px-5 py-2 focus:shadow-lg
             file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-[#F18701]
            hover:file:bg-violet-100
            "
            onChange={(e) => {
              setEvent({ ...event, file: e.target.files[0] });
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
    </div>
  );
};

export default Dashboard;
