
exports.getEditorState = function getEditorState (state, editorId) {
  const editor = state.editors[editorId]
  const buffer = state.buffers[editor.bufferId]

  return {
    isLoading: buffer.state !== 'READY',
    isSaving: false,
    defaultData: buffer.data,
    filePath: buffer.filePath,
  }
}
