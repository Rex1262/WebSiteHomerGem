import img from "/Homer.svg";

function Content() {
  return (
    <>
      <div
        id="homepagecontent"
        className="flex flex-col items-center lg:grid lg:grid-cols-2  pt-18"
      >
        <div className="p-4 w-full">
          <img className="h-fit" src={img} alt="Logo" />
        </div>
        <div className="p-4 h-fit sm:ml-10">
          <p id="heading" className="font-bold text-3xl mt-16">
            INTRODUCTION
          </p>
          <div id="paragraph" className="mt-5 w-full max-w-[560px] text-lg">
            <p>
              The HomerGem is decentralized token is a cryptocurrency created in
              honor of one of the most popular animated series in history - The
              Simpsons. This token was created so that fans of the animated
              series could exchange them among themselves as collectibles and
              investments.
            </p>
            <p>
              The HomerGem token was created on the BSC blockchain platform and
              has a unique set of properties that make it special. First, each
              token has a unique design that depicts characters from The
              Simpsons. Secondly, the Homer token is decentralized, which means
              that it is not controlled by any central authority, but is managed
              by the community of its holders.
            </p>
            <p>
              Holders of the HomerGem token can use it to buy and sell other
              cryptocurrencies, goods and services, as well as to participate in
              voting on issues related to the development of the project. In
              addition, the Homer Gem token can be used as an investment, as its
              value can change depending on the demand for it.
            </p>
            <p>
              In general, the HomerGem token is a unique project that brings
              together fans of the animated series The Simpsons and crypto
              investors, giving them the opportunity to enjoy collecting tokens
              and at the same time earn on their growth in value.
            </p>
          </div>
        </div>
      </div>
      <div className="tokenomics_container  px-8 py-8">
        <p id="heading" className="font-bold text-3xl tokenomicsheading">
          HomerGem Tokenomics
        </p>
        <div id="paragraph" className="mt-5 w-full text-lg">
          <p>
            HomerGem (HG) is a Binance Smart Chain token with a total supply of
            3,000,000,000,000. In each transaction, 1% of the token is
            permanently removed from circulation through burning. This mechanism
            gradually reduces the circulating supply over time. Additionally, 3%
            of the transaction funds are allocated to a dedicated marketing
            wallet, which supports comprehensive promotional campaigns and
            increases awareness for HomerGem. Another 3% is directed to a
            liquidity address, enhancing trading liquidity and ensuring a
            seamless experience for token holders.
          </p>{" "}
          <br />
          <p>
            Furthermore, the HomerGem administration is actively developing a
            staking functionality to provide HG holders with an opportunity to
            earn attractive rewards. By staking their HG tokens, holders
            actively contribute to the network's security and stability while
            receiving additional tokens as incentives. Staking rewards serve as
            a powerful incentive for long-term engagement, fostering community
            participation, and driving the growth of the HomerGem ecosystem.
          </p>{" "}
          <br />
          <p className="break-words">
            To interact with HomerGem, the token address is :  &nbsp; 
            <span className="break-words font-bold">
               0xE8FDAF419A086D3B48d7d8C23C22B0CE28a79488
            </span>
            .
          </p>{" "}
          <br />
          <p>
            Stay tuned for forthcoming updates on the staking launch as the
            HomerGem administration remains dedicated to delivering a
            user-friendly and rewarding staking experience. These ongoing
            developments aim to empower HG token holders, stimulate community
            growth, and strengthen the overall HomerGem ecosystem.
          </p>
        </div>
      </div>
    </>
  );
}

export default Content;
