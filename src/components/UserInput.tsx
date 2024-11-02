import React, { useRef, useState } from 'react'
import { LettersChosen } from '../models'

interface Props {
  lettersChosen: LettersChosen
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
  setUsersAnswer: React.Dispatch<React.SetStateAction<string>>
  setRoundEnded: React.Dispatch<React.SetStateAction<boolean>>
}

function UserInput({
  lettersChosen,
  timer,
  setTimer,
  setUsersAnswer,
  setRoundEnded,
}: Props) {
  const [usersWord, setUsersWord] = useState('')
  const [letterAvailable, setLetterAvailable] = useState(true)
  const availableLetters = useRef([...lettersChosen.letters])

  // start timer
  React.useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1), 1000)
    else setRoundEnded(true)
  }, [timer, setTimer])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Check word uses available letters
    const typedLetter = (event.nativeEvent as InputEvent).data
    const eventType = (event.nativeEvent as InputEvent).inputType

    if (eventType.includes('delete')) {
      handleDelete(event)
    }

    if (typedLetter !== null) {
      checkLetterAvailability(typedLetter)
    }
  }

  function checkLetterAvailability(letter: string) {
    if (availableLetters.current.includes(letter)) {
      const index = availableLetters.current.indexOf(letter)
      availableLetters.current.splice(index, 1)
      setUsersWord(usersWord + letter)
    } else {
      // Flash red
      setLetterAvailable(false)
      setTimeout(() => {
        setLetterAvailable(true)
      }, 500)
    }
  }

  function handleDelete(event: React.ChangeEvent<HTMLInputElement>) {
    const valueBefore = usersWord
    const valueBeforeAsArray = valueBefore.split('')
    setUsersWord(event.target.value)
    const valueAfter = event.target.value

    // Find the letter not in valueAfter
    valueBeforeAsArray.forEach((letter) => {
      if (!valueAfter.includes(letter)) {
        availableLetters.current.push(letter)
      }
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUsersAnswer(usersWord)
    setRoundEnded(true)
  }

  return (
    <div className={`text-3xl ${letterAvailable ? 'mb-14' : 'mb-0'}`}>
      {/* Timer */}
      <p className="mt-10">
        <span className="text-4xl text-red-500">{timer}</span> seconds to enter
        your longest word:
      </p>
      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={usersWord}
          onChange={(event) => handleChange(event)}
          className={`p-3 rounded-3xl text-xl bg-violet-400 mt-5 empty:outline-1 outline focus:outline-4 ${
            !letterAvailable && 'outline-red-500'
          }`}
        />
        <button className="btn bg-green-500">Submit</button>
      </form>
      {/* Letter not available error */}
      <p className="text-xl text-red-500">
        {!letterAvailable && `❌ You don't have that letter..`}
      </p>
    </div>
  )
}

export default UserInput
