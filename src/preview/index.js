const {ipcRenderer, remote} = require("electron");

ipcRenderer.on("editor-content", function(event, data) {
  debugger;
})

// http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/
let SeatMap = React.createClass({
  render: function() {
    let t = React.createElement;

    let rootElement =
      t("svg", {width: "100", height: "100"},
        t("circle", {cx: 50, cy: 40, r: 40, stroke: "green", strokeWidth: 4, fill: "yellow"})
      )
    return rootElement;
  }
});

let circles = [
  {cx: 50, cy: 40, r: 40, stroke: "green", strokeWidth: 4, fill: "yellow"},
  {cx: 100, cy: 40, r: 40, stroke: "blue", strokeWidth: 4, fill: "red"}
];

seat_map = React.createElement(SeatMap)

ReactDOM.render(seat_map, document.getElementById("content"));

debugger

seat_map.setState(
  Object.freeze(
    {
      circles: [
        { cx: 50, cy: 40, r: 40, stroke: "green", strokeWidth: 4, fill: "yellow"}
      ]
    }
  )
)
