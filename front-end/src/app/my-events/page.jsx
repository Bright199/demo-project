"use client";
import React, { useEffect, useState } from "react";
import UserEventList from "../dashboard/events/UserEventList";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import apis from "../components/apis/apis";
import moment from "moment/moment";
import {motion} from "framer-motion"
import { Opacity } from "@material-ui/icons";

const MyEvents = () => {
  const auth = useSelector((state) => state.auth.value.userToken);
  const router = useRouter();

  const checkUserToken = () => {
    if (auth == null) {
      router.push("/login");
    }
  };

  const formatedDate = (date) => {
    return moment(new Date(date)).format("MMMM D, YYYY h:mm A");
  };

  const [events, setEvents] = useState("");

  const fetchEvents = async () => {
    const { data } = await apis.fetchEvents();
    setEvents(data);
  };

  useEffect(() => {
    checkUserToken();
  }, [auth]);

  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (eventId) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [eventId]: !prevShowMoreMap[eventId] || false,
    }));
  };

  const truncateDescription = (description, eventId) => {
    const maxLength = 45;
    if (
      description.length <= maxLength ||
      (showMoreMap[eventId] && showMoreMap[eventId] === true)
    ) {
      return description;
    }
    return `${description.slice(0, maxLength)}...`;
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="md:mt-16 mt-5 rounded-lg md:p-7 p-3 flex flex-col justify-center items-center">
      <div className="md:mt-4 mt-0 w-full md:w-[820px] md:p-4 ">
        <h1 className="font-semibold text-lg border-b-2 p-2 mb-3">My events</h1>
    
        {events &&
          events.map((event, i) => {
            return (
              <motion.div
                // whileInView={{ scale: 1.1 }}
                whileHover={{ scale: 1.042 }}
                // whileTap={{ scale: 0.8 }}
                style={{ x: 0 }}
                className={`${
                  i === 0
                    ? "flex flex-wrap rounded-lg bg-white mb-5 flex-row shadow-lg"
                    : "flex flex-wrap rounded-lg bg-white mb-5 flex-row hover:shadow-lg"
                }`}
                key={i}
              >
                <div className="">
                  <img
                    src={`http://localhost:8000/storage/images/events/${event.photo}`}
                    alt="event_image"
                    className="object-cover rounded-tl-lg h-48 w-72"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h1 className="text-lg ">{event.title}</h1>
                  <p className="font-light mb-2">{formatedDate(event.date)}</p>
                  <div className="flex flex-wrap gap-2">
                    <p className="font-medium">Price: ${event.price}</p>
                    <p className="font-medium">
                      Attendees: {event.attendees} people{" "}
                      <span className="bg-green-300/25 px-5 rounded-md py-1">
                        {event.booked_count} Booked
                      </span>
                    </p>
                  </div>
                  <p>
                    {truncateDescription(event.description, event.id)}
                    {event.description.length > 45 && (
                      <button
                        className="text-[#F18701] font-medium"
                        onClick={() => toggleShowMore(event.id)}
                      >
                        {showMoreMap[event.id] ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default MyEvents;
