import { useState } from 'react';
import { FaHeart, FaHeartbeat, FaQuestion, FaRegComment, FaRegHeart, FaSkull } from 'react-icons/fa'

const statusMap = {
  Alive: (
    <span className="flex items-center gap-2">
      <FaHeartbeat /> Alive
    </span>
  ),
  Dead: (
    <span className="flex items-center gap-2">
      <FaSkull /> Dead
    </span>
  ),
  Unknown: (
    <span className="flex items-center gap-2">
      <FaQuestion /> Unknown
    </span>
  ),
} as any

interface Comment {
  user: string;
  comment: string;
}

interface dataProps {
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
  origin: string;
  gender: string;
  isFavorite: boolean;
  comments: Comment[];
}

interface ModalProps {
  selectedCharacter: dataProps;
  onHandleFavorite: (id: number) => void;
  onSubmitComment: (characterId: number, user: string, comment: string) => void;
  onClose: () => void;
}

function Modal({ selectedCharacter, onHandleFavorite, onSubmitComment, onClose }: ModalProps) {
  const [form, setForm] = useState({
    user: "",
    comment: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  onSubmitComment(selectedCharacter.id, form.user, form.comment)
  setForm({ user: '', comment: '' }) // limpia los campos
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/50 dark:bg-black/70' onClick={onClose} />
      <div className='relative w-full bg-gray-800 dark:bg-gray-800 rounded-md shadow-xl max-w-2xl max-h-[90vh] mx-5 px-10 py-5 overflow-y-auto border-2 border-gray-700'>
        <h3 className='text-2xl! text-left font-bold border-b-2 border-gray-600 pb-5'>{selectedCharacter.name}</h3>
        <div className='flex flex-col md:flex-row gap-10 my-5 '>
          <img src={selectedCharacter.image} alt={`${selectedCharacter.image}_image`} className='border-2 rounded-xl' />
          <section className='flex flex-col text-left gap-5'>
            <div>
              <span className='text-orange font-semibold text-[18px]!'>Species:</span>
              <span className='ml-2'>{selectedCharacter.species}</span>
            </div>
            <div>
              <span className='text-orange font-semibold text-[18px]!'>Gender:</span>
              <span className='ml-2'>{selectedCharacter.gender}</span>
            </div>
            <div>
              <span className='text-orange font-semibold text-[18px]!'>Origin:</span>
              <span className='ml-2'>{selectedCharacter.origin}</span>
            </div>
            <div className='flex items-center'>
              <span className='text-orange font-semibold text-[18px]!'>Status:</span>
              <span className='ml-2'>
                {
                  statusMap[selectedCharacter.status]
                }
              </span>
            </div>
            <button
              className="w-full flex gap-2 mt-4 mb-2 items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer border-2 px-4 py-2 text-sm border-orange text-orange hover:text-gray-800 hover:bg-orange"
              onClick={() => onHandleFavorite(selectedCharacter?.id)}
            >
              {
                selectedCharacter.isFavorite
                  ? <div className='flex items-center gap-2'><FaHeart size={15} />Remove favorite</div>
                  : <div className='flex items-center gap-2'><FaRegHeart size={15} />Make favorite</div>
              }
            </button>
          </section>
        </div>
        <div className=''>
          <form onSubmit={handleSubmit} className='px-3 py-5 rounded-lg bg-gray-700'>
            <input
              id='user'
              name='user'
              placeholder='Your name'
              type="text"
              value={form.user}
              onChange={handleChange}
              className="text-sm px-3 py-2 w-full border-2 border-gray-600 text-white rounded-md shadow-sm focus:border-orange transition-colors duration-300 outline-none bg-gray-800"
            />
            <textarea
              value={form.comment}
              onChange={handleChange}
              placeholder="Add your comment"
              name="comment"
              id="comment"
              className='w-full mt-2 px-3 py-2 text-sm border-2 border-gray-300 border-gray-600 rounded-md bg-gray-800 text-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-orange resize-none'>
            </textarea>
            <button type='submit' disabled={form.user == '' || form.comment == ''} className="flex gap-2 mt-4 items-center justify-center font-semibold rounded-lg transition-colors duration-200 cursor-pointer px-4 py-1.5 text-sm text-gray-800 bg-orange disabled:text-white/60 disabled:bg-orange/30 disabled:cursor-not-allowed">
              Add comment
            </button>
          </form>
          <h3 className='text-lg font-semibold text-gray-900 text-white flex items-center gap-2 my-5'>
            <FaRegComment className='text-orange' />Comments
          </h3>
          {
            selectedCharacter.comments && selectedCharacter.comments.map((item, idx) => {
              return(
                <div className='text-left mb-2' key={idx}>
                  <h4 className='text-md! text-orange font-semibold'>{item.user}</h4>
                  <p className='text-sm!'>{item.comment}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Modal