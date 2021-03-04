import React, { Component } from 'react';
import './App.css';
import Input from './components/input'
import axios from 'axios'
import Output from './components/output'

class App extends Component {
  state = {
    time:0,
    count:0,
    results:[]
  }

  handleInput=(data)=>{
    if(data){
      axios.get(`/api/${data}`)
      .then(res=>{
        this.setState({time:res.data.time,count:res.data.count,results:res.data.arr})
      })
    }
  }

  render() { 
    return ( 
      <div>
        <Input onInput={this.handleInput} />
        <Output data={this.state} />
      </div>
     );
  }
}
 
export default App;
