import React from "react";
import telegram from "/telegram.png";
import discord from "/discord.png";

const Connect = () => {
  return (
    <div className=" mt-10 " id="founder">
      <div className="flex flex-col max-w-[1280px] m-auto p-4 text-2xl ">
        <h1 className="text-[#494866] text-4xl font-bold text-center mt-5 mb-10">
          CONNECT WITH US
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center text-center gap-4 margin-0 text-[#494866]">
          <div className="w-20  lg:w-28 flex flex-col ">
            <img className="h-fit rounded-lg" src={telegram} alt="Logo" />
            telegram
          </div>

          <div className="w-20 lg:w-28 flex flex-col">
            <img className="h-fit rounded-lg" src={discord} alt="Logo" />
            discord
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
