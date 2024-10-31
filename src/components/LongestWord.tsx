import { LettersChosen, WordsByLength } from '../models'
// import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master
import { websterDictionary } from '../data/websterDictionary' // from https://github.com/matthewreagan/WebstersEnglishDictionary/blob/master/dictionary.json
import { alphabet } from '../data/letters'

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  // lettersChosen.letters
  const letters = lettersChosen.letters

  const nonLetters = alphabet.filter((letter) => !letters.includes(letter))

  const englishWordsArray = []

  // Remove words longer than 9 letters
  // for (const [key] of Object.entries(englishWords)) {
  //   if (key.length <= 9) {
  //     englishWordsArray.push(key)
  //   }
  // }

  for (const word of websterDictionary) {
    if (word.length <= 9) {
      englishWordsArray.push(word)
    }
  }

  // Remove words containing letters that are not in lettersChosen
  const wordsWithChosenLetters = englishWordsArray.filter((word) => {
    for (const letter of nonLetters) {
      if (word.includes(letter)) {
        return false
      }
    }
    return true
  })

  // POSSIBLE STEPS
  // - Iterate over the words from longest possible , to check if they exist //
  // - Or remove words containing more of some letters than lettersChosen has //
  // - iterate over each word & check against lettersChosen //
  // have an array conataining the letterChosen inside For loop - if the letters match - pop one value off of the lettersChosen
  // - Create a list of possible words of different lengths

  const oneLetterWords: string[] = []
  const twoLetterWords: string[] = []
  const threeLetterWords: string[] = []
  const fourLetterWords: string[] = []
  const fiveLetterWords: string[] = []
  const sixLetterWords: string[] = []
  const sevenLetterWords: string[] = []
  const eightLetterWords: string[] = []
  const nineLetterWords: string[] = []

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

  function checkWord(currentWord: string) {
    const arr = wordsByLength[currentWord.length as keyof typeof wordsByLength]
    if (
      wordsWithChosenLetters.includes(currentWord) &&
      !arr.includes(currentWord)
    ) {
      arr.push(currentWord)
    }
  }

  // Refactor
  //  - use recursion as keyof typeof wordsByLength
  //  - How can I keep track of how many letters have been done - usedIndices.length

  function generateWords(currentWord = '', usedIndices: number[] = []) {
    for (let i = 0; i < letters.length; i++) {
      if (usedIndices.includes(i)) continue
      const newWord = currentWord + letters[i]
      checkWord(newWord)
      if (usedIndices.length < 9) {
        generateWords(newWord, [...usedIndices, i])
      }
    }
  }

  generateWords()
  console.log(wordsByLength)

  function returnLongestWords() {
    if (nineLetterWords.length > 0) {
      return nineLetterWords
    }
    if (eightLetterWords.length > 0) {
      return eightLetterWords
    }
    if (sevenLetterWords.length > 0) {
      return sevenLetterWords
    }
    if (sixLetterWords.length > 0) {
      return sixLetterWords
    }
    if (fiveLetterWords.length > 0) {
      return fiveLetterWords
    }
    if (fourLetterWords.length > 0) {
      return fourLetterWords
    }
    if (threeLetterWords.length > 0) {
      return threeLetterWords
    }
    if (twoLetterWords.length > 0) {
      return twoLetterWords
    }
  }

  const longestWords = returnLongestWords()

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
