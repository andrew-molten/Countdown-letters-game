import { useRef, useState } from 'react'
import { LettersChosen } from '../models'

interface Props {
  lettersChosen: LettersChosen
}

function UserInput({ lettersChosen }: Props) {
  const [usersWord, setUsersWord] = useState('')
  const availableLetters = useRef(lettersChosen.letters)

  // start timer

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // check that the word is using the correct letters
    const newLetter = (event.nativeEvent as InputEvent).data
    const eventType = (event.nativeEvent as InputEvent).inputType
    console.log(event)

    if (eventType.includes('delete')) {
      handleDelete(event)
    }

    if (newLetter === null) return
    checkLetter(newLetter)
    console.log(availableLetters)
    // setUsersWord(event.target.value)
  }

  function handleDelete(event: React.ChangeEvent<HTMLInputElement>) {
    const valueBefore = usersWord
    const arrayBefore = valueBefore.split('')
    setUsersWord(event.target.value)
    const valueAfter = event.target.value

    arrayBefore.forEach((letter) => {
      if (!valueAfter.includes(letter)) {
        availableLetters.current.push(letter)
      }
    })
  }

  function checkLetter(letter: string) {
    if (availableLetters.current.includes(letter)) {
      const index = availableLetters.current.indexOf(letter)
      availableLetters.current.splice(index, 1)
      setUsersWord(usersWord + letter)
    }
  }

  return (
    <div className="text-3xl mb-10">
      <p>Enter your longest word:</p>
      <input
        type="text"
        value={usersWord}
        onChange={(event) => handleChange(event)}
        // onBeforeInput={handleBeforeInput}
        className="p-3 rounded-3xl text-xl bg-violet-400 empty:outline-1 outline focus:outline-4"
      />
    </div>
  )
}

export default UserInput
