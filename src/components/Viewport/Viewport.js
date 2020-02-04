import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosWithAuth from '../utils/axiosWithAuth'

import styles from './viewport.module.css'
import InputManager from '../InputManager/InputManager'

import de from '../../assets/floorandwalls/1doorE.png'
import dn from '../../assets/floorandwalls/1doorN.png'
import ds from '../../assets/floorandwalls/1doorS.png'
import dw from '../../assets/floorandwalls/1doorW.png'
import den from '../../assets/floorandwalls/2doorEN.png'
import des from '../../assets/floorandwalls/2doorES.png'
import dew from '../../assets/floorandwalls/2doorEW.png'
import dns from '../../assets/floorandwalls/2doorNS.png'
import dnw from '../../assets/floorandwalls/2doorNW.png'
import dsw from '../../assets/floorandwalls/2doorSW.png'
import dens from '../../assets/floorandwalls/3doorENS.png'
import denw from '../../assets/floorandwalls/3doorENW.png'
import desw from '../../assets/floorandwalls/3doorESW.png'
import dnsw from '../../assets/floorandwalls/3doorNSW.png'
import d4 from '../../assets/floorandwalls/4door.png'
import floor from '../../assets/floorandwalls/floor-01.png'
import easternSprites from '../../assets/sprites/easternSprites.png'
import northernSprites from '../../assets/sprites/northernSprites.png'
import southernSprites from '../../assets/sprites/southernSprites.png'
import westernSprites from '../../assets/sprites/westernSprites.png'

const Viewport = props => {
  // Map information for drawing doors in current room
  const [rooms, setRooms] = useState([])
  // Player character starting position
  const [playerChar, setPlayerChar] = useState({ x: 295, y: 150 })

  // Get current room info
  const curRm = useSelector(state => state.title)

  // Get doors for current room
  let getDirs = () => {
    let room = rooms.find(rm => rm.title === curRm)
    console.log(`Room: ${JSON.stringify(room)}`)
    let dirs = []
    for (let key in room) {
      if (room[key] === true) {
        dirs.push(key)
      }
    }
    return dirs
  }

  // Reference canvases
  const canvasRef1 = useRef()
  const canvasRef2 = useRef()
  const canvasRef3 = useRef()

  // Floor dimensions (16:9 aspect ratio)
  const fheight = 366
  const fwidth = 640
  const tileSize = 20

  // Door dimensions
  const dheight = 561
  const dwidth = 897

  useEffect(() => {
    axiosWithAuth()
      .get('https://lambda-mud-test.herokuapp.com/api/adv/rooms/')
      .then(res => {
        const roomsData = res.data.map(
          ({ room_id, north, east, south, west, title }) => ({
            room_id,
            north,
            east,
            south,
            west,
            title
          })
        )
        setRooms(roomsData)
      })
      .catch(err => console.log('something', err.response))
  }, [])

  // Instantiate InputManager
  let inputManager = new InputManager()

  const handleInput = (action, data) => {
    let newPlayer = { ...playerChar }
    newPlayer.x += data.x * tileSize
    newPlayer.y += data.y * tileSize
    newPlayer.dir = data.dir
    // Create perimeter boundary
    if (
      newPlayer.x >= 0 &&
      newPlayer.x < fwidth - 25 &&
      newPlayer.y >= 0 &&
      newPlayer.y < fheight - 58
    ) {
      setPlayerChar(newPlayer)
    }
  }

  // Start input event listener
  useEffect(() => {
    console.log('Bind input')
    inputManager.bindKeys()
    inputManager.subscribe(handleInput)
    // Close event listener on exit
    return () => {
      inputManager.unbindKeys()
      inputManager.unsubscribe(handleInput)
    }
  })

  // Create / update canvas
  useEffect(() => {
    // Canvas contexts
    const ctx1 = canvasRef1.current.getContext('2d')
    const ctx2 = canvasRef2.current.getContext('2d')
    const ctx3 = canvasRef3.current.getContext('2d')

    // Wipe canvases
    ctx1.clearRect(0, 0, fwidth, fheight)
    ctx2.clearRect(0, 0, fwidth, fheight)
    ctx3.clearRect(0, 0, dwidth, dheight)

    // Instantiate new Image
    const floorImg = new Image()
    const spriteImg = new Image()
    const doorImg = new Image()

    // Draw floor
    floorImg.src = floor
    floorImg.onload = () => ctx1.drawImage(floorImg, 0, 0)

    // Function for drawing sprites
    const drawSprite = (img, sx, sy, sw, sh, dx, dy, dw, dh) => {
      spriteImg.onload = () =>
        ctx2.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }

    // Set sprite image
    switch (playerChar.dir) {
      case 'n':
        spriteImg.src = northernSprites
        drawSprite(spriteImg, 50, 0, 50, 60, playerChar.x, playerChar.y, 50, 60)
        break
      case 'e':
        spriteImg.src = easternSprites
        drawSprite(spriteImg, 50, 0, 50, 60, playerChar.x, playerChar.y, 50, 60)
        break
      case 's':
        spriteImg.src = southernSprites
        drawSprite(spriteImg, 50, 0, 50, 60, playerChar.x, playerChar.y, 50, 60)
        break
      case 'w':
        spriteImg.src = westernSprites
        drawSprite(spriteImg, 50, 0, 50, 60, playerChar.x, playerChar.y, 50, 60)
        break
      default:
        spriteImg.src = southernSprites
        drawSprite(spriteImg, 50, 0, 50, 60, playerChar.x, playerChar.y, 50, 60)
        break
    }

    // Build image name for walls
    const getWallImg = () => {
      let dirs = getDirs()
      let abbr = []
      let doors = ''
      for (let i = 0; i < dirs.length; i++) {
        abbr.push(dirs[i].charAt(0))
      }
      abbr.sort()
      if (abbr.length === 1) {
        doors = `d${abbr[0]}`
        switch (doors) {
          case 'dn':
            doors = dn
            break
          case 'de':
            doors = de
            break
          case 'ds':
            doors = ds
            break
          case 'dw':
            doors = dw
            break
          default:
        }
      } else if (abbr.length === 2) {
        doors = `d${abbr[0]}${abbr[1]}`
        switch (doors) {
          case 'den':
            doors = den
            break
          case 'des':
            doors = des
            break
          case 'dew':
            doors = dew
            break
          case 'dns':
            doors = dns
            break
          case 'dnw':
            doors = dnw
            break
          case 'dsw':
            doors = dsw
            break
          default:
        }
      } else if (abbr.length === 3) {
        doors = `d${abbr[0]}${abbr[1]}${abbr[2]}`
        switch (doors) {
          case 'dens':
            doors = dens
            break
          case 'denw':
            doors = denw
            break
          case 'desw':
            doors = desw
            break
          case 'dnsw':
            doors = dnsw
            break
          default:
        }
      } else {
        doors = d4
      }
      return doors
    }

    doorImg.src = getWallImg()
    doorImg.onload = () => ctx3.drawImage(doorImg, 0, 0)
  })

  return (
    <div id={styles.container}>
      <canvas
        id={styles.canvas1}
        height={fheight}
        width={fwidth}
        ref={canvasRef1}
      ></canvas>
      <canvas
        id={styles.canvas2}
        height={fheight}
        width={fwidth}
        ref={canvasRef2}
      ></canvas>
      <canvas
        id={styles.canvas3}
        height={dheight}
        width={dwidth}
        ref={canvasRef3}
      ></canvas>
    </div>
  )
}

export default Viewport
