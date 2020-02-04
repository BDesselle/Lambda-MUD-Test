import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axiosWithAuth from '../utils/axiosWithAuth'
import Coordinate from './Coordinate'
import './MapModal.css'
const MapModal = props => {

    const state = useSelector(state => state)

    const [map, setMap] = useState([])

    useEffect(_ => {
        axiosWithAuth().get('https://lambda-cs25-mud.herokuapp.com/api/adv/rooms/')
            .then(res => {
                const sorted = res.data.sort((first, second) => second.title.split(' ')[3] - first.title.split(' ')[3]),
                    tens = []
                for (let i = 0; i < sorted.length; i += 10) {
                    tens.push(sorted.slice(i, i + 10))
                }
                console.log(tens)
                setMap(tens)
            })
            .catch(err => console.log('something', err.response))
    }, [state])

    if (map.length) return <div className="mapDiv">
        {map.map((row, id) => <div key={id} className="roomItem" style={{direction: id % 2 !== 0 ? 'rtl' : 'ltr'}}>
            {row.map((coo, index) => <Coordinate
                key={index}
                coo={coo}
                currentRoom={state.title}
            />)}
        </div>
        )}
    </div>

    else return null

}

export default MapModal
