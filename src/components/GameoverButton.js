import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom"

const GameoverButton = () => {
		const gameID = localStorage.getItem('gameID')
		const playerID = localStorage.getItem('playerID')
		const credentials = localStorage.getItem('credentials')

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
		}

		const handleLeave = () => {
				localStorage.removeItem('gameID')
				localStorage.removeItem('playerID')
				localStorage.removeItem('credentials')
				leaveGame()
		}

		const history = useHistory()
		
		const handleClick = () => {
				handleLeave()
				history.push('/')
		}
		
		return (
				<Button onClick={handleClick}>
				Sair do jogo
				</Button>
		);
}

export default GameoverButton
