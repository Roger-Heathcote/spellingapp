function updateState(state, command) {
  const newState = JSON.parse(JSON.stringify(state));	
  switch(command.type) {
    case 'Update Age': {
      const { age } = command;
      newState.age = age;
      return newState;
    }
  
    case 'Update List Id': {
      const { listId } = command;
      const idx = newState.currentLists.findIndex( (i)=>i.id === listId)
      // console.log("NEW INDEX IS:", idx)
      newState.selectedListIndex = idx;
      return newState;
    }


  }
}

export default updateState;