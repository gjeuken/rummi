import React from "react"
import { Form, Button } from "react-bootstrap"
import '../lobby.css'

export default function FormCreate({ createGame, setNumPlayers }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()} >
      <h2 id='lobby-subtitle'>- CRIAR UM JOGO NOVO -</h2>
      <Form.Group id="create-room">
        {/* <Form.Label>Create a rummi game</Form.Label> */}
        <Form.Row>
          <Form.Label id='player-label'>Quantos jogadores?</Form.Label>
          <Form.Control
            id='player-input'
            as="select"
            onChange={(e) => setNumPlayers(e.target.value)}
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Row>
        <Button variant="primary" onClick={createGame}>
          Criar
        </Button>
      </Form.Group>
    </Form>
  )
}
