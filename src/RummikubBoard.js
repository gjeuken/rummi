import React, { useState, useEffect, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'
import Rules from './components/Rules'
import logo from './static/logo.svg'
import Gameover from './components/Gameover'
import Timer from './components/Timer'


const RummikubBoard = ({G, ctx, moves, playerID, gameID, gameMetadata}) => {
  const isCurrentPlayer = ctx.currentPlayer === playerID
  const [show, setShow] = useState(false)
  const handleMove = (coordinates) => {
    moves.MoveTile(coordinates, playerID, isCurrentPlayer)
  }

  const [opponentsData, setOpponentsData] = useState([])
  const [opponents, setOpponents] = useState([])
  const stopFetching = useRef(false)
  const [showGameover, setShowGameover] = useState(false)
  
  useEffect(() => {
    const getMetadata = (init) => {
      if (init) {
        setOpponentsData(init)
      } else {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/${gameID}`)
        .then(res => res.json())
        .then(data => {
          setOpponentsData(data.players)
        })
        .catch(err => console.error(err))
      }
    }

    getMetadata(gameMetadata)

    stopFetching.current = setInterval(() => getMetadata(), 5000)
    return () => clearInterval(stopFetching.current)
  }, [gameMetadata, gameID, playerID])
  
  useEffect(() => {
    if (gameID && playerID && (opponents.length) >= gameMetadata.length) {
      clearInterval(stopFetching.current)
    }
  }, [opponents, gameMetadata, gameID, playerID])

  useEffect(() => {
    const renderOpponents = () => {
      const opp = []
      for (const [, value] of opponentsData.entries()) {
        if (value.name) {
          opp.push(
            <span key={value.id} className={value.id === parseInt(ctx.currentPlayer) ? 'avatar op-avatar-active' : 'avatar'}>
              <p>PLAYER {value.id + 1}:</p>
              {value.id === parseInt(ctx.currentPlayer) ? <p>{value.name}</p> : <p>{value.name}</p>}
            </span>
          )
        }
      }
      setOpponents(opp)
    }
    renderOpponents()
  }, [opponentsData, ctx.currentPlayer, playerID])

  useEffect(() => {
    if (ctx.gameover) {
      setShowGameover(true)
    }
  }, [ctx.gameover])

  const handleReset = () => {
    moves.ResetBoard()
  }

  if (!gameID && !playerID) {
    return <Redirect to="/"/>
  } else {
    return (
      <DndProvider backend={Backend}>
        <div className={isCurrentPlayer ? 'active-back' : 'inactive-back'}>
          <Container id='master' fluid>
            <Row id='top-row'>
              <Col id='logo-area' md={3}>
                <div>
                <div className='admin-btn-container'>
                  <Button className='small-btn' variant="dark" size="sm" onClick={() => setShow(true)}>
                    How to Play
                  </Button>
                  <LinkContainer to='/'>
                    <Button className='small-btn' variant="dark" size="sm" >
                      Exit Game
                    </Button>
                  </LinkContainer>
                  </div>
                </div>
                {<Rules {...{show, setShow}} />}
              </Col>
              <Col id='opponent-info' md={6}>
                {opponents}
              </Col>
              <Col id='end-turn' md={3}>
                {isCurrentPlayer && <EndTurnButton FinishTurn={moves.FinishTurn}/>}
              </Col>
            </Row>
            <Row md={12}>
              <Container id='main-board' fluid>
                <MainBoard {...{G, MoveTile: handleMove}}/>
              </Container>
            </Row>
            <Row id='bottom-row'>
		      <div id='opponent-info' md={6}>
				{opponents}
		      </div>
              <Col id='self-info' md={2}>
                <p>{isCurrentPlayer && 'YOUR TURN'}</p>
                {isCurrentPlayer && <Timer {...{playerID, PullTile: moves.PullTile, isCurrentPlayer}}/>}
              </Col>
              <Col id='rack-container' md={8}>
                <Row id='rack-row'>
                  <Rack {...{playerRack: G.players[playerID], MoveTile: handleMove}}/>
                </Row>
              </Col>
              <Col id='pull-tile' md={2}>
                {isCurrentPlayer &&
                  <React.Fragment>
                    <PullTileButton {...{playerID, PullTile: moves.PullTile}}/>
                    <Button className='turn-btn' variant="warning" onClick={handleReset}>RESET BOARD</Button>
                  </React.Fragment>
                }
				<div id='end-turn' md={2}>
				    {isCurrentPlayer && <EndTurnButton FinishTurn={moves.FinishTurn}/>}
				</div>
              </Col>
            </Row>
          </Container>
          {ctx.gameover && <Gameover {...{
            showGameover, 
            setShowGameover, 
            gameOver: ctx.gameover,
            opponentsData,
            playerID,
            gameMetadata
          }}/>}
        </div>
      </DndProvider>
    )
  }
}

export default RummikubBoard;
