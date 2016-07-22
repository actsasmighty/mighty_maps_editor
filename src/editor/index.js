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
  let seat_map = Opal["MightyMaps"].$const_get("Types").$const_get("SeatMap").$new()
  let dsl = Opal["MightyMaps"].$const_get("DSL").$const_get("SeatMap").$new(seat_map)
  dsl.$instance_eval(editor.getValue())
  let seat_map_data = JSON.parse(seat_map.$normalize().$to_json())
  ipcRenderer.send("editor-content", seat_map_data)
})
