import { useState } from 'react'
import './App.css'
import ChooseLetters from './components/ChooseLetters'
import { LettersChosen } from './models'
import DisplayLetters from './components/DisplayLetters'
import LongestWord from './components/LongestWord'

function App() {
  const [lettersChosen, setLettersChosen] = useState<LettersChosen>({
    letters: [],
    numLetters: 0,
  })

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Countdown letters</h1>
      {lettersChosen.numLetters < 9 && (
        <ChooseLetters
          lettersChosen={lettersChosen}
          setLettersChosen={setLettersChosen}
        />
      )}

      <DisplayLetters lettersChosen={lettersChosen} />
      {lettersChosen.numLetters === 9 && (
        <LongestWord lettersChosen={lettersChosen} />
      )}

      {/* 
        1. Allow the user to choose Consonants/Vowels 
          - create a button for each
          - choose randomly from the appropriate array
          - update state - with current letters & number of letters chosen



        2. Program should automatically identify the longest possible English word in each round and score the appropriate number of points for the round.
          Possible approaches:
            - ask Gemini what the longest English word is - not a technical way to solve - also hallucinates
            - find a wordfinder API
            - download a list of words & write code to find the longest word

        3. POINTS - 1 point per letter or 18 points if they have used all 9
        4. Allow for 4 rounds to be played
        5. Keep track of total points scored
      
      */}
    </>
  )
}

export default App
