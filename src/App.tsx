import { useRef, useState } from 'react'
import './App.css'
import ChooseLetters from './components/ChooseLetters'
import { LettersChosen } from './models'
import DisplayLetters from './components/DisplayLetters'
import UserInput from './components/UserInput'
import LongestWord from './components/LongestWord'
import RoundSummary from './components/RoundSummary'
import EndGame from './components/EndGame'

function App() {
  const [lettersChosen, setLettersChosen] = useState<LettersChosen>({
    letters: [],
    numLetters: 0,
  })
  const [timer, setTimer] = useState(30)
  const [usersAnswer, setUsersAnswer] = useState('')
  const [userScore, setUserScore] = useState(0)
  const [roundNumber, setRoundNumber] = useState(1)
  const [roundEnded, setRoundEnded] = useState(false)
  const [userWon, setUserWon] = useState(false)
  const usersWordIsInDictionary = useRef(false)
  const longestWordLength = useRef(0)
  const [gameEnded, setGameEnded] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [dictionaryScore, setDictionaryScore] = useState(0)

  function startNewRound(newRoundNumber: number) {
    setLettersChosen({
      letters: [],
      numLetters: 0,
    })
    setTimer(30)
    setUsersAnswer('')
    setRoundNumber(newRoundNumber)
    usersWordIsInDictionary.current = false
    setRoundEnded(false)
  }

  function finishGame() {
    setGameEnded(true)
  }

  function startNewGame() {
    startNewRound(1)
    setGameEnded(false)
    setUserScore(0)
    setDictionaryScore(0)
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Countdown letters</h1>
      {!gameEnded && (
        <>
          <h2 className="text-3xl font-bold mb-10">Round {roundNumber}</h2>
          <h2 className="text-2xl font-bold mb-10">
            Your 💎: <span className="text-3xl">{userScore}</span> - - -
            Dictionary's 💎: {dictionaryScore}
          </h2>
          {lettersChosen.numLetters < 9 && (
            <ChooseLetters
              lettersChosen={lettersChosen}
              setLettersChosen={setLettersChosen}
            />
          )}

          <DisplayLetters lettersChosen={lettersChosen} />
          {lettersChosen.numLetters === 9 && !roundEnded && (
            <UserInput
              lettersChosen={lettersChosen}
              timer={timer}
              setTimer={setTimer}
              setUsersAnswer={setUsersAnswer}
              setRoundEnded={setRoundEnded}
            />
          )}
          {roundEnded && (
            <>
              {' '}
              <LongestWord
                lettersChosen={lettersChosen}
                usersAnswer={usersAnswer}
                usersWordIsInDictionary={usersWordIsInDictionary}
                userWon={userWon}
                setUserWon={setUserWon}
                longestWordLength={longestWordLength}
              />
              <RoundSummary
                timer={timer}
                usersAnswer={usersAnswer}
                usersWordIsInDictionary={usersWordIsInDictionary}
                longestWordLength={longestWordLength}
                userScore={userScore}
                setUserScore={setUserScore}
                dictionaryScore={dictionaryScore}
                setDictionaryScore={setDictionaryScore}
                roundNumber={roundNumber}
                startNewRound={startNewRound}
                finishGame={finishGame}
              />
            </>
          )}
        </>
      )}
      {roundNumber === 4 && gameEnded && (
        <EndGame
          userScore={userScore}
          dictionaryScore={dictionaryScore}
          highScore={highScore}
          setHighScore={setHighScore}
          startNewGame={startNewGame}
        />
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

        X need to do an end of game round up

        // BUGS
         X User should be able to submit an answer by pushing enter
         X Show an error message if the answer is not in the dictionary
         X If the user doesn't enter anything
         X Calculate the computers score or total possible points
         X Finish the game and ask for another
         - Welcome to Countdown Letters
        
      
      */}
    </>
  )
}

export default App
