import React from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function MyGame({
  playerName,
  gameID,
  playerID,
  credentials,
  leaveGame,
  setGameID,
  setPlayerID,
  setCredentials
}) {
  const history = useHistory()

  const handleLeave = () => {
    localStorage.removeItem('gameID')
    localStorage.removeItem('playerID')
    localStorage.removeItem('credentials')
    setGameID('')
    setPlayerID('')
    setCredentials('')
    leaveGame()
  }

  return (
    <div>
      <h2 id='lobby-subtitle'>- JOGO ATUAL -</h2>
      <ul id='current-game-info'>
        <li>Nome do jogador: {playerName || "none"}</li>
        <li>ID do jogo: {gameID || "none"}</li>
        <li>ID do jogador: {playerID || "none"}</li>
        <li>Credenciais: {credentials ? "Pronto" : "Faltando"}</li>
      </ul>
      <div id='current-game-buttons'>
        <Button
          id='open-game-btn'
          disabled={!gameID || !playerID || !credentials}
          variant={"primary"}
          onClick={() => history.push("/game")}
        >
          Jogar
        </Button>
        <Button
          id='leave-game-btn'
          variant="danger"
          onClick={handleLeave}
          disabled={!gameID || !playerID || !credentials}
        >
          Sair do jogo
        </Button>
      </div>
    </div>
  )
}

