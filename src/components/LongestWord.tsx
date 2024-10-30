import { LettersChosen } from '../models'
import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  // const eligibleWords =[]

  // lettersChosen.letters
  const letters = ['g', 'i', 't', 'e', 'q', 'i', 'd', 'v', 'u']

  // How many words start with letter 0?
  // Can I iterate through each word to see if it includes all these letters

  const gWords = []
  // for (const letter of letters) {

  // Testing for 3 letters but the performance quickly shifts from 2 seconds to >10 seconds
  // Current ideas are:
  // - start running some iterations in the background while user chooses letters
  const i = 0
  console.log('start')
  for (let j = 0; j < letters.length; j++) {
    for (let k = 0; k < letters.length; k++) {
      for (const [key] of Object.entries(englishWords)) {
        if (i === j) continue
        if (k === j) continue
        if (k === i) continue
        if (key.startsWith(`${letters[i]}${letters[j]}`)) {
          gWords.push(key)
        }
      }
    }
  }
  console.log(gWords.length)

  return (
    <div>
      <p className="text-2xl mt-5">
        The longest word is: {lettersChosen.letters}
      </p>
    </div>
  )
}

export default LongestWord
