import React from 'react'
import Textbox from './Textbox'
import './Sidebar.css'
const Sidebar = (props) => {

  return (
    <div className='sidebar'>
      <Textbox/>
      {/* will need to adjust styling */}
      <div onClick={props.changeCount} className="map_button">MAP</div>
    </div>
  )
}

export default Sidebar
