"use client";
import React, { useEffect, useState } from "react";
import apis from "../components/apis/apis";
import { motion } from "framer-motion";

const page = () => {
  const [tickets, setTickets] = useState(null);

  const fetchTickets = async () => {
    const { data } = await apis.fetchTickets();
    setTickets(data);
    console.log(data);
  };
  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <div>
      <div className="flex md:mt-32 mt-14 md:justify-center ">
        <div className="flex md:items-center  flex-col gap-8 w-full md:w-[650px]">
          <h2 className="text-lg font-bold mb-0">My tickets</h2>
          {tickets &&
            tickets.map((ticket, i) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.045 }}
                  key={i}
                  className="bg-white flex md:flex-row p-5 flex-col gap-3 w-full  rounded-md shadow-sm"
                >
                  <div className="">
                    <p>
                      Ticket number: {ticket.ticket_number}{" "}
                      <span className="px-2 py-1 rounded-full bg-green-400/20 text-sm">
                        Booked
                      </span>
                    </p>
                    <p>{ticket.event.date}</p>
                    <p>{ticket.event.location}</p>
                    <p>${ticket.event.price}</p>
                  </div>
                  <div className=""></div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
