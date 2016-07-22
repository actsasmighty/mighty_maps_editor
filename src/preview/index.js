/*
 * This uses react without JSX, etc
 * http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack
 */
const {ipcRenderer, remote} = require("electron");

ipcRenderer.on("editor-content", function(event, data) {
  seat_map.setState({seat_map: data})
})

let SeatMap = React.createClass({
  getInitialState: function() {
    return { seat_map: {} }
  },

  render: function() {
    let t = React.createElement;

    return (
      t("svg", {width: "100%", height: "100%", style: { position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }},
        (this.state.seat_map.blocks || []).map((block_props) => {
          return t(Block, block_props)
        })
      )
    )
  }
});

class Block extends React.Component {
  render() {
    let t = React.createElement;

    return (
      t("polygon", { points: this._svg_points() })
    )
  }

  // helpers
  _svg_points() {
    return this.props.points.map((point) => `${point.x},${point.y}` ).join(" ")
  }
}

let circles = [
  {cx: 50, cy: 40, r: 40, stroke: "green", strokeWidth: 4, fill: "yellow"},
  {cx: 50, cy: 140, r: 40, stroke: "blue", strokeWidth: 4, fill: "red"}
];

// http://stackoverflow.com/questions/25791955/react-js-reactcomponent-does-not-offer-setstate
let seat_map = ReactDOM.render(React.createElement(SeatMap), document.getElementById("content"));

/*
let seat_map_data = {
  "name": "Hall of fame",
  "blocks": [
    {
      "name": "Pit left",
      "points": [
        {
          "x": 72.1,
          "y": 114.2
        },
        {
          "x": 372.1,
          "y": 114.2
        },
        {
          "x": 372.1,
          "y": 464.2
        },
        {
          "x": 32.1,
          "y": 464.2
        },
        {
          "x": 32.1,
          "y": 164.2
        }
      ],
      "rows": [
        {
          "seats": [
            {
              "x": 77.09,
              "y": 134.19,
              "number": 1
            },
            {
              "x": 89.09,
              "y": 124.19,
              "number": 2
            },
            {
              "x": 101.09,
              "y": 114.19,
              "number": 3
            },
            {
              "x": 113.09,
              "y": 104.19,
              "number": 4
            }
          ]
        }
      ]
    }
  ]
}
*/
//seat_map.setState({seat_map: seat_map_data})
