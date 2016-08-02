/*
 * This uses react without JSX, etc
 * http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack
 */
const {ipcRenderer, remote} = require("electron");

ipcRenderer.on("editor-content", function(event, data) {
  seat_map.setState({seat_map: data})
})

class SeatMap extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this.state = { seat_map: {}, ui: {} }
  }

  render() {
    let t = React.createElement;

    return (
      t("div", {},
        t("svg", {width: "100%", height: "100%", onClick: this._onClick, style: { position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }},
          this._blocks().map((block) => { return t(Block, block) })
        )
      )
    )
  }

  // helpers
  _blocks() {
    return this.state.seat_map.blocks || []
  }

  _onClick(event) {
    document.title = `x = ${event.nativeEvent.x}, y = ${event.nativeEvent.y}`
  }
}

class Block extends React.Component {
  render() {
    let t = React.createElement;

    return (
      t("g", {},
        [
          t("polygon", { className: "section", points: this._svg_points() })
        ]
        .concat((this.props.rows || []).map((row) => { return t(Row, row) }))
      )
    )
  }

  // helpers
  _svg_points() {
    return this.props.points.map((point) => `${point.x},${point.y}` ).join(" ")
  }
}

class Row extends React.Component {
  render() {
    let t = React.createElement;

    return (
      t("g", {},
        (this.props.seats || []).map((seat) => { return t(Seat, seat) })  
      )
    )
  }
}

class Seat extends React.Component {
  render() {
    let t = React.createElement;

    return (
      t("circle", {cx: this.props.x, cy: this.props.y, r: 4, "data-number": this.props.number})
    )
  }
}



// http://stackoverflow.com/questions/25791955/react-js-reactcomponent-does-not-offer-setstate
let seat_map = ReactDOM.render(React.createElement(SeatMap), document.getElementById("content"));
