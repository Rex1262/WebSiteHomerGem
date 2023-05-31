import axios from "axios";
import { useEffect } from "react";
function CoinsChart() {

  const getChart = async () => {
    const targetUrl = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc';
    const query = `{
      factories(first: 5) {
        id
        poolCount
        txCount
        totalVolumeUSD
      }
      bundles(first: 5) {
        id
        ethPriceUSD
      }
    }`;
    const data = await axios.post(targetUrl, {query});
    console.log(data.data.data);
  }

  useEffect(() => {
    getChart();
  }, []);


  return (
<nav id="navbar">
      <div className="max-w-screen-xl flex items-center justify-center mx-auto p-2  sm:p-4 flex-col gap-5 lg:flex-row">
          {/* Top Three Buttons */}
        <div className="flex it
        ems-center gap-2 sm:gap-5">
          <div
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414]  "hover:text-[#f6e58d] rounded-full px-4 py-2`}
          onClick={getChart} 
          
          >
            Liquidity
          </div>
          <div
       
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414]  "hover:text-[#f6e58d] rounded-full px-4 py-2`}
          >
            MarketCap
          </div>
          <div
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414]  "hover:text-[#f6e58d] rounded-full px-4 py-2`}
          >
            Volume
          </div>  
          
        </div>
        </div>
<br />        
        {/* Info Section */}
        <div className="info_container">
           {/* ****** Uppert Cntainer ******* */}
           <div className="upper_container flex justify-between w-4/5 mx-auto bg-black text-white p-4 rounded-md">
            {/* Upper_Left */}
            <div className="upper_left flex items-center">
             <div className="token__logo_img">
                image
             </div>
             <div className="token_name_symbol">
              <p>TOKEN</p>
              <p>Token</p>
              </div>
            </div>
            {/* Upper_Right */}
             <div className="upper_right">
               <p>$2131</p>
               <p>+9.54%</p>
             </div>

           </div>

           {/* ****** Lower Container ******** */}
           
           <div className="lower_container w-4/5 flex bg-green-500  mx-auto mt-2 justify-between p-4 rounded-md">
            
            <div className="liquidity">
              <p>Liquidity</p>
              <p>$138319</p>
            </div>
            
            <div className="marketcap">
              <p>MCap</p>
              <p>$138319</p>
            </div>
            
            <div className="volume">
              <p>Volume</p>
              <p>$138319</p>
            </div>
            <div className="holders">
              <p>Holders</p>
              <p>16K</p>
            </div>
           </div>

        </div>

    </nav>
  );
}

export default CoinsChart;
