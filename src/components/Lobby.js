import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap"
import MyGame from './MyGame'
import FormName from './FormName'
import FormCreate from './FormCreate'
import GameList from './GameList'
import '../lobby.css'
import jface from '../static/jface.png'

export default function Lobby({
                                  playerName,
                                  setPlayerName,
                                  gameID_back,
                                  setGameID,
                                  playerID_back,
                                  setPlayerID,
                                  credentials,
                                  setCredentials,
                              }) {
    const [games, setGames] = useState([])
    const [numPlayers, setNumPlayers] = useState('2')
    const gameID = localStorage.getItem('gameID')
    const playerID = localStorage.getItem('playerID')


    const loadGames = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub`)
            .then(res => res.json())
            .then(data => setGames(data.rooms))
    }

    const createGame = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numPlayers: numPlayers
            })
        })
            .then(res => {
                console.log(res.status)
                loadGames()
            })
    }

    const joinGame = (gameId, playerId) => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/${gameId}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerId,
                playerName: playerName
            })
        })
            .then(res => res.json())
            .then(data => {
                setGameID(gameId)
                setPlayerID(playerId)
                setCredentials(data.playerCredentials)
                localStorage.setItem('playerName', playerName)
                localStorage.setItem('gameID', gameId)
                localStorage.setItem('playerID', playerId)
                localStorage.setItem('credentials', data.playerCredentials)
                loadGames()
            })
            .catch(err => console.error(err))
    }

    const leaveGame = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/${gameID}/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerID,
                credentials: credentials
            })
        })
            .then(res => res.json())
            .then(data => {
                loadGames()
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadGames()

        const interval = setInterval(() => {
            loadGames()
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
      <div className="bg-overlay">
        <Container className="lobby-contain">
          <div className="row">
            <img src={jface} alt="joker face" id="lob-title-img" />
            <div id="lob-title">
              <h3>Bem vindo! Vamos jogar Rummi.</h3>
            </div>
          </div>
          <FormName {...{ playerName, setPlayerName }} />
          <FormCreate {...{ createGame, setNumPlayers }} />
          {gameID && (
            <MyGame
              {...{
                playerName,
                gameID,
                playerID,
                credentials,
                leaveGame,
                setGameID,
                setPlayerID,
                setCredentials,
              }}
            />
          )}
          <GameList {...{ games, playerID, gameID, joinGame, leaveGame }} />
        </Container>
      </div>
    )
}

