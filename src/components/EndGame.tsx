interface Props {
  usersPoints: number
  highScore: number
  setHighScore: React.Dispatch<React.SetStateAction<number>>
  startNewGame: () => void
}

function EndGame({
  usersPoints,
  highScore,
  setHighScore,
  startNewGame,
}: Props) {
  function updateHighScore() {
    if (usersPoints > highScore) {
      setHighScore(usersPoints)
    }
  }

  updateHighScore()

  return (
    <>
      {usersPoints === highScore && (
        <h1 className="text-2xl mb-10">
          Woohoo you got a new high score of {usersPoints}!
        </h1>
      )}
      {usersPoints !== highScore && (
        <>
          <h1 className="text-2xl mb-10">Nice one, you made it</h1>
          <h2 className="text-2xl mb-10">
            Your final score was: {usersPoints}
          </h2>
          <h3 className="text-2xl mb-10">
            High score: {highScore} - keep on trying!
          </h3>
        </>
      )}
      <button className="btn bg-indigo-500" onClick={startNewGame}>
        Ready to play again?
      </button>
    </>
  )
}

export default EndGame
