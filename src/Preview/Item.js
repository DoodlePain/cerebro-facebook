import React, {Component} from 'react'

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li onClick={() => {
          window.location.href = this.props.content.uri;
          actions.hideWindow()
        }}>
        {this.props.content.name}

    </li>
  )
  }
}

export default Item;
