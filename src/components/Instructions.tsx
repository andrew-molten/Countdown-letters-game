interface Props {
  handleInstructions: () => void
}

function Instructions({ handleInstructions }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-90 h-full text-white pt-10">
      <h1 className="text-3xl mb-3 relative">
        Instructions{' '}
        <button
          className="absolute top-0 right-5 bg-indigo-300 py-1 px-3 rounded-full text-base text-white"
          onClick={handleInstructions}
        >
          X
        </button>
      </h1>
      <div className="px-10 pt-10 text-xl  md:px-40 text-left">
        <p className=" mb-5 ">Games are 4 rounds long,</p>
        <p className=" mb-5 ">
          {' '}
          Each round choose 9 letters, of which you will try to make the longest
          possible english word,
        </p>
        <p className=" mb-5 ">
          {' '}
          Each letter you choose can be a random Consonant or Vowel,
        </p>
        <p className=" mb-5 "> Then 30 seconds is on the clock,</p>
        <p className=" mb-5 ">
          {' '}
          Submit your answer before the clock hits 0 or you won't get any
          points.
        </p>
        <p className=" mb-5 ">
          {' '}
          Your word must be in the webster dictionary to get awarded points💎,
        </p>
        <p className=" mb-5 ">
          You face the impossible task of playing against the dictionary, at
          best you can be tied for a win!
        </p>
        <p className=" mb-5 ">
          {' '}
          But I've also added a high score, so on your next game you can play
          against yourself,
        </p>
        <p className=" mb-5 ">Good Luck!</p>
      </div>
    </div>
  )
}

export default Instructions
