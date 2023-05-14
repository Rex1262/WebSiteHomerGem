import img from "/Homer.svg";

function Content() {
  return (
    <div id='content' className='grid grid-cols-2  pt-18'>
      <div className='p-4'>
        <img className='h-fit' src={img} alt='Logo' />
      </div>
      <div className='p-4 h-fit ml-10'>
        <p id='heading' className='font-bold text-3xl mt-16'>
          INTRODUCTION
        </p>
        <p id='paragraph' className='mt-5 w-96 text-lg'>
          Homer Gem, with the symbol "HG," is a new crypto token that offers a
          unique value proposition to its users. The token is named after the
          ancient Greek poet Homer, who was famous for his epic poems, including
          the Odyssey and the Iliad, which often dealt with themes of prophecy,
          fate, and divination. "Homer Gem" is designed to be a token of someone
          who predicted the future, and it aims to provide a platform for users
          to share their insights, predictions, and expertise in various fields,
          such as finance, politics, and technology, among others. With its
          innovative approach to tokenization and its focus on foresight and
          knowledge, "Homer Gem" has the potential to become a game-changer in
          the world of crypto and beyond.
        </p>
      </div>
    </div>
  );
}

export default Content;
