import React, { Component } from 'react'
import './App.css';
import CardComponent from './components/CardComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    /* fetch('https://api.yelp.com/v3/businesses/search?location="Alpharetta"', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + 'Ubup8E7BuzVHBGAmhAHSS17fVR_DpoVr4FMDTcwJeh6iqVzAkLYqSTBXWpN_jg2yB0r400fdQmKkkX8P5mfcK8VsgE5ykIMye9Us_79YC7gMLLkotEvKf0o0dGGMXXYx',
        //'mode': 'no-cors'
      }
    })
    .then( res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(console.log) */
    fetch('/api/getdata').then(res => res.json()).then(data => {
      console.log(data);
      this.setState({data:data.result});
    })
  }

  render(){
    return(
      <CardComponent cardLists={this.state.data}/>
    )
  }
}

export default App;
