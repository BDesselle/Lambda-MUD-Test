import React from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import Main from './components/Main/Main'
import Registration from './components/Registration/Registration.js'
import Login from './components/Login/Login.js'
import { Switch, Route } from 'react-router-dom'
import Viewport from './components/Viewport/Viewport'

function App(props) {
  console.log('props in app', props)
  const dispatch = useDispatch()
  return (
    <div className='App'>
      <header className='App-header'>
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Registration {...props} useDispatch={dispatch} />}
          />
          <Route exact path='/viewport' render={props => <Viewport />} />
          <Route
            exact
            path='/login'
            render={props => <Login {...props} useDispatch={dispatch} />}
          />
          <Route exact path='/home' render={props => <Main {...props} />} />
        </Switch>
      </header>
    </div>
  )
}

export default App
