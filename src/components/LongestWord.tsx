import { LettersChosen, WordsByLength } from '../models'
// import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master
// Removed above dictionary as it had some questionable words
import { websterDictionary } from '../data/websterDictionary' // from https://github.com/matthewreagan/WebstersEnglishDictionary/blob/master/dictionary.json
import { alphabet } from '../data/letters'
import { useEffect } from 'react'

interface Props {
  lettersChosen: LettersChosen
  usersAnswer: string
  usersWordIsInDictionary: React.MutableRefObject<boolean>
  userWon: boolean
  setUserWon: React.Dispatch<React.SetStateAction<boolean>>
}

function LongestWord({
  lettersChosen,
  usersAnswer,
  usersWordIsInDictionary,
  userWon,
  setUserWon,
}: Props) {
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

  useEffect(() => {
    checkUsersAnswer()
  })

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

  function checkUsersAnswer() {
    isWordLongest()
    isWordInDictionary(usersAnswer)
  }

  function isWordLongest() {
    if (returnLongestWords().includes(usersAnswer)) {
      setUserWon(true)
    } else {
      setUserWon(false)
    }
  }

  function isWordInDictionary(word: string) {
    if (websterDictionary.includes(word)) {
      usersWordIsInDictionary.current = true
    } else {
      usersWordIsInDictionary.current = false
    }
  }

  generatePossibleWords()
  const longestWords = returnLongestWords()

  return (
    <div>
      {userWon && (
        <p className="text-2xl mt-10 text-green-600">
          You got the longest word!
        </p>
      )}
      {longestWords && longestWords.length > 1 && (
        <p className="text-2xl mt-10">
          <span className="font-bold">
            The longest possible words were {longestWords[0].length} letters
            long:
          </span>{' '}
          {longestWords.join(', ')}
        </p>
      )}
      {longestWords && longestWords.length === 1 && (
        <p className="text-2xl mt-10">
          <span className="font-bold">
            The longest possible word was {longestWords[0].length} letters long:
          </span>{' '}
          {longestWords[0]}
        </p>
      )}
      {!longestWords && (
        <p className="text-2xl mt-10">
          Hmm.. we can't make any words with those letters.
        </p>
      )}
    </div>
  )
}

export default LongestWord
