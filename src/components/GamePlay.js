import React,{useState, useEffect, useContext} from 'react';
import SiteContext from "../SiteContext";
function GamePlay({finished}){

    function hideQuestion() {
        console.log("I have hidden the word and enabled the text box")
        setInputDisabled(false)
        setDisplayWord(false)
    }

    const [displayWord, setDisplayWord]= useState(true);
    useEffect(()=>{
        console.log("Running useEffect")
        setTimeout(hideQuestion,5000)


    },[displayWord])

    const [state, dispatch] = useContext(SiteContext);

    console.log("CURR LISTS:", state.currentLists)
    console.log("INDEX:", state.selectedListIndex)


    const [words, updateWords] = useState([...state.currentLists[state.selectedListIndex].listWords])
    const [answer, updateAnswer] = useState('');
    const [displayCorrect, updateDisplayCorrect] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(true);

    let [currentWord, updateCurrentWord] = useState()
    
    const nextWord = () => {
      updateCurrentWord(words[0])
      console.log("Choosen word", currentWord)
      updateWords(words.slice(1))
    }

    if(!currentWord) nextWord()

    
    const answerHandler = (event) => {
        updateAnswer(event.target.value)
        console.log("Checking answer", event.target.value)
        if(event.target.value === currentWord) {
          console.log("In the checker")
          updateDisplayCorrect(true)
          setTimeout(()=>{
            // Display "Correct" for 3s then reset.
            updateDisplayCorrect(false)
            console.log("words length: ", words.length);
            if(words.length===0){
                finished();
                return;
            }
            nextWord();
            setDisplayWord(true);
            setInputDisabled(true);
            updateAnswer("");
          }, 3000)
        }
    }

    const remindHandler = () => {
      setDisplayWord(true);
      setInputDisabled(true);
      setTimeout(hideQuestion,5000);
    }
  
	return (
        <>
            <div> 
                {(displayWord) ? currentWord : "Now type that!"}
            </div>
            <div id="result">
                {(displayCorrect) ? "Correct!" : ""}
            </div>
            <input type="text" id="answer" onChange={(event) => answerHandler(event)} disabled={inputDisabled} value={answer}></input>
            <button onClick={() =>remindHandler()}>Remind me</button>
            
        </>
    )
}

export default GamePlay