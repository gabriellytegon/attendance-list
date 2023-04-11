import './style.css'
import { Card } from '../../components/Card'
import React, { useState, useEffect } from 'react'

export function Home() {
  const [personName, setPersonName] = useState()
  const [people, setPerson] = useState([])
  const [user, setUser] = useState({name:'', avatar:''})

  function handleAddPerson(){
    const newPerson = {
      name: personName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setPerson(prevState => [...prevState, newPerson])
  }

  useEffect( () => {
    fetch('https://api.github.com/users/gabriellytegon')
      .then (response => response.json())
      .then (data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url          
        })
      })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setPersonName(e.target.value)} 
      />
      <button type="button" onClick={handleAddPerson}>Adicionar</button>

      {
        people.map (person => 
        <Card
        key= {person.time} 
        name={person.name} 
        time={person.time}
        />)
      }
    </div>
  )
}
