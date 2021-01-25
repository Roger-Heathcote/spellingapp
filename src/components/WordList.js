import React from 'react';
import SiteContext from "../SiteContext";

function WordList({ listHandler, goBack }){
    const [state, dispatch] = React.useContext(SiteContext)
    console.log("siteState:", state.currentLists[0].listName)

    const shortList = state.currentLists.filter(list=>{
        return state.age >= list.minAge && state.age <= list.maxAge
    })

    console.log("SHORTLIST:", shortList)
    // const handleOnClick = (index) => {
        
    // }
	return (
        <div>
            <button onClick={goBack}>Back</button>
            <h1>HELLO</h1>
            <ul>
            {shortList.map( (list, index) => 
                 <li key={index} onClick={(e) => listHandler(list.id)}>{list.listName}</li>
            )}
            </ul>
            
        </div>
        
    )
}

export default WordList