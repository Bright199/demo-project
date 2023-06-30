import React from "react";

const UserEventList = () => {
  return (
    <div className="md:mt-4 mt-0 w-full md:w-[797px] md:p-4 ">
      <h1 className="font-semibold text-lg border-b-2 p-2 mb-3">My events</h1>
      {/* event */}
      <div className="flex flex-wrap rounded-lg bg-white mb-5 flex-row">
        <div className="">
          <img
            src="/images/event.jpg"
            alt="event_image"
            className="object-cover rounded-tl-lg h-48 w-76"
          />
        </div>
        <div className="p-5 flex-1">
          <h1 className="text-lg ">Event Name</h1>
          <p className="font-light mb-2">June 29, 2023 4:30 PM</p>
          <div className="flex flex-wrap gap-2">
            <p className="font-medium">Price: $25.2</p>
            <p className="font-medium">Attendees: 30 people</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            optio, eligendi illo nisi velit eius suscipit deserunt laudantium
            sed! Totam optio dolores quidem hic soluta itaque consectetur eos,
            ex at!
          </p>
        </div>
      </div>
      <div className="flex flex-wrap rounded-lg bg-white mb-5 flex-row">
        <div className="">
          <img
            src="/images/event.jpg"
            alt="event_image"
            className="object-cover rounded-tl-lg h-48 w-76"
          />
        </div>
        <div className="p-5 flex-1">
          <h1 className="text-lg ">Event Name</h1>
          <p className="font-light mb-2">June 29, 2023 4:30 PM</p>
          <div className="flex flex-wrap gap-2">
            <p className="font-medium">Price: $25.2</p>
            <p className="font-medium">Attendees: 30 people</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            optio, eligendi illo nisi velit eius suscipit deserunt laudantium
            sed! Totam optio dolores quidem hic soluta itaque consectetur eos,
            ex at!
          </p>
        </div>
      </div>
      {/* event */}
    </div>
  );
};

export default UserEventList;
