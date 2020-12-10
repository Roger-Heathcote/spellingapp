import React,{useState, useEffect, useContext} from 'react';
import SiteContext from "../SiteContext";
function GamePlay({finished}){
    const [displayWord, setDisplayWord]= useState(true);
    useEffect(()=>{
        console.log("Running useEffect")
        setTimeout(setDisplayWord,5000, false)


    },[displayWord])

    const [state, dispatch] = useContext(SiteContext);

    console.log("CURR LISTS:", state.currentLists)
    console.log("INDEX:", state.selectedListIndex)


    const [words, updateWords] = useState([...state.currentLists[state.selectedListIndex].listWords])
    const [answer, updateAnswer] = useState('');
    const [displayCorrect, updateDisplayCorrect] = useState(false)
    let [currentWord, updateCurrentWord] = useState()
    
    const nextWord = () => {
        updateCurrentWord(words[0])
        console.log("Choosen word", currentWord)
        updateWords(words.slice(1))
    }

    if(!currentWord) nextWord()

    
    const answerHandler = (event) => {
        console.log("Checking answer", event.target.value)
        if(event.target.value === currentWord) {
          console.log("In the checker")
          updateDisplayCorrect(true)
          setTimeout(()=>{
            updateDisplayCorrect(false)
            console.log("words length: ", words.length);
            if(words.length===0){
                finished();
                return;
            }
            nextWord();
            setDisplayWord(true);
          }, 3000)
        }
    }
  
	return (
        <>
            <div> 
                {(displayWord) ? currentWord : "Now type that!"}
            </div>
            <div id="result">
                {(displayCorrect) ? "Correct!" : ""}
            </div>
            <input type="text" id="answer" onChange={(event) => answerHandler(event)}></input>
            
        </>
    )
}

export default GamePlay