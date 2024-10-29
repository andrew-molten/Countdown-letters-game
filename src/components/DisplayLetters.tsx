import { LettersChosen } from '../models.ts'

interface Props {
  lettersChosen: LettersChosen
}

function DisplayLetters({ lettersChosen }: Props) {
  return (
    <div>
      <p className="text-2xl">Your letters:</p>
      <p className="text-5xl mt-2">{lettersChosen.letters.join(' ')}</p>
    </div>
  )
}
export default DisplayLetters
