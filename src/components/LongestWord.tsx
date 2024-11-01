import { LettersChosen, WordsByLength } from '../models'
// import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master
// Removed above dictionary as it had some questionable words
import { websterDictionary } from '../data/websterDictionary' // from https://github.com/matthewreagan/WebstersEnglishDictionary/blob/master/dictionary.json
import { alphabet } from '../data/letters'

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  const letters = lettersChosen.letters
  const nonLetters = alphabet.filter((letter) => !letters.includes(letter))
  const nineLetterWords = []
  const wordsByLength: WordsByLength = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  // Remove words with length > 9
  for (const word of websterDictionary) {
    if (word.length <= 9) {
      nineLetterWords.push(word)
    }
  }

  // Remove words with non-letters
  const chosenLetterWords = nineLetterWords.filter((word) => {
    for (const letter of nonLetters) {
      if (word.includes(letter)) {
        return false
      }
    }
    return true
  })

  function generatePossibleWords(currentWord = '', usedIndices: number[] = []) {
    for (let i = 0; i < letters.length; i++) {
      // skip if already used
      if (usedIndices.includes(i)) continue
      const newWord = currentWord + letters[i]
      checkWordExists(newWord)
      // End loop if all 9 letters have been used
      if (usedIndices.length < 9) {
        generatePossibleWords(newWord, [...usedIndices, i])
      }
    }
  }

  function checkWordExists(currentWord: string) {
    const arrayByWordLength =
      wordsByLength[currentWord.length as keyof typeof wordsByLength]
    if (
      chosenLetterWords.includes(currentWord) &&
      !arrayByWordLength.includes(currentWord)
    ) {
      arrayByWordLength.push(currentWord)
    }
  }

  function returnLongestWords() {
    let longestWords: string[] = []
    let longestWordLength = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(wordsByLength)) {
      if (value.length > 0 && value[0].length > longestWordLength) {
        longestWords = value
        longestWordLength = value[0].length
      }
    }
    return longestWords
  }

  generatePossibleWords()
  const longestWords = returnLongestWords()

  // If timer === 0 && usersAnswer === "" - Sorry you ran out of time!

  return (
    <div>
      {longestWords && longestWords.length > 1 && (
        <p className="text-2xl mt-5">
          The longest possible words are: {longestWords.join(', ')}
        </p>
      )}
      {longestWords && longestWords.length === 1 && (
        <p className="text-2xl mt-5">
          The longest possible word is: {longestWords[0]}
        </p>
      )}
      {!longestWords && (
        <p className="text-2xl mt-5">
          Hmm.. we can't make any words with those letters
        </p>
      )}
    </div>
  )
}

export default LongestWord
