"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import apis from "./apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, logoutUser } from "@/redux/features/authSlice";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userToken, setUserToken] = useState("");

  const events = useSelector((state) => state.userEvents.value.events);
  const auth = useSelector((state) => state.auth.value.userToken);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();

    localStorage.removeItem("userToken");
    dispatch(logoutUser());

    await apis.userLogout();
    router.push("/login");
  };

  const authFunction = () => {
    dispatch(authenticateUser(userToken));
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setUserToken(userToken);
    if (userToken !== null) {
      authFunction();
    }
  }, [userToken]);

  return (
    <div>
      {auth != null ? (
        <div className="container mx-auto items-start flex justify-between gap-6 flex-col md:flex-row md:items-center px-7 bg-white py-5">
          <Link href={"/dashboard"}>
            {pathname === "/" ? (
              <p className="flex items-center">
                <span className="material-icons-outlined">keyboard_backspace</span>{" "}
                Dashboard
              </p>
            ) : (
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={115}
                height={66}
              />
            )}
          </Link>

          <div className="right-nav flex flex-wrap flex-col md:flex-row justify-between gap-2 md:gap-10">
            <Link
              href={"/create-event"}
              className={
                pathname === "/create-event"
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">add_circle</span>
              Create event
            </Link>

            <Link
              href={"/my-events"}
              className={
                pathname === "/my-events"
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">
                format_list_bulleted
              </span>
              My events
            </Link>
            <Link
              href={"/reservations"}
              className={
                pathname === "/reservations"
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">
                confirmation_number
              </span>
              My tickets
            </Link>

            <Link
              href={"/"}
              className={
                pathname === "/"
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">calendar_month</span>
              Book
            </Link>

            <Link
              onClick={(e) => handleLogout(e)}
              href={"#"}
              className={"flex items-center gap-1"}
            >
              <span className="material-icons-outlined">logout</span> Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex justify-between items-center px-7 bg-white py-5">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={115}
              height={66}
            />
          </Link>

          <div className="right-nav flex justify-between gap-10">
            <Link
              href={"/login"}
              className={
                pathname.startsWith("/login")
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">login</span> Login
            </Link>
            <Link
              href={"/register"}
              className={
                pathname.startsWith("/register")
                  ? "flex items-center gap-1 bg-[#3D348B] px-4 py-2 text-white rounded-lg"
                  : "flex items-center gap-1"
              }
            >
              <span className="material-icons-outlined">how_to_reg</span>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
