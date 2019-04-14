import React, { Component } from 'react'
import About from '../components/About.jsx'
import Request from '../components/Request.jsx'
export default class Container extends Component {
  constructor(props){
    super(props)
    this.state = {
      signedIn: this.props.signedIn
    }

  }

  render() {
    console.log(this.state)
    const { signedIn } = this.state
    return (
      <main className='container'>
        {signedIn ? <Request /> : <About /> }
      </main>
    )
  }
}
