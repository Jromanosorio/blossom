import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/card/card'
import Filters from './components/filters/filters'
import Header from './components/header/header'
import { charactersAPI } from './services/api'
import { PulseLoader } from 'react-spinners'
import Modal from './components/modal/modal'

function App() {
  const [characters, setCharacters] = useState<any[]>([])
  const [filters, setFilters] = useState({})
  const [selectedCharacter, setSelectedCharacter] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [showingFavorites, setShowingFavorites] = useState(false)

  useEffect(() => {
    selectedCharacter ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'

    loadCharacters()
  }, [filters, selectedCharacter, showingFavorites])

  const loadCharacters = async () => {
    try {
      const data = showingFavorites
      ? await charactersAPI.getFavorites(filters)
      : await charactersAPI.getAllCharacters(filters) 
      setCharacters(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const selectCharacter = async (id: number) => {
    try {
      const data = await charactersAPI.getCharacterById(id)
      setSelectedCharacter(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const checkFavorite = async (id: number) => {
    try {
      await charactersAPI.handleFavorite(id)
      setSelectedCharacter({...selectedCharacter, isFavorite: !selectedCharacter.isFavorite})
    } catch (err) {
      console.error(err)
    } finally {
      loadCharacters()
      setLoading(false)
    }
  }

  const sendComment = async(characterId: number, user: string, comment: string) => {
    try {
      const newComment = await charactersAPI.sendComment(characterId, user, comment)
      setSelectedCharacter((prev: any) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorites = () => {
    setShowingFavorites((prev) => !prev)
  }

  return (
    <div className={`min-h-screen relative`}>
      <Header />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 gap-10'>
        <Filters onFilterChange={setFilters} onShowFavorites={toggleFavorites} />
        {
          loading
            ? <PulseLoader color='#e48c40' className='mt-20' />
            : <div className='grid grid-cols-5 gap-10 mt-10'>
              {
                characters && characters.map((char) => {
                  return (
                    <Card
                      id={char.id}
                      key={char.id}
                      handleFavorite={() => checkFavorite(char.id)}
                      isFavorite={char.isFavorite}
                      viewDetails={() => selectCharacter(char.id)}
                      image={char.image}
                      name={char.name}
                      species={char.species}
                    />
                  )
                })
              }
            </div>
        }
        {
          selectedCharacter && <Modal onSubmitComment={sendComment} selectedCharacter={selectedCharacter} onHandleFavorite={checkFavorite} onClose={() => setSelectedCharacter(null)} />
        }
      </main>
    </div>
  )
}

export default App
