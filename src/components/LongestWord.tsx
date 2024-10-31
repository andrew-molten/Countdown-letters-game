import { LettersChosen } from '../models'
import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master
import { alphabet } from '../data/letters'

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  const eligibleWords = []

  // lettersChosen.letters
  const letters = ['g', 'i', 't', 'e', 'q', 'i', 'd', 'v', 'u']

  const nonLetters = alphabet.filter((letter) => !letters.includes(letter))

  // const gWords = []
  // for (const letter of letters) {

  const englishWordsArray = []

  // Remove words longer than 9 letters
  for (const [key] of Object.entries(englishWords)) {
    if (key.length <= 9) {
      englishWordsArray.push(key)
    }
  }
  console.log(englishWordsArray.length)

  // Remove words containing letters that are not in lettersChosen
  const removedNonLetters = englishWordsArray.filter((word) => {
    for (const letter of nonLetters) {
      if (word.includes(letter)) {
        return false
      }
    }
    return true
  })

  console.log(removedNonLetters.length)

  // POSSIBLE NEXT STEPS
  // - Iterate over the words from longest possible , to check if they exist
  // - Or remove words containing more of some letters than lettersChosen has

  // for (const word of removedNonLetters) {
  // }

  // for (let i = 0; i < letters.length; i++) {
  //   for (let j = 0; j < letters.length; j++) {
  //     for (let k = 0; k < letters.length; k++) {
  //       for (let l = 0; l < letters.length; l++) {
  //         for (const word of removedNonLetters) {
  //           if (i === j) continue
  //           if (k === j) continue
  //           if (k === i) continue
  //           if (l === j) continue
  //           if (l === i) continue
  //           if (l === k) continue

  //           if (
  //             word.startsWith(
  //               `${letters[i]}${letters[j]}${letters[k]}${letters[l]}`
  //             )
  //           ) {
  //             eligibleWords.push(word)
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log(eligibleWords.length)
  // console.log(eligibleWords)

  return (
    <div>
      <p className="text-2xl mt-5">
        The longest word is: {lettersChosen.letters}
      </p>
    </div>
  )
}

export default LongestWord
