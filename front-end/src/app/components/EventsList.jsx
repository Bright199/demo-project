// import Image from "next/image";
"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import apis from "./apis/apis";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const EventsList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [events, setEvents] = useState(null);
  const router = useRouter()
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

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const fetchEvents = async () => {
    const { data } = await apis.fetchAllEvents();
    setEvents(data);
    console.log(data);
  };
  const formatedDate = (date) => {
    return moment(new Date(date)).format("MMMM D, YYYY h:mm A");
  };

  const checkDatePassed = (date) => {
    const currentDate = moment();
    const passed = moment(date).isBefore(currentDate);
    return passed;
  };

  const reserveTicket = async () => {
    try {
      const { data } = await apis.makeReservation(selectedProduct);
      toast.success(
        `"Reservation made successfully with ticket number:". ${data}`,
        toastifySettings
      );
      closeModal();
      setTimeout(() => {
        router.push('/reservations')
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong with reserve ticket");
    }
  };

  const getFormattedTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      const truncatedTitle = words.slice(0, 3).join(" ");
      return `${truncatedTitle} ...`;
    }
    return title;
  };

  const getFormattedText = (text) => {
    const words = text.split(" ");
    if (words.length > 14) {
      const truncatedText = words.slice(0, 14).join(" ");
      return `${truncatedText} ...`;
    }
    return text;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Render modal */}
      <ToastContainer />
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-30 "
            x-show="showModal"
          >
            <div className=" bg-white p-8 rounded shadow-md md:w-2/5">
              {/* Modal content goes here */}
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <p className="flex items-center">
                <span className="material-icons-outlined">where_to_vote</span>
                {selectedProduct.location}
              </p>
              <div className="flex flex-wrap gap-2">
                <p>Attendee limit: {selectedProduct.attendees}</p>
                <p className="px-3 py-1 bg-green-400/20 rounded-full text-sm">
                  {selectedProduct.booked_count === 0
                    ? "Be first to book"
                    : `${selectedProduct.booked_count} booked`}
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <p>
                  Date: {formatedDate(selectedProduct.date)}{" "}
                  {checkDatePassed(selectedProduct.date) ? (
                    <span className="px-3 py-1 bg-red-400/20 rounded-full text-sm">
                      Passed
                    </span>
                  ) : (
                    "failed"
                  )}
                </p>
                <p>Ticket price: ${selectedProduct.price}</p>
              </div>
              <div className="max-h-[350px] overflow-auto mb-4 mt-4">
                <p>{selectedProduct.description}</p>
              </div>

              <div className="flex items-end justify-end gap-5 flex-col md:flex-row">
                {checkDatePassed(selectedProduct.date) ? (
                  <button
                    disabled
                    className="disabled:opacity-75 px-6 py-2 text-[#3D348B] shadow-md rounded-full flex gap-2"
                    onClick={closeModal}
                  >
                    <span className="material-icons-outlined">history</span>
                    You missed this
                  </button>
                ) : selectedProduct.attendees ===
                  selectedProduct.booked_count ? (
                  <button
                    className=" disabled:opacity-75 px-6 py-2 text-[#3D348B] shadow-md rounded-full flex gap-2"
                    onClick={closeModal}
                  >
                    <span className="material-icons-outlined">
                      reduce_capacity
                    </span>
                    Limit reached
                  </button>
                ) : (
                  <button
                    className="bg-[#F18701] hover:bg-[#3D348B] transition duration-300 ease-in-out px-6 py-2 text-white shadow-md rounded-full"
                    onClick={reserveTicket}
                  >
                    Reserve ticket
                  </button>
                )}

                <button
                  className="bg-[#3D348B] hover:bg-[#F18701] transition duration-300 ease-in-out px-6 py-2 text-white shadow-md rounded-full"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-wrap md:gap-9 w-full md:w-[1165px] mt-12">
        {events &&
          events.map((event, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.024 }}
                className="w-[362px] h-[455px] flex flex-col gap-3 items-center shadow-xl bg-white relative hover:shadow-2xl"
              >
                <div className="imageContainer w-full h-[240px]">
                  <img
                    src={"/images/event.jpg"}
                    className="rounded-t-xl object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold">
                  {getFormattedTitle(event.title)}
                </h3>
                <p className="text-center">{getFormattedText(event.description)}</p>
                <button
                  onClick={() => openModal(event)}
                  className="bg-[#3D348B]  hover:bg-[#F18701] transition duration-300 ease-in-out  py-3 text-white flex items-center justify-center gap-2 w-full absolute bottom-0"
                >
                  <span className="material-icons-outlined">visibility</span>
                  Details
                </button>
              </motion.div>
            );
          })}
      </div>

      <div className="md:w-[1168px] mt-5 flex items-center justify-center">
        <button>More events...</button>
      </div>
    </div>
  );
};

export default EventsList;
