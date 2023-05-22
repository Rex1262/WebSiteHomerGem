import React from "react";
import telegram from "/telegram.png";
import discord from "/discord.png";
import twitter from "/twitter.png";
import facebook from "/facebook.png";

const Connect = () => {
  return (
    <div className=" mt-10 " id="founder">
      <div className="flex flex-col max-w-[1280px] m-auto p-4 text-2xl ">
        <h1 className="text-[#494866] text-4xl font-bold text-center mt-5 mb-10">
          CONNECT WITH US
        </h1>
        <div className="flex items-center justify-center text-center gap-4 margin-0 text-[#494866]">
          <a
            href="https://t.me/HomerGem"
            target="_blank"
            className="w-16  lg:w-24 flex flex-col "
          >
            <img
              className="h-fit rounded-lg"
              src={telegram}
              alt="Telegram Logo"
            />
          </a>

          <a
            href="https://discord.gg/z5xPxmEY"
            target="_blank"
            className="w-16 lg:w-24 flex flex-col"
          >
            <img
              className="h-fit rounded-lg"
              src={discord}
              alt="Discord Logo"
            />
          </a>

          <a
            href="https://twitter.com/HomerGem"
            className="w-16 lg:w-24 flex flex-col"
          >
            <img
              className="h-fit rounded-lg"
              src={twitter}
              alt="Twitter Logo"
            />
          </a>
          <a
            href="https://www.facebook.com/vitalycarli"
            target="_blank"
            className="w-16 lg:w-24 flex flex-col"
          >
            <img
              className="h-fit rounded-lg"
              src={facebook}
              alt="Discord Logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Connect;
