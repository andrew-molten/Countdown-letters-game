import { LettersChosen } from '../models'
import englishWords from '../data/englishWords.json' // from https://github.com/dwyl/english-words/tree/master
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
  for (const [key] of Object.entries(englishWords)) {
    if (key.length <= 9) {
      englishWordsArray.push(key)
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

  function checkWord(arr: string[], thisWord: string) {
    if (wordsWithChosenLetters.includes(thisWord) && !arr.includes(thisWord)) {
      arr.push(thisWord)
    }
  }

  for (let i = 0; i < letters.length; i++) {
    const thisWord = letters[i]
    checkWord(oneLetterWords, thisWord)
    for (let j = 0; j < letters.length; j++) {
      if (i === j) continue
      const thisWord = `${letters[i]}${letters[j]}`
      checkWord(twoLetterWords, thisWord)
      for (let k = 0; k < letters.length; k++) {
        if (k === i || k === j) continue
        const thisWord = `${letters[i]}${letters[j]}${letters[k]}`
        checkWord(threeLetterWords, thisWord)
        for (let l = 0; l < letters.length; l++) {
          if (l === i || l === j || l === k) continue
          const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}`
          checkWord(fourLetterWords, thisWord)
          for (let m = 0; m < letters.length; m++) {
            if (m === i || m === j || m === k || m === l) continue
            const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}`
            checkWord(fiveLetterWords, thisWord)

            for (let n = 0; n < letters.length; n++) {
              if (n === i || n === j || n === k || n === l || n === m) continue
              const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}${letters[n]}`
              checkWord(sixLetterWords, thisWord)

              for (let o = 0; o < letters.length; o++) {
                if (
                  o === i ||
                  o === j ||
                  o === k ||
                  o === l ||
                  o === m ||
                  o === n
                )
                  continue
                const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}${letters[n]}${letters[o]}`
                checkWord(sevenLetterWords, thisWord)
                for (let p = 0; p < letters.length; p++) {
                  if (
                    p === i ||
                    p === j ||
                    p === k ||
                    p === l ||
                    p === m ||
                    p === n ||
                    p === o
                  )
                    continue
                  const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}${letters[n]}${letters[o]}${letters[p]}`
                  checkWord(eightLetterWords, thisWord)
                  for (let q = 0; q < letters.length; q++) {
                    if (
                      q === i ||
                      q === j ||
                      q === k ||
                      q === l ||
                      q === m ||
                      q === n ||
                      q === o ||
                      q === p
                    )
                      continue
                    const thisWord = `${letters[i]}${letters[j]}${letters[k]}${letters[l]}${letters[m]}${letters[n]}${letters[o]}${letters[p]}${letters[q]}`
                    checkWord(nineLetterWords, thisWord)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // console.log(threeLetterWords.length)
  // console.log(fourLetterWords.length)
  // console.log(fiveLetterWords.length)
  // console.log(sixLetterWords.length)
  // console.log(sevenLetterWords.length)
  // console.log(eightLetterWords.length)
  // console.log(nineLetterWords.length)

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
