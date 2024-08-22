import React, { useState, useEffect } from "react";
import Card from "./Card";
import cardsData from "../cardsData";
import { shuffleArr } from "../cardsData";
function CardsList({incrementScore, incrementFail}) {
  const [data, setData] = useState(cardsData)
  const [finishedCards, setFinishedCards] = useState([])
  function flipCard(card){
    setData(data.map(_card=>{
      return _card.id === card.id ? {..._card, isSelected: !_card.isSelected} : _card
    }))
  }
  
  function checkCards(cards){
    const [card1, card2] = cards
    if(card1.name === card2.name){
      incrementScore(2)
      setFinishedCards([...finishedCards, ...cards])
    }else{
      incrementFail(1)
      setData(prevState=>{
        return prevState.map(_card=>{
          if(_card.id === card1.id){
            return {...card1, isSelected: false}
          }else if(_card.id === card2.id){
            return {...card2, isSelected: false}
          }
          return _card
        }) 
      })
    }

    
    
  }
  useEffect(() => {
    const flippedCards = data.filter(card=> !finishedCards.includes(card)).filter(card=> card.isSelected)
    async function gameManager(){
      if(flippedCards.length === 2){
        
        await new Promise(res=> setTimeout(()=> res(checkCards(flippedCards)), 600)) // wait for timeout to finish
      }

    }
    gameManager()
  }, [data])
  
  const displayedCards = data.map((card) => {
    return <Card key={card.id} flip={finishedCards.includes(card) ? ()=>{} : flipCard} card={card} />;
  });
  return (
    <div className="px-4">
      <div className="flex gap-5">

      <button onClick={()=> setData(cardsData)} className="bg-gray-600 w-full text-white p-3 mb-3 text-center rounded-md">Reset</button>
      <button onClick={()=> setData(shuffleArr(cardsData))} className="bg-red-600 w-full text-white p-3 mb-3 text-center rounded-md">Restart</button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center px-10">{displayedCards}</div>
    </div>
  );
}

export default CardsList;