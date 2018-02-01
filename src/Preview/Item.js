import React, {Component} from 'react'

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = {
      'padding-top': '0px',
      'margin-bottom': '46px'
    }
    var image = {
      'border-radius': '7px',
      'display': 'inline-block'
    }
    var strong = {
      'display': 'inline',
      'padding-left': '10px',
      'padding-bottom': '25px'
    }
    console.log(this.props.content.img);
    return (
      <li style={style} onClick={() => {
          window.location.href = this.props.content.uri;
          actions.hideWindow()
        }}>
        <img src={this.props.content.img} />
        {this.props.content.name}

    </li>
  )
  }
}

export default Item;
