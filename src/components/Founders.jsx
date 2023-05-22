import React from "react";
import founder1 from "/founder1.png";
import founder2 from "/founder2.png";
import founder3 from "/founder3.png";
import founder4 from "/founder4.png";

const Founders = () => {
  return (
    <div className=" mt-10 " id="founder">
      <div className="flex flex-col gap-8 lg:gap-10 max-w-[1280px] m-auto p-4 text-2xl pb-10">
        <h1 className="text-[#494866] text-4xl font-bold text-center mt-5 mb-10">
          FOUNDERS
        </h1>
        <div className="flex justify-center items-center gap-8 lg:gap-4 flex-col margin-0 lg:flex-row">
          <div className="w-2/4 lg:w-1/4">
            <img className="h-fit rounded-lg" src={founder1} alt="Logo" />
          </div>

          <div className="w-2/4 lg:w-1/4">
            <img className="h-fit rounded-lg" src={founder2} alt="Logo" />
          </div>

          <div className="w-2/4 lg:w-1/4">
            <img className="h-fit rounded-lg" src={founder3} alt="Logo" />
          </div>

          <div className="w-2/4 lg:w-1/4">
            <img className="h-fit rounded-lg" src={founder4} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founders;
