import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/card/card'
import Filters from './components/filters/filters'
import Header from './components/header/header'
import { charactersAPI } from './services/api'

function App() {
  const [characters, setCharacters] = useState<any[]>([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await charactersAPI.getAllCharacters(filters)
        setCharacters(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [filters])

  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 gap-10'>
        <Filters onFilterChange={setFilters} delay={500} />
        <div className='grid grid-cols-5 gap-10 mt-10'>
          {
            characters && characters.map((char) => {
              return (
                <Card key={char.id} id={char.id} image={char.image} name={char.name} species={char.species} status={char.status} />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default App
