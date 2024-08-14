import React, { useState, useRef } from 'react'
import "./styles/Game.css"

export const Games = ({ goTheEndGame, pickedCategory, pickedWord, letters, guessed, wrongLatters, guessedLetters, score }) => {

 const [letter, setLetter] = useState("")
 const letterInputRef = useRef(null)

 const handleSubmit = (e) => {
  e.preventDefault();
  goTheEndGame(letter)
  setLetter("")
  letterInputRef.current.focus();
 }
 return (
  <div className='game-conteiner'>
   <p className='points'><span>Pontuação: </span>{score}</p>
   <h1>Adivinhe a palavra: <span>{pickedCategory}</span></h1>
   <p className='tentativas'>Você ainda tem <span>{guessed}</span> tentativas.</p>

   <div className="word-container">

    {letters.map((letter, i) => (
     guessedLetters.includes(letter) ? (<span key={i} className='letter'>{letter}</span>) : (<span key={i} className='blankSquare'></span>)
    ))}
   </div>

   <div className="letter-container">
    <p>Tente adivnhar uma letra da palavra:</p>
    <form onSubmit={handleSubmit}>
     <input type="text" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
     <button className='btn-play'>Jogar!</button>
    </form>
   </div>

   <div className="wrongLettersContainer">
    <p>Letras já utilizadas:{wrongLatters.map((letter, i) => (
     <span key={i}>{letter}, </span>

    ))} </p>
   </div>
  </div>
 )
}

export default Games
