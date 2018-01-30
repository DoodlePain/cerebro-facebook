import React, {Component} from 'react'
import Item from './Item'
import {KeyboardNav, KeyboardNavItem} from 'cerebro-ui'

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    let list = []
    Object.keys(this.props.person).map((result, index) => {
      list = [
        ...list,

        <KeyboardNavItem><Item content={this.props.person[result]} key={index}/></KeyboardNavItem>
      ]
    })
    return (<KeyboardNav>
      <ul>
        {list}
      </ul>
    </KeyboardNav>)
  }
}

export default Preview;
