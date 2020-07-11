import React from 'react'
import { Button } from 'react-bootstrap';

const EndTurnButton = ({FinishTurn}) => {

  const handleClick = () => {
      FinishTurn()
      fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub`)
    }
  return (
      <Button className='turn-btn' variant="dark" onClick={handleClick}>
      PASSAR VEZ
      </Button>
  );
}

export default EndTurnButton
