import { LettersChosen } from '../models.ts'
import { constonants, vowels } from '../data/letters.ts'

interface Props {
  lettersChosen: LettersChosen
  setLettersChosen: React.Dispatch<React.SetStateAction<LettersChosen>>
}

function ChooseLetters({ lettersChosen, setLettersChosen }: Props) {
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
      <button className="btn  bg-violet-400" onClick={chooseConstonant}>
        Consonant
      </button>
      <p className="inline text-xl">or a</p>
      <button className="btn  bg-violet-400" onClick={chooseVowel}>
        Vowel
      </button>
      <p className="inline text-xl">?</p>
    </div>
  )
}

export default ChooseLetters
