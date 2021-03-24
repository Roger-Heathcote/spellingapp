import React from 'react';
import SiteContext from "../SiteContext";

function WordList({ listHandler, goBack }){

  const [state, dispatch] = React.useContext(SiteContext)

  const shortList = state.currentLists.filter(list=>{
    return state.age >= list.minAge && state.age <= list.maxAge
  })

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <h1>HELLO</h1>
      <ul aria-label="list of word lists">
      {shortList.map( (list, index) => 
         <li key={index} onClick={(e) => listHandler(list.id)}>{list.listName}</li>
      )}
      </ul>
      
    </div>
    
  )
}

export default WordList