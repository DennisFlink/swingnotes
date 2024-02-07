import axios from 'axios'
import { createNewNoteItem } from './Dommanipulation'
import { NoteData, getRequestData, Note } from './Noteinterface'

const apiUrl: string = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com'

const postNote = async (noteData: NoteData) => {
   try {
      const response = await axios.post(`${apiUrl}/api/notes`, noteData, {
         headers: {
            'Content-Type': 'application/json',
         },
      })

      console.log('Axios response:', response.data)
      await getNote(noteData.username)
   } catch (error) {
      console.error('FETCH ERROR', error)
   }
}

const getNote = async (userName: string) => {
   try {
      const response = await axios.get(`${apiUrl}/api/notes/${userName}`)
      const responseData: getRequestData[] = response.data.notes
      responseData.forEach((data) => {
         createNewNoteItem(data)
      })
   } catch (error) {
      console.error('FETCH ERROR', error)
   }
}

const deleteNote = async (id: string) => {
   try {
      const response = await axios.delete(`${apiUrl}/api/notes/${id}`)
      console.log(`DELETING THIS NOTE ${id}`)
      if (response.status === 200) {
         console.log(`Note with ID ${id} deleted successfully.`)
      } else {
         console.error(`Unexpected status code: ${response.status}`)
      }
   } catch (error) {
      console.error('FETCH ERROR', error)
   }
}

const updateNoteApi = async (notedata: Note) => {
   const notetext = notedata.note
   console.log(`UPDATING ${notedata.id}`)

   try {
      const response = await axios.put(`${apiUrl}/api/notes/${notedata.id}`, {
         note: notetext,
      })

      if (response.status === 200) {
      } else {
         console.error(`Unexpected status code: ${response.status}`)
      }
   } catch (error) {
      console.error('FETCH ERROR', error)
   }
}
export { postNote, deleteNote, updateNoteApi }
