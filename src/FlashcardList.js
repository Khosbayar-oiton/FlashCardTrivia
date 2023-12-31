import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }) {
  return (
    <div className='card-grid'>
      {flashcards.map(flashcards => {
        return <Flashcard flashcard = {flashcards} key = {flashcards.id} />
      })}
    </div>
  )
}
