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

  useEffect(() => {
    function calculatePoints() {
      if (usersWordIsInDictionary.current) {
        if (usersAnswer.length === 9) {
          setThisRoundPoints(18)
          setUsersPoints(usersPoints + 18)
        } else {
          const points = usersAnswer.length
          setThisRoundPoints(points)
          setUsersPoints(usersPoints + points)
        }
      }
    }

    calculatePoints()
  }, [usersAnswer])

  return (
    <div>
      {timer === 0 && usersAnswer === '' && (
        <p className="text-3xl text-red-500">Oops sorry you took too long!</p>
      )}
      {thisRoundPoints && (
        <>
          <p className="text-3xl mt-10">
            You earned {thisRoundPoints} points this round with {usersAnswer}!
          </p>

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
