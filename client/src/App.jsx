import React, { Component } from 'react';
import './App.css';
import Input from './components/input'
import axios from 'axios'
import Output from './components/output'

class App extends Component {
  state = {
    time:-1,
    count:-1,
    results:[]
  }

  handleInput=(data)=>{
    axios.get(`/api/${data}`)
      .then(res=>{
        if(typeof res.data != undefined)
          this.setState({time:res.data.time,count:res.data.count,results:res.data.arr})
        else
          this.setState({time:-1,count:-1,results:[]})
      })
    /**if(data){
      
    }
    else
      this.setState({time:-1,count:-1,results:[]})
    console.log(this.state) */
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
