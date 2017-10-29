import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

function reduceEditor (state, action) {

}

function reduceEditors (state, action) {
  const newState = Object.assign({}, state)

  if (action.targetEditor) {
    newState[targetEditor] = reduceEditor(newState[targetEditor], action)
  }

  return newState
}

export default combineReducers({
  editors: reduceEditors,
})
