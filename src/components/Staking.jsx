import React, { useState } from "react";
import HomerGemAbi from "./HomerGemAbi.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import StakingCard from "./staking-card";
import Modal from "./Modal";
import { motion } from "framer-motion";

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

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div></div>);

  const homerGemTestNet = "0x9478039D495E7C03350292D5174757A59a2802Ef";
  const homerGemMainNet = "0xE8FDAF419A086D3B48d7d8C23C22B0CE28a79488";
  const mainnetChainID = 56;
  const testnetChainId = 97;
  const staking = true;
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
    if (_chainID != mainnetChainID) {
      toast.error("Please connect your wallet with Binance Smart Chain");
      setHomergemLoading(false);
      setStakesLoading(false);
    } else {
      setAccount(accounts[0]);
      loadContract(signer, accounts[0], _provider);
    }
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
    if (staking == false) {
      toast.error("Staking is not allowed Yet");
      setStakesLoading(false);
    } else {
      if (!account) {
        toast.error("Please connect your wallet with Binance Smart Chain");
        setStakesLoading(false);
      } else {
        try {
          setModalContent(
            <div className="text-[#f6e58d] text-lg p-6 flex flex-col gap-6 justify-center items-center">
              <div role="status" className="">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#f6e58d]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <h2>GETTING YOUR STAKES IN PROGRESS</h2>
            </div>
          );
          setShowModal(true);
          setTransactionState(true);
          for (let i = 1; i <= stakingId; i++) {
            const userStake = await homerGem.staked(i);
            const staker = userStake.stakerAddress;
            if (staker.toLowerCase() == account.toLowerCase()) {
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
     
          setTransactionState(false);
          console.log("In the try");

          setStakesLoading(false);
          setModalContent(
            <div className="text-[#f6e58d] text-lg p-6 flex flex-col gap-6 justify-center items-center">
              <div role="status" className="">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#f6e58d]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <h2>NO STAKINGS AVAILABLE</h2>
            </div>
          );
          setTimeout(() => {
            setShowModal(false);
          }, 3000);
        } catch (error) {
          console.log("In the catch");
          setTransactionState(false);
          setShowModal(false);
        
        }
      }
    }
  };
  // stake function

  const stakeToken = async (amount, days) => {
    if (staking == false) {
      toast.error("Staking is not allowed yet");
      setHomergemLoading(false);
    } else {
      if (!account) {
        toast.error("Please connect your wallet with Binance Smart Chain");
        setHomergemLoading(false);
      } else {
        try {
          setModalContent(
            <div className="text-[#f6e58d] text-lg p-6 flex flex-col gap-6 justify-center items-center">
              <div role="status" className="">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#f6e58d]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <h2>STAKING IN PROGRESS</h2>
            </div>
          );
          setShowModal(true);
          setTransactionState(true);
          await (await homerGem.approve(homerGemMainNet, amount)).wait();
          await (await homerGem.stakeToken(amount, days)).wait();
          setTransactionState(false);
          const stakedAmount = ethers.utils.formatEther(amount);
          setModalContent(
            <div className="text-[#f6e58d] text-lg p-6 flex flex-col gap-6 justify-center items-center">
              <div role="status" className="">
                <img className="inline w-12 h-12" src="/success.png" alt="" />
              </div>
              <h2>Congrats you succussfully staked ${stakedAmount} HomerGem</h2>
            </div>
          );
          toast.success(
            `Congrats you succussfully staked ${stakedAmount} HomerGem`
          );
          console.log("In stake try");

          setHomergemLoading(false);
          setTimeout(() => {
            setShowModal(false);
          }, 3000);
        } catch (error) {
          setHomergemLoading(false);
          setTransactionState(false);
          toast.error("Transaction Error");
          setShowModal(false);
          
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
        setModalContent(
          <div className="text-[#f6e58d] text-lg p-6 flex flex-col gap-6 justify-center items-center">
            <div role="status" className="">
              <svg
                aria-hidden="true"
                className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#f6e58d]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <h2>GETTING REWARDS IN PROGRESS</h2>
          </div>
        );
        setShowModal(true);
        await (await homerGem.unstakeAndClaimRewards(stakedId)).wait();
        setTransactionState(false);
        setShowModal(false);
        toast("Congratulations! You have received your reward successfully");
      } catch (error) {
        setTransactionState(false);
        setShowModal(false);
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
      setHomergemLoading(false);
      return;
    }

    // Perform any additional actions with formValues.stakingPrice and formValues.duration
    const parsedTokenQuantity = ethers.utils.parseEther(stakingPrice);
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
            <button
              type="button"
              className="border  border-transparent bg-[#1E202B]  font-semibold text-[#F9CA25] hover:text-[#141414] hover:border-[#1E202B] hover:bg-transparent rounded-full px-4 py-2"
            >
              {account.slice(0, 7) + "......" + account.slice(36, 42)}
            </button>
          ) : (
            <button
              type="button"
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
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-[98px] lg:mb-0 text-[#f6e58d] bg-[#1f1f1f] basis-2/4  borderStyle rounded-t-xl"
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-[98px] lg:mb-0 w-full sm:max-w-lg bg-[#1f1f1f] basis-2/4 borderStyle rounded-t-xl "
              >
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
                          type="button"
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
                          type="button"
                          onClick={() => {
                            setHomergemLoading(true);
                            handleStaking();
                          }}
                          className="w-full px-3 py-3 text-[#141414] font-semibold rounded-md  bg-[#f6e58d]  focus:bg-[#f6e58d] focus:text-[#141414] focus:outline-none  border border-[#f6e58d] hover:bg-[#141414] hover:text-[#f6e58d]"
                        >
                          Stake Your HomerGem
                        </button>
                      )}

                      <h2 className="text-xl font-semibold my-4 text-center">
                        Or
                      </h2>
                      {stakesLoading ? (
                        <button
                          type="button"
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
                          type="button"
                          className="w-full px-3 py-3 text-[#141414] font-semibold rounded-md  bg-[#f6e58d]  focus:bg-[#f6e58d] focus:text-[#141414] focus:outline-none  border border-[#f6e58d] hover:bg-[#141414] hover:text-[#f6e58d]"
                          onClick={() => {
                            setStakesLoading(true);
                            getYourStakes();
                          }}
                        >
                          Get Your Stakes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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

      {/* in progress modal */}
      <Modal show={showModal} cross={true} onClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Staking;
