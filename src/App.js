import './App.css'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      
        <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} apiKey = {this.apiKey} key="in" pageSize={5} country="in" />}></Route>
            <Route exact path='/us' element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="us" pageSize={5} country="us" />}></Route>
          </Routes>
          </Router>
        </div>
      
    )
  }
}
