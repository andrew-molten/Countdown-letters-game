import { LettersChosen } from '../models'
import { constonants, vowels } from '../data/letters.ts'

interface Props {
  lettersChosen: LettersChosen
  setLettersChosen: React.Dispatch<React.SetStateAction<LettersChosen>>
}

function ChooseLettersButtons({ lettersChosen, setLettersChosen }: Props) {
  const lettersLeft = 9 - lettersChosen.numLetters

  function chooseRandomLetter(array: string[]) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

  function chooseConstonant() {
    const constonant = chooseRandomLetter(constonants)
    setLetter(constonant)
  }

  function chooseVowel() {
    const vowel = chooseRandomLetter(vowels)
    setLetter(vowel)
  }

  function setLetter(letter: string) {
    // update state
    setLettersChosen({
      letters: [...lettersChosen.letters, letter],
      numLetters: lettersChosen.numLetters + 1,
    })
  }

  return (
    <div>
      <h1 className="text-3xl mb-3">
        {lettersLeft} letters left, do you want a
      </h1>
      <button className="btn" onClick={chooseConstonant}>
        Consonant
      </button>
      <p className="inline text-xl">or a</p>
      <button className="btn" onClick={chooseVowel}>
        Vowel
      </button>
      <p className="inline text-xl">?</p>
    </div>
  )
}

export default ChooseLettersButtons
