import React from "react";
import data from "../assets/data.json";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";

const Error = () => {
  const options = {
    autoplay: true,
    animationData: data,
    loop: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    height: 400,
  };

  const { View } = useLottie(options);
  return (
    <div className="flex items-center text-center justify-center h-screen">
      <div className="flex flex-col gap-5 w-72">
        <div>
          <h1 className="font-semibold text-lg">
            <i>Y ay ay ay ay ayyyyyy!</i>
          </h1>
          <p className="text-[10px] font-semibold">- error 404 -</p>
        </div>
        <div className="">{View}</div>
        <div className="w-scree">
          <h1 className="font-bold">Oops! Haman ka chuy...</h1>
          <p className="text-[10px]">
            You are looking for something that doesn't actually exist
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="bg-[#ddd165] py-1 px-5 text-[12px] text-white font-bold shadow-lg rounded-sm hover:bg-[#aca351] duration-500 hover:-translate-y-1"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
