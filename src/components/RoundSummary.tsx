import { useEffect, useState } from 'react'

interface Props {
  timer: number
  usersAnswer: string
  usersWordIsInDictionary: React.MutableRefObject<boolean>
  usersPoints: number
  setUsersPoints: React.Dispatch<React.SetStateAction<number>>
  roundNumber: number
  startNewRound: () => void
}

function RoundSummary({
  timer,
  usersAnswer,
  usersWordIsInDictionary,
  usersPoints,
  setUsersPoints,
  roundNumber,
  startNewRound,
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
      setUsersPoints(usersPoints + points)
      setBeenCalculated(true)
    }

    calculatePoints()
  }, [usersAnswer])

  return (
    <div>
      {timer === 0 && usersAnswer === '' && (
        <p className="text-3xl text-red-500">Oops sorry you took too long!</p>
      )}
      {usersAnswer !== '' && !usersWordIsInDictionary.current && (
        <p className="text-3xl text-red-500  mt-10">
          Oops '{usersAnswer}' isn't in the dictionary! You got 0 points this
          round, better luck next time!
        </p>
      )}
      {beenCalculated && (
        <>
          {thisRoundPoints! > 0 && (
            <p className="text-3xl mt-10">
              You earned {thisRoundPoints} points this round with {usersAnswer}!
            </p>
          )}

          {roundNumber < 4 && (
            <button className="btn bg-indigo-500" onClick={startNewRound}>
              Start round {roundNumber + 1}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default RoundSummary
