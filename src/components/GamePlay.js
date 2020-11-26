import React,{useState, useEffect, useContext} from 'react';
import SiteContext from "../SiteContext";
function GamePlay(){
    const [displayWord, setDisplayWord]= useState(true);
    useEffect(()=>{

        setTimeout(setDisplayWord,5000, false)

    },'')

    const [state, dispatch] = useContext(SiteContext);
    

    console.log("CURR LISTS:", state.currentLists)
    console.log("INDEX:", state.selectedListIndex)


    const [words, updateWords] = useState([...state.currentLists[state.selectedListIndex].listWords])

    console.log("WORDS:", words)

    let [currentWord, updateCurrentWord] = useState(words[0])
	return (
        <div> 
            {(displayWord) ? currentWord : "Now type that!"}
        </div>
        
    )
}

export default GamePlay