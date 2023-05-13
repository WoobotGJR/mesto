import { Card } from "../components/Card.js"
export {createCardElement}

function createCardElement(link, name, handleCardClick) {
  const newCardElement = new Card(link, name, "#card-element", {handleCardClick: handleCardClick});
  return newCardElement
}