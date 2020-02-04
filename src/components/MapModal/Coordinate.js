import React from 'react'

const Coordinate = props => {

    return <p style={{
        background: 'black',
        color: props.currentRoom === props.coo.title ? 'red' : 'white',
        width: '10%',
        margin: 0,
        borderTop: props.coo.north ? 'none' : '1px solid white',
        borderBottom: props.coo.south ? 'none' : '1px solid white',
        borderRight: props.coo.east ? 'none' : '1px solid white',
        borderLeft: props.coo.west ? 'none' : '1px solid white',
        padding: 5
    }}>{props.coo.title}</p>

}

export default Coordinate
