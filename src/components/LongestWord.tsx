import { LettersChosen } from '../models'
import englishWords from '../data/englishWords.json'

interface Props {
  lettersChosen: LettersChosen
}

function LongestWord({ lettersChosen }: Props) {
  // const eligibleWords =[]

  // Test for words using all letters first & reduce by 1 letter if none are found

  for (const [key] of Object.entries(englishWords)) {
    if (key.includes('aals')) {
      console.log(key)
    }
  }
  // console.log(englishWords.filter((word) => word.includes('aard')))
  return (
    <div>
      <p className="text-2xl mt-5">
        The longest word is: {lettersChosen.letters}
      </p>
    </div>
  )
}

export default LongestWord
