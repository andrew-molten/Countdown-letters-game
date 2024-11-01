import { useEffect, useState } from 'react'

interface Props {
  timer: number
  usersAnswer: string
  usersWordIsInDictionary: React.MutableRefObject<boolean>
  usersPoints: number
  setUsersPoints: React.Dispatch<React.SetStateAction<number>>
}

function RoundSummary({
  timer,
  usersAnswer,
  usersWordIsInDictionary,
  usersPoints,
  setUsersPoints,
}: Props) {
  const [thisRoundPoints, setThisRoundPoints] = useState(0)

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
  }, [setUsersPoints, usersAnswer.length, usersPoints, usersWordIsInDictionary])

  return (
    <div>
      {timer === 0 && usersAnswer === '' && (
        <p className="text-3xl text-red-500">Oops sorry you took too long!</p>
      )}
      <p className="text-3xl mt-10">
        You earned {thisRoundPoints} points this round with {usersAnswer}!
      </p>
    </div>
  )
}

export default RoundSummary
