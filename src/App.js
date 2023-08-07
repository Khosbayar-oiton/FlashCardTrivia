import React , { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  const [categories, setCategories] = useState([]);

  const categoryE1 = useRef();
  const amountEl = useRef();


  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then (res => {
      setCategories(res.data.trivia_categories)
    })
  })

  useEffect(() => {
    
  }, [])

  function decodeString(str) {
   const textArea = document.createElement('textarea')
   textArea.innerHTML = str
   return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php?amount=10',{
      params: {
        amount: amountEl.current.value,
        category: categoryE1.current.value}
    })
    .then (res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer]
        return{
          id: `${index}-${Date.now()}`,
          question: decodeString (questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })

  }
  return (
<> 
<form className='header'onSubmit={handleSubmit}>
<div className='form-group'>
  <label htmlFor = "category" >Category</label>
  <select id = "category" ref = {categoryE1}>
    {categories.map(category => {
      return <option key = {category.id} value = {category.id}>{category.name}</option>
    })}
  </select>
</div>
<div className='form-group'>
<label htmlFor = "amount" >Number of Questions</label>
<input type='number' id = "amount" min = "1" step = "1" defaultValue={10} ref = {amountEl}/>
  </div>

  <div className='form-group'>
</div>
<button className='btn'>Generate</button>
</form>

    <div className='container' >
<FlashcardList flashcards={flashcards} />
</div>  
</>
);}
const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is React?',
    answer: 'A library for managing user interfaces',
    options: [
      '1',
      'A library for managing user interfaces',
      '3',
      '4'
    ]
  },
  {
    id: 2,
    question: 'What is 1+3',
    answer: '4',
    options: [
      '1',
      '2',
      '3',
      '4'
    ]
  }
]
export default App;
