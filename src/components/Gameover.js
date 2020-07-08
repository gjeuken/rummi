import React from 'react'
import { Modal } from 'react-bootstrap'
import GameoverButton from './GameoverButton'

export default function Gameover({
                                  showGameover,
                                  setShowGameover,
                                  gameOver,
                                  opponentsData,
                                  playerID, 
                                  gameMetadata
                              }) {
  const handleClose = () => setShowGameover(false);

  
  const showName = () => {
    if (gameOver.winner === playerID) {
      return 'You are the winner!'
    } else {
      return 'Winner is ' + opponentsData.find(elem => elem.id === parseInt(gameOver.winner)).name
    }
  }

  return (
    <>
      <Modal show={showGameover} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
          <h3>Gameover</h3>
        </Modal.Header>

        <Modal.Body id='rules-body'>
          <p>{showName()}</p>
          <p>Points:</p>
          <ul>
            {opponentsData.map(pl => <li key={pl.id}>{pl.name || 'Opponent'}: {gameOver.points[pl.id]}</li>)}
          </ul>
        </Modal.Body>

        <Modal.Footer>
		  <GameoverButton />
        </Modal.Footer>

      </Modal>
    </>
  );
}
