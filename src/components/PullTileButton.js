import React from 'react'
import { Button } from 'react-bootstrap';

const PullTileButton = ({playerID, PullTile}) => {
    const handleClick = () => {
      PullTile(playerID)
    }

    return (
        <Button className='turn-btn' variant="dark" onClick={handleClick}>
        + COMPRAR
        </Button>
    );
}

export default PullTileButton
