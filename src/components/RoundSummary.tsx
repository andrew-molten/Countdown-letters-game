import { useEffect, useState } from 'react'

interface Props {
  timer: number
  usersAnswer: string
  usersWordIsInDictionary: React.MutableRefObject<boolean>
  longestWordLength: React.MutableRefObject<number>
  userScore: number
  setUserScore: React.Dispatch<React.SetStateAction<number>>
  dictionaryScore: number
  setDictionaryScore: React.Dispatch<React.SetStateAction<number>>
  roundNumber: number
  startNewRound: (newRoundNumber: number) => void
  finishGame: () => void
}

function RoundSummary({
  timer,
  usersAnswer,
  usersWordIsInDictionary,
  longestWordLength,
  userScore,
  setUserScore,
  dictionaryScore,
  setDictionaryScore,
  roundNumber,
  startNewRound,
  finishGame,
}: Props) {
  const [thisRoundPoints, setThisRoundPoints] = useState<number>()
  const [beenCalculated, setBeenCalculated] = useState(false)

  useEffect(() => {
    function calculatePoints() {
      let points = 0 // word not in dictionary
      if (usersWordIsInDictionary.current) {
        if (usersAnswer.length === 9) {
          points = 18 // used all 9 letters
        } else {
          points = usersAnswer.length // 1 pt per letter
        }
      }
      setThisRoundPoints(points)
      setUserScore(userScore + points)
      setBeenCalculated(true)
      setDictionaryScore(dictionaryScore + longestWordLength.current)
    }

    calculatePoints()
  }, [usersAnswer])

  return (
    <div>
      {timer === 0 && usersAnswer === '' && (
        <p className="text-3xl text-red-500">Oops sorry you took too long!</p>
      )}

      {beenCalculated && (
        <>
          {/* Points summary */}
          {thisRoundPoints! > 0 && (
            <p className="text-3xl mt-10">
              You earned {thisRoundPoints} points this round with {usersAnswer}!
            </p>
          )}
          {/* No word entered */}
          {usersAnswer === '' && timer > 0 && (
            <p className="text-3xl mt-10">
              You didn't enter a word, no points for you!
            </p>
          )}
          {/* Word not in dictionary */}
          {usersAnswer !== '' && !usersWordIsInDictionary.current && (
            <p className="text-3xl text-red-500  mt-10">
              Oops '{usersAnswer}' isn't in the dictionary! You got 0 points
              this round, better luck next time!
            </p>
          )}
          {/* Start new round */}
          {roundNumber < 4 && (
            <button
              className="btn bg-indigo-500"
              onClick={() => startNewRound(roundNumber + 1)}
            >
              Start round {roundNumber + 1}
            </button>
          )}
          {/* Finish game */}
          {roundNumber === 4 && (
            <button className="btn bg-indigo-500" onClick={finishGame}>
              Finish game
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default RoundSummary
