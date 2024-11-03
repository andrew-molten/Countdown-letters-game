interface Props {
  userScore: number
  dictionaryScore: number
  highScore: number
  setHighScore: React.Dispatch<React.SetStateAction<number>>
  startNewGame: () => void
}

function EndGame({
  userScore,
  dictionaryScore,
  highScore,
  setHighScore,
  startNewGame,
}: Props) {
  function updateHighScore() {
    if (userScore > highScore) {
      setHighScore(userScore)
    }
  }

  updateHighScore()

  return (
    <>
      {/* New high score */}
      {userScore === highScore && (
        <>
          <h1 className="text-2xl mb-10">
            Woohoo you got a new high score of {userScore}!
          </h1>
          <h2 className="text-2xl mb-10">
            The dictionary got: {dictionaryScore}
          </h2>
        </>
      )}
      {/* No new high score */}
      {userScore !== highScore && (
        <>
          <h1 className="text-2xl mb-10">Nice one, you made it</h1>
          <h2 className="text-2xl mb-10 font-bold">
            Your final score was: {userScore}
          </h2>
          <h2 className="text-2xl mb-10">
            The dictionary's was: {dictionaryScore}
          </h2>
          <h3 className="text-2xl mb-10">
            High score: {highScore} - keep on trying!
          </h3>
        </>
      )}
      {/* Play again */}
      <button className="btn bg-indigo-500" onClick={startNewGame}>
        Ready to play again?
      </button>
    </>
  )
}

export default EndGame
