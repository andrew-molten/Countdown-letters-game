import { useRef, useState } from 'react'
import './App.css'
import ChooseLetters from './components/ChooseLetters'
import { LettersChosen } from './models'
import DisplayLetters from './components/DisplayLetters'
import UserInput from './components/UserInput'
import LongestWord from './components/LongestWord'
import RoundSummary from './components/RoundSummary'

function App() {
  const [lettersChosen, setLettersChosen] = useState<LettersChosen>({
    letters: [],
    numLetters: 0,
  })
  const [timer, setTimer] = useState(30)
  const [usersAnswer, setUsersAnswer] = useState('')
  const [usersPoints, setUsersPoints] = useState(0)
  const [roundNumber, setRoundNumber] = useState(1)
  const [userWon, setUserWon] = useState(false)
  const usersWordIsInDictionary = useRef(false)

  function startNewRound() {
    setLettersChosen({
      letters: [],
      numLetters: 0,
    })
    setTimer(30)
    setUsersAnswer('')
    setRoundNumber(roundNumber + 1)
    usersWordIsInDictionary.current = false
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Countdown letters</h1>
      <h2 className="text-2xl font-bold mb-10">
        Round {roundNumber}, Points: {usersPoints}
      </h2>
      {lettersChosen.numLetters < 9 && (
        <ChooseLetters
          lettersChosen={lettersChosen}
          setLettersChosen={setLettersChosen}
        />
      )}

      <DisplayLetters lettersChosen={lettersChosen} />
      {lettersChosen.numLetters === 9 && usersAnswer === '' && (
        <UserInput
          lettersChosen={lettersChosen}
          timer={timer}
          setTimer={setTimer}
          setUsersAnswer={setUsersAnswer}
        />
      )}
      {usersAnswer !== '' && (
        <>
          {' '}
          <LongestWord
            lettersChosen={lettersChosen}
            usersAnswer={usersAnswer}
            usersWordIsInDictionary={usersWordIsInDictionary}
            userWon={userWon}
            setUserWon={setUserWon}
          />
          <RoundSummary
            timer={timer}
            usersAnswer={usersAnswer}
            usersWordIsInDictionary={usersWordIsInDictionary}
            usersPoints={usersPoints}
            setUsersPoints={setUsersPoints}
            roundNumber={roundNumber}
            startNewRound={startNewRound}
          />
        </>
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

        3. Have a timer that lets the user enter their longest word based on selected letters - before the timer runs out
            - limit the letters used
            - button to submit word
            - 'Oops sorry you took too long' message
            - check the word against the dictionary

        4. POINTS - 1 point per letter or 18 points if they have used all 9
        5. Allow for 4 rounds to be played
        6. Keep track of total points scored
        7. Update readme

        - need to do an end of game round up

        // BUGS
         - User should be able to submit an answer by pushing enter
         - Show an error message if the answer is not in the dictionary
         - Calculate the computers score or total possible points
      
      */}
    </>
  )
}

export default App
