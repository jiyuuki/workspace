const uuid = () => {
  return Math.random().toString(32).slice(4)
}

const saveStatePlugin = (store) => {
  store.subscribe(
    (mutations, state) => {
      localStorage.setItem(
        'workspace',
        JSON.stringify(state.workspace)
      )
    }
  )
}

export { uuid, saveStatePlugin }
