const {ipcRenderer, remote} = require("electron");

ace.require("ace/ext/lanaguage_tools");
ace.require("ace/mode/ruby");

let editor = ace.edit("editor");

editor.setOptions({
  behavioursEnabled: true,
  enableBasicAutocompletion: true,
  showPrintMargin: false
});

editor.session.setMode("ace/mode/ruby");
editor.session.setUseSoftTabs(true);
editor.session.setTabSize(2);

ipcRenderer.on("editor-content", function() {
  ipcRenderer.send("editor-content", editor.getValue());
})
