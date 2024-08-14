import React from 'react'
import "./styles/EndGame.css"

export const EndGame = ({ goInitGame, score }) => {
 return (
  <div>
   <h1>Fim de jogo</h1>
   <h2>Sua pontuação foi : <span>{score}</span></h2>
   <button onClick={goInitGame}>Reiniciar o jogo</button>
  </div>
 )
}
export default EndGame