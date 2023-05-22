import React, { useState } from "react";
import HomerGemAbi from "./HomerGemAbi.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import StakingCard from "./staking-card";

const Staking = () => {
  const [transactionState, setTransactionState] = useState(false);
  const [chainId, setChainId] = useState();
  const [homerGem, setHomerGem] = useState();
  const [account, setAccount] = useState();
  const [stakingId, setStakingId] = useState(10);
  const [balance, setBalance] = useState();
  const [stakingAbility, setStakingAbility] = useState();
  const [userStakes, setUserStakes] = useState([]); // array having user's all stakes

  const [stakesLoading, setStakesLoading] = useState(false);
  const [homergemLoading, setHomergemLoading] = useState(false);

  const homerGemTestNet = "0x9478039D495E7C03350292D5174757A59a2802Ef";
  const homerGemMainNet = "0xE8FDAF419A086D3B48d7d8C23C22B0CE28a79488";
  const mainnetCahinID = 56;
  const testnetChainId = 97;
  const staking = false ;
  const [formValues, setFormValues] = useState({
    stakingPrice: "",
    duration: "",
  });

  const [formErrors, setFormErrors] = useState({
    stakingPrice: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //  load contract
  const loadContract = async (signer, userAddress, provider) => {
    // Get deployed copy of contract
    const homergem = new ethers.Contract(
      homerGemMainNet,
      HomerGemAbi.abi,
      signer
    );
    // // const slot = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], ['stakingId']));
    // // const result = await provider.getStorageAt(homerGemTestNet, slot);
    // // const internalVariable = ethers.BigNumber.from(result).toString();

    // console.log(internalVariable ,"stakingId");

    // Function to calculate the storage slot
    // Function to calculate the storage slot manually
    function calculateStorageSlot(slotIndex) {
      const storageSlot = ethers.utils.hexValue(slotIndex);
      return storageSlot;
    }

    // Read the values of storage slots
   

    console.log(homergem);
    const _balance = await homergem.balanceOf(userAddress);
    // setBalance(_balance);
    const eth_balance = ethers.utils.formatEther(_balance);
    setBalance(eth_balance);
    // checking Staking State
    const staingEnableOrNot = await homergem.staking();
    console.log(staingEnableOrNot);
    setStakingAbility(staingEnableOrNot);
    setHomerGem(homergem);
  };

  // // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Get provider from Metamask
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = _provider.getSigner();
    // Get the chain ID
    const network = await _provider.getNetwork();
    const _chainID = network.chainId;
    if (_chainID != mainnetCahinID) {
      toast.error("Please connect your wallet with Binance Smart Chain");
    } else {
      setAccount(accounts[0]);
      loadContract(signer, accounts[0], _provider);
    }
    console.log(_chainID);
    setChainId(_chainID);
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      await web3Handler();
    });
  };

  // getYourStakes Function
  const getYourStakes = async () => {
    let stakeArry = [];
    if(staking == false){
       toast.error("Staking is not allowed Yet"); 
    }else{
      if (!account) {
        toast.error("Please connect your wallet with Binance Smart Chain");
      } else {
        try {
          setTransactionState(true);
          for (let i = 1; i <= stakingId; i++) {
            const userStake = await homerGem.staked(i);
            const staker = userStake.stakerAddress;
            if (staker.toLowerCase() == account.toLowerCase()) {
              console.log("Yes youre are staker");
              const stakeEndTime = Number(userStake.stakingEnd);
              const date = new Date(stakeEndTime * 1000);
              const minutes = date.getMinutes();
              const _stakingId = i.toString();
              const stakedAmountInEth = ethers.utils.formatEther(
                userStake.stakedAmount
              );
              const stakedAmount = Number(stakedAmountInEth);
              const rewardPercentage = Number(userStake.rewardPercentage) / 100;
              console.log(_stakingId);
  
              stakeArry.push({
                _stakingId,
                stakedAmount,
                rewardPercentage,
                minutes,
              });
            }
  
            console.log(userStakes);
          }
          setUserStakes(stakeArry);
          // const userStake = await homerGem.staked('1')
          // console.log(userStake);
          setTransactionState(false);
          console.log("In the try");
  
          setStakesLoading(false);
        } catch (error) {
          console.log("In the catch");
          setTransactionState(false);
          // console.log(error.data.message);
          // toast.error(error.data);
        }
      }
    }


  };

  // stake function

  const stakeToken = async (amount, days) => {
     if(staking == false){
        toast.error("Staking is not allowed yet");
     }
     else{
      if (!account) {
        toast.error("Please connect your wallet with Binance Smart Chain");
      } else {
        try {
          setTransactionState(true);
          await (await homerGem.approve(homerGemTestNet, amount)).wait();
          await (await homerGem.stakeToken(amount, days)).wait();
          setTransactionState(false);
          const stakedAmount = ethers.utils.formatEther(amount);
          toast.success(
            `Congrats you succussfully staked ${stakedAmount} HomerGem`
          );
          console.log("In stake try");
          setHomergemLoading(false);
        } catch (error) {
          setTransactionState(false);
          toast.error("Transaction Error");
          // console.log(error.error.data.message);
          // let message = await error.data.message.toString();
        }
      }
     }
    
  };

  // unstakeFunction
  const unstakeToken = async (stakedId) => {
    if (!account) {
      toast.error("Please connect your wallet with Binance Smart Chain");
    } else {
      try {
        setTransactionState(true);
        await (await homerGem.unstakeAndClaimRewards(stakedId)).wait();
        setTransactionState(false);
        toast("Congratulations! You have received your reward successfully");
      } catch (error) {
        setTransactionState(false);
        toast(error.data);
      }
    }
  };

  //  submit handle
  const handleStaking = () => {
    const { stakingPrice, duration } = formValues;
    let errors = {};

    if (!stakingPrice) {
      errors.stakingPrice = "Please enter the staking price.";
    }

    if (!duration) {
      errors.duration = "Please select the staking duration.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Perform any additional actions with formValues.stakingPrice and formValues.duration
    const parsedTokenQuantity = ethers.utils.parseEther(stakingPrice);
    console.log("Staking Quantity:", parsedTokenQuantity);
    console.log("Duration:", duration);
    stakeToken(parsedTokenQuantity.toString(), duration);

    // Clear the form
    setFormValues({
      stakingPrice: "",
      duration: "",
    });
    setFormErrors({
      stakingPrice: "",
      duration: "",
    });
  };

  return (
    <div className="">
      <div className="bg-[url('/staking-bg.jpg')] h-full lg:min-h-[95vh]  bg-cover bg-no-repeat bg-top">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between py-5 px-2 sm:px-5 bg-[#f2df7d]/50">
          {account ? (
            <button className="border  border-transparent bg-[#1E202B]  font-semibold text-[#F9CA25] hover:text-[#141414] hover:border-[#1E202B] hover:bg-transparent rounded-full px-4 py-2">
              {account.slice(0, 7) + "......" + account.slice(36, 42)}
            </button>
          ) : (
            <button
              className="border  border-transparent bg-[#1E202B]  font-semibold text-[#f6e58d] hover:text-[#141414] hover:border-[#1E202B] hover:bg-transparent rounded-full px-4 py-2"
              onClick={web3Handler}
            >
              Connect Wallet
            </button>
          )}

          <h6 className="text-[#494866] font-semibold text-lg">
            Your Balance : <span>{balance} HG</span>
          </h6>
        </div>
        <div className="form text-[#f6e58d] w-full">
          <div className="p-2 sm:p-4 w-full">
            <div className="flex flex-col gap-5 sm:gap-10 lg:flex-row justify-around items-center staking-page-form-container">
              <div className="mb-[98px] lg:mb-0 text-[#f6e58d] bg-[#1f1f1f] basis-2/4  borderStyle rounded-t-xl">
                <div className="content border-8 border-[#f8ca00] gap-5 p-4 px-8 text-lg font-semibold flex flex-col rounded-t-lg">
                  <p>Dear Homergem Staking Community, </p>{" "}
                  <p>
                    {" "}
                    Welcome to our valued community of stakers. Our tiered
                    staking rewards program offers daily rewards based on your
                    staking activities. Early adopters, the first 0 to 99
                    stakers, will enjoy an impressive 8% daily reward rate,
                    while those ranking from 100th to 199th will receive 7.9%.
                    Rewards gradually decrease for subsequent stakers until the
                    800th position.{" "}
                  </p>
                  <p>
                    We greatly appreciate your participation and aim to maximize
                    the value you receive from your staking activities. Please
                    note that once you select a staking duration, early
                    unstaking is not available. This ensures system stability
                    and fair rewards distribution.{" "}
                  </p>
                  <p>
                    {" "}
                    Thank you for choosing Homergem as your staking platform.
                    Together, we embark on a rewarding journey.
                  </p>
                </div>
              </div>

              <div className="mb-[98px] lg:mb-0 w-full sm:max-w-lg bg-[#1f1f1f] basis-2/4 borderStyle rounded-t-xl ">
                <div className=" border-8 border-[#f8ca00] text-lg shadow p-4 px-8 rounded-t-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Staking To Earn Rewards
                  </h2>
                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="staking-price"
                        className="block text-sm font-medium text-[#f6e58d]"
                      >
                        Staking Quantity Of your HomerGem Tokens
                      </label>
                      <input
                        id="staking-price"
                        type="number"
                        className="mt-1 focus:ring-yellow-300 focus:border-yellow-300 bg-[#1f1f1f] block w-full shadow-sm sm:text-sm border border-[#f6e58d] rounded-md py-3 px-3"
                        name="stakingPrice"
                        value={formValues.stakingPrice}
                        onChange={handleInputChange}
                      />
                      {formErrors.stakingPrice && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.stakingPrice}
                        </p>
                      )}
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-[#f6e58d]"
                      >
                        Duration (in days)
                      </label>
                      <select
                        id="duration"
                        className="mt-1 block w-full px-3 rounded-md shadow-sm focus:outline-none focus:ring-[#f6e58d] focus:border-[#f6e58d] sm:text-sm bg-[#1f1f1f] py-3 border border-[#f6e58d]"
                        name="duration"
                        value={formValues.duration}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Duration</option>
                        <option value="15">15</option>
                        <option value="45">45</option>
                        <option value="95">95</option>
                      </select>
                      {formErrors.duration && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.duration}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      {homergemLoading ? (
                        <button
                          className="w-full flex items-center gap-2 px-3 py-3 justify-center rounded-md bg-[#f6e58d] focus:bg-[#f6e58d] focus:outline-none border border-[#f6e58d]"
                          disabled={true}
                        >
                          <img
                            className="w-[20px] h-[20px] animate-spin"
                            src="/spinner.png"
                            alt="spinner"
                          />
                          <span className="text-[#141414] font-semibold text-sm">
                            Transaction in progress
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            // setHomergemLoading(true);
                            handleStaking();
                          }}
                          className="w-full px-3 py-3 text-[#141414] font-semibold rounded-md  bg-[#f6e58d]  focus:bg-[#f6e58d] focus:outline-none hover:bg-transparent border border-[#f6e58d] hover:text-[#f6e58d]"
                        >
                          Stake Your HomerGem
                        </button>
                      )}

                      <h2 className="text-xl font-semibold my-4 text-center">
                        Or
                      </h2>
                      {stakesLoading ? (
                        <button
                          className="w-full flex items-center gap-2 px-3 py-3 justify-center  rounded-md bg-[#f6e58d] focus:bg-[#f6e58d] focus:outline-none  border border-[#f6e58d]"
                          disabled={true}
                        >
                          <img
                            className="w-[20px] h-[20px] animate-spin"
                            src="/spinner.png"
                            alt="spinner"
                          />
                          <span className="text-[#141414] font-semibold text-sm">
                            Getting stakes in progress
                          </span>
                        </button>
                      ) : (
                        <button
                          className="w-full px-3 py-3 text-[#141414] font-semibold rounded-md bg-[#f6e58d] focus:bg-[#f6e58d] focus:outline-none hover:bg-transparent border border-[#f6e58d] hover:text-[#f6e58d]"
                          onClick={() => {
                            // setStakesLoading(true);
                            getYourStakes();
                          }}
                        >
                          Get Your Stakes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* staking cards */}
      <div className="stakingcard-container my-20 px-4 sm:px-6">
        {/*  This is integrated */}
        {userStakes.length > 0 ? (
          <div>
            <h2 className="my-12 text-center text-4xl font-bold sm:px-5 text-[#494866]">
              List Of Your Stakes
            </h2>
            <div className="stakingcards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStakes.map((data, index) => {
                return (
                  <StakingCard
                    key={index + Math.random() * 5}
                    userStake={data}
                    unstakeToken={unstakeToken}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Staking;
