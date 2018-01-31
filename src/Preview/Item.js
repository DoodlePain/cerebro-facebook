import React, {Component} from 'react'

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.content.img);
    return (
      <li onClick={() => {
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
