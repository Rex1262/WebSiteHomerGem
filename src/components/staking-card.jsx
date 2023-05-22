import React, { useEffect, useState } from "react";
import moment from "moment";

function StakingCard({ unstakeToken, userStake }) {
  const [remainingTime, setRemainingTime] = useState(userStake?.minutes); // 600 seconds = 10 minutes
  console.log("User stake minutes",remainingTime)

  const endingDate = moment()
    .add(userStake?.minutes, "minutes")
    .format("MMMM Do YYYY");
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          console.log("Timer finished");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function formatTime(seconds) {
    const pad = (num) => String(num).padStart(2, "0");
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    

    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(secs),
    };
  }

  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  return (
    <div className="w-full bg-[#1f1f1f]   rounded-xl pb-4" >
      <div className="cardtop bg-[#f9ca24] p-2 text-[#494866] rounded-t-lg">
        <div className="flex flex-col justify-center items-center  pt-2 border-b-2 border-[#1f1f1f36] pb-2">
          <h2 className="text-lg font-bold text-[#494866]">
            Your Stake Will End In
          </h2>
          <p className="text-[#494866] text-lg font-semibold">{endingDate}</p>
        </div>
        <div className="timercontainer flex justify-between py-2">
          <div className="timerbox flex flex-col items-center justify-center gap-2 ">
            <div className="text-lg sm:text-xl font-bold">Days</div>
            <div className="text-sm sm:text-lg font-bold">{days}</div>
          </div>
          <div className="timerbox flex flex-col items-center justify-center gap-2 ">
            <div className="text-lg sm:text-xl font-bold">Hours</div>
            <div className="text-sm sm:text-lg font-bold">{hours}</div>
          </div>
          <div className="timerbox flex flex-col items-center justify-center gap-2 ">
            <div className="text-lg sm:text-xl font-bold">Minutes</div>
            <div className="text-sm sm:text-lg font-bold">{minutes}</div>
          </div>
          <div className="timerbox flex flex-col items-center justify-center gap-2 ">
            <div className="text-lg sm:text-xl font-bold">Seconds</div>
            <div className="text-sm sm:text-lg font-bold">{seconds}</div>
          </div>
        </div>
      </div>

      <div className="stakingdetails text-[#f6e58d] text-lg  font-semibold  p-2 py-4">
        <p className="border-b-2 border-[#f9ca244f] pb-4">
          Get ready for an exciting journey! <br/> HomerGem is here to empower and reward you.
          With unique features and exclusive rewards we're redefining the crypto world together. 
        </p>
        <div className="pt-4">
          <div className="box flex items-center justify-between">
            <h2>Your Staking Amount</h2>
            <p>{userStake?.stakedAmount}</p>
          </div>
          <div className="box flex items-center justify-between">
            <h2>Your Reward Percentage</h2>
            <p>{userStake?.rewardPercentage}%</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-2">
        <button
          onClick={() => {
            remainingTime > 0 && unstakeToken(userStake?._stakingId);
          }}
          className={`w-full px-4 py-2 text-[#141414] font-semibold rounded-md bg-[#f6e58d]  focus:bg-[#f6e58d] focus:outline-none hover:bg-transparent border border-[#f6e58d] hover:text-[#f6e58d] ${
            remainingTime > 0 ? "opacity-40" : "opacity-100"
          }`}
          disabled={remainingTime > 0 ? true : false}
        >
          Get Rewards
        </button>
      </div>
    </div>
  );
}

export default StakingCard;
