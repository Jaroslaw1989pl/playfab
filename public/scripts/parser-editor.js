let editor;

window.onload = () => {
  editor = ace.edit('parser-ide');
  editor.setTheme('ace/theme/monokai');
  editor.session.setMode('ace/mode/javascript');

  if (document.getElementById('editor-text-area').value.length > 0) {
    editor.session.setValue(document.getElementById('editor-text-area').value);
  }
};

document.getElementById('parser-ide').addEventListener('change', () => {
  document.getElementById('editor-text-area').value = editor.session.getValue();
});