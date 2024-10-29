import { LettersChosen } from '../models'

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  console.log(lettersChosen)
  return (
    <div>
      <p className="text-2xl mt-5">
        The longest word is: {lettersChosen.letters}
      </p>
    </div>
  )
}

export default LongestWord
