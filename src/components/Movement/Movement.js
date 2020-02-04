import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth.js';
import { useDispatch } from 'react-redux';
import { move } from '../../actions/roomActions';
import './Movement.css'

const Movement = () => {

    const dispatch = useDispatch()

    let moveWest = () => {
        return axiosWithAuth()
            .post('https://lambda-cs25-mud.herokuapp.com/api/adv/move/', { "direction": "w" })
            .then(res => {
                console.log("result of call to move west ", res)
                dispatch(move(res.data))
            })
            .catch(err => {
                console.log("error making request, please get your act together. ", err)
            })
    }
    let moveNorth = () => {
        return axiosWithAuth()
            .post('https://lambda-cs25-mud.herokuapp.com/api/adv/move/', { "direction": "n" })
            .then(res => {
                console.log("result of call to move north ", res)
                dispatch(move(res.data))
            })
            .catch(err => {
                console.log("error making request, please get your act together. ", err)
            })
    }
    let moveSouth = () => {
        return axiosWithAuth()
            .post('https://lambda-cs25-mud.herokuapp.com/api/adv/move/', { "direction": "s" })
            .then(res => {
                console.log("result of call to move south ", res)
                dispatch(move(res.data))
            })
            .catch(err => {
                console.log("error making request, please get your act together. ", err)
            })
    }
    let moveEast = () => {
        return axiosWithAuth()
            .post('https://lambda-cs25-mud.herokuapp.com/api/adv/move/', { "direction": "e" })
            .then(res => {
                console.log("result of call to move east ", res)
                dispatch(move(res.data))
            })
            .catch(err => {
                console.log("error making request, please get your act together. ", err)
            })
    }

    return (
        <div className="move_button_container">
            <div className="direction_button" onClick={moveWest}>West</div>
            {/* css for this class will have to have smaller heights, and will flex-direction column instead of row. */}
            <div className="northsouth_buttons_container">
                <div className="direction_button" onClick={moveNorth}>North</div>
                <div className="direction_button" onClick={moveSouth}>South</div>
            </div>
            <div className="direction_button" onClick={moveEast}>East</div>
        </div>
    )
}

export default Movement