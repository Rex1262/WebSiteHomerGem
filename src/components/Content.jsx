import img from "/Homer.svg";

function Content() {
  return (
    <div id="content" className="grid grid-cols-2  pt-18">
      <div className="p-4 w-full">
        <img className="h-fit" src={img} alt="Logo" />
      </div>
      <div className="p-4 h-fit sm:ml-10">
        <p id="heading" className="font-bold text-3xl mt-16">
          INTRODUCTION
        </p>
        <div id="paragraph" className="mt-5 w-full max-w-[560px] text-lg">
          <p>
            The Homer Gem is decentralized token is a cryptocurrency created in
            honor of one of the most popular animated series in history - The
            Simpsons. This token was created so that fans of the animated series
            could exchange them among themselves as collectibles and
            investments.
          </p>
          <p>
            The Homer token was created on the BSC blockchain platform and has a
            unique set of properties that make it special. First, each token has
            a unique design that depicts characters from The Simpsons. Secondly,
            the Homer token is decentralized, which means that it is not
            controlled by any central authority, but is managed by the community
            of its holders.
          </p>
          <p>
            Holders of the Homer token can use it to buy and sell other
            cryptocurrencies, goods and services, as well as to participate in
            voting on issues related to the development of the project. In
            addition, the Homer Gem token can be used as an investment, as its
            value can change depending on the demand for it.
          </p>
          <p>
            In general, the Homer token is a unique project that brings together
            fans of the animated series The Simpsons and crypto investors,
            giving them the opportunity to enjoy collecting tokens and at the
            same time earn on their growth in value.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
