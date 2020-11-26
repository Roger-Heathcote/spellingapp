function updateState(state, command) {
  const newState = JSON.parse(JSON.stringify(state));	
  switch(command.type) {
    case 'Update Age': {
      const { age } = command;
      newState.age = age;
      return newState;
    }
  
    case 'Update List Index': {
      const { listIndex } = command;
      newState.selectedListIndex = listIndex;
      return newState;
    }


  }
}

export default updateState;