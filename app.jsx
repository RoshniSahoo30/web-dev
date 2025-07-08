import React, { useState } from 'react'

const App = () => {

  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(name);
    setName('')
  }
  return (
    <div>
      <form onSubmit={(event) => {
        handleSubmit(event);
      }
      }>
        <label className='px-4 py-3'>Name</label>
        <input 
          value={name} 
          onChange={(event) => {
            setName(event.target.value)}}
        className='px-4 py-3 m-5 rounded'
         type='text' 
         placeholder='name' 
         border="rounded"></input>
        <button className='px-4 py-3 m-5 rounded'>Submit</button>
      </form>
    </div>
  )
}

export default App
