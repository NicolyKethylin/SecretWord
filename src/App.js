import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

//Lista de palavras
import { wordsList } from "./data/words";

// components
import { Screen } from "./components/Screen"
import { Games } from "./components/Game"
import { EndGame } from "./components/EndGame";


//ID dos estagios
const stages = [
 { id: 1, name: "start" }, //0
 { id: 2, name: "game" }, //1
 { id: 3, name: "end" },//2
];


function App() {
 const [gameStage, setGameStage] = useState(stages[0].name)
 const [words] = useState(wordsList);

 //Escolher a palavra, categoria e letras
 const [pickedWord, setPickedWord] = useState("")
 const [pickedCategory, setPickedCategory] = useState("")
 const [letters, setLetters] = useState([])
 const [guessedLetters, setGuessedLetters] = useState([])
 const [wrongLatters, setWrongLatters] = useState([])
 const [guessed, setGuessed] = useState(3)
 const [score, setScore] = useState(0);


 const pickedCategoryAndWord = useCallback(() => {
  const categories = Object.keys(words)
  const categoria = categories[Math.floor(Math.random() * Object.keys(categories).length)]


  const word = words[categoria][Math.floor(Math.random() * words[categoria].length)];


  return { word, categoria }
 }, [words])



 //Manipulação dos estagios
 const startGame = useCallback(() => {
  const { word, categoria } = pickedCategoryAndWord();

  let wordLetters = word.split("");
  wordLetters = wordLetters.map((l) => l.toLowerCase());

  setPickedCategory(categoria);
  setPickedWord(word);
  setLetters(wordLetters);
  setGameStage(stages[1].name);
  setGuessedLetters([]);
  setGuessed(3);
  setWrongLatters([]);


 }, [pickedCategoryAndWord]);

 const goTheEndGame = (letter) => {
  const normalizedLetter = letter.toLowerCase()

  if (guessedLetters.includes(normalizedLetter) || wrongLatters.includes(normalizedLetter)) {
   return;
  }
  if (letters.includes(normalizedLetter)) {
   setGuessedLetters((actualGuessedLetters) => [
    ...actualGuessedLetters,
    letter,
   ]);

  } else {
   setWrongLatters((actualWrongLatters) =>
    [...actualWrongLatters,
     normalizedLetter]
   )
   setGuessed((actualGuessed) => actualGuessed - 1
   )
  }
 }
 const clearLettersStates = () => {
  setGuessedLetters([])
  setWrongLatters([])
 }



 const goInitGame = () => {
  setScore(0)
  setGuessed(3)
  setGameStage(stages[0].name)
 }
 //Verificação de letra
 useEffect(() => {
  if (guessed <= 0) {
   clearLettersStates();
   setGameStage(stages[2].name);
  }
 }, [guessed]);

 useEffect(() => {
  const uniqueLetters = [...new Set(letters)];

  if (guessedLetters.length === uniqueLetters.length && uniqueLetters.length > 0) {
   setScore((actualScore) => actualScore + 100);
   startGame();
  }
 }, [guessedLetters, letters, startGame]);

 return (
  <div className="App">
   {gameStage === "start" && <Screen startGame={startGame} />}
   {gameStage === "game" && <Games
    goTheEndGame={goTheEndGame}
    pickedWord={pickedWord}
    pickedCategory={pickedCategory}
    letters={letters}
    guessed={guessed}
    wrongLatters={wrongLatters}
    guessedLetters={guessedLetters}
    score={score}
   />}
   {gameStage === "end" && <EndGame goInitGame={goInitGame} score={score} />}
  </div>
 )
}

export default App;
