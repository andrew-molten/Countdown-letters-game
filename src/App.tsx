import './App.css'
import ChooseLettersButtons from './components/ChooseLettersButtons'

function App() {
  return (
    <>
      <h1>Countdown letters</h1>
      <ChooseLettersButtons />

      {/* 
        1. Allow the user to choose Consonants/Vowels 
          - create a button for each
          - choose randomly from the appropriate array
          - update state - with current letters & number of letters chosen



        2. Program should automatically identify the longest possible English word in each round and score the appropriate number of points for the round.
        3. POINTS - 1 point per letter or 18 points if they have used all 9
        4. Allow for 4 rounds to be played
        5. Keep track of total points scored
      
      */}
    </>
  )
}

export default App
