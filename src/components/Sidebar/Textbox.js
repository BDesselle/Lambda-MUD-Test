import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import './Sidebar.css'


//for each response to a move call, the response.data will have to be passed in here as props.

const Textbox = () => {
    const [text, setText] = useState([ "Welcome to Game Unknown.", "*A commanding voice echoes through the chamber you are standing in and rebounds throughout your skull.*","*a sense of dark dread fills your being, like when you have to use the restroom, but you are nowhere near one.*", "'MUAAAAHAHAHAHAAAAAAA'", "'Good luck escaping.'",])
    const description = useSelector(state => state.description)
    const players = useSelector(state => state.players)
    const error_msg = useSelector(state => state.error_msg)

    useEffect(()=> {
        //if there is an error message it adds this
        error_msg ? setText([...text,`${error_msg}`]) : (setText([...text, (players.length ? `players with you: ${players}` : "you are all alone"),`${description}`, `..............`]))
// eslint-disable-next-line
    },[description, error_msg]) //double check this dependency array for naming convention.

    return (
    //css will have to allow for scrolling overflow of text in this box.
      <div className='textbox'>
        {text.reverse().map((line, i) => <p key={"line" + i}>{line}</p>)}
      </div>
  )
}

//this will need to be imported into Sidebar.
export default Textbox;