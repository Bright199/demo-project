
import Link from "next/link";
import EventsList from "./components/EventsList";

export default function Home() {
  return (
    <div className="container mx-auto flex items-center flex-col justify-center p-5 md:p-2">
      <div className="p-5 bg-gradient-color f w-full justify-center text-white mt-2 md:mt-[58px] md:h-[306px] md:w-[1165px] flex items-center flex-col">
        <h1 className="md:text-[54px] font-bold text-center">
          Discover and Book Exciting Events
        </h1>
        <p className="md:text-[27px] text-16 text-center">Book Tickets with Ease</p>
      </div>

      <EventsList />
    </div>
  );
}
