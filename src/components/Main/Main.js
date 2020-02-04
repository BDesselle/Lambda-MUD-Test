import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { move } from '../../actions/roomActions'
import axiosWithAuth from '../utils/axiosWithAuth'
import Sidebar from '../Sidebar/Sidebar'
import Movement from '../Movement/Movement'
import MapModal from '../MapModal/MapModal'
import Viewport from '../Viewport/Viewport'
import './Main.css'

const Main = () => {
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()

  const changeCount = () => {
    (count===0) ? setCount(1):setCount(0);
  }

  useEffect(_ => {
    axiosWithAuth()
      .get('https://lambda-cs25-mud.herokuapp.com/api/adv/init/')
      .then(res => dispatch(move(res.data)))
      .catch(err => console.error(err))
      // eslint-disable-next-line
  }, [])

  return (
    <div className='theBigOne'>
      {/* should house the overlay and animations from jason whatever we end up calling that.*/}
      <div className='backgroundThing'>
        <Viewport />
        {/* rests under the background/room element */}
        <Movement className='movement' />
      </div>
      <div id='modal' style={{display: count===0?"flex":"none"}}>
        <div className="close" onClick={changeCount}>X</div>
        <MapModal/>
      </div>

      {/* floated to the right */}
      <Sidebar className='sidebar' changeCount={changeCount}/>
    </div>
  )
}
export default Main
