import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export default function Rules({
                                  show,
                                  setShow,
                              }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
          <h3>Regras do Rummi</h3>
        </Modal.Header>

        <Modal.Body id='rules-body'>
        <ul>
          <li>O objetivo do jogo é ser o primeiro jogador a se livrar de todas as suas peças.</li>
          <li>Os jogadores começam com <strong>14 peças</strong> cada, e jogam em turnos, jogando peças da sua <strong>mão</strong> no <strong>tabuleiro</strong> quando as peças podem formar um jogo, ou quando elas podem ser adicionadas a um jogo existente.</li>
          <li><strong>Dois tipos de jogos:</strong></li>
          <ul>
          <li>Faça um <strong>“grupo”</strong> de peças: São 3 ou mais peças do mesmo número, que precisam ter cores diferentes.</li>
          <li>Faça uma <strong>“sequência”</strong> de peças: É uma série de 3 ou mais peças com numeros consecutivos, que precisam ser da mesma cor.</li>
          </ul>
          <li><strong>Importante</strong>: A primeira jogada sua no tabuleiro precisa serum jogo <strong>da sua própria mão</strong> que somem 30 ou mais (soma de todas as peças colocada). Depois que um jogador fez a sua primeira jogada com valor acima de 30, qualquer peça pode ser jogada na mesa no seus próximos turnos.</li>
          <li>Quando os jogadores não conseguirem colocar nenhuma peça, <strong>eles compram uma peça e seu turno acaba.</strong></li>
          <li>Um jogador pode colocar qualquer numero de peça que quiser no seu turno.</li>
          <li>No seu turno, um jogador pode adicionar peças a jogos existentes, e jogos existentes podem ser quebrados ou mexidos para formar novos jogos, contanto que ao menos uma peça vei da sua própria mão, e todas as peças acabem em um jogo aceitável no fim do turno.</li>
          <li>O <strong>coringa</strong> pode ser usado como qualquer numero ou cor para completar um jogo.</li>
          <li>Finalmente, o jogador que coloarar <strong>todas as suas peças primeiro ganha</strong> o jogo.</li>
        </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button id='rules-btn' variant="primary" onClick={() => handleClose()}>
            Voltar
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}
