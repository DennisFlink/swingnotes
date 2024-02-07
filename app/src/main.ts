import * as Domelelement from './ts/Domelement'
import { changeActiveTab, changeViews, deleteNotes, editTextarea, updateNote, goToView, deleteLi } from './ts/Dommanipulation'
import { NoteData } from './ts/Noteinterface'
import { postNote, deleteNote, updateNoteApi } from './ts/Apiservice'

Domelelement.tabsContainer.addEventListener('click', (event) => {
   const clickedTab = event.target as HTMLElement

   changeActiveTab(clickedTab)
   changeViews(clickedTab)
})

const getvalue = () => {
   const username = Domelelement.userNameInput.value.trim() as string
   const title = Domelelement.titleInput.value.trim() as string
   const note = Domelelement.textareaInput.value.trim() as string

   const noteData: NoteData = {
      username: username,
      title: title,
      note: note,
   }
   return noteData
}
Domelelement.publishBtn.addEventListener('click', () => {
   const data = getvalue()
   deleteLi()
   postNote(data)
   const allNotes = Domelelement.allNotesSection
   goToView(allNotes)
})

Domelelement.noteList.addEventListener('click', (event) => {
   const deleteBtn = event.target as HTMLElement
   if (!deleteBtn.classList.contains('delete-button')) {
      return
   }

   deleteNotes(deleteBtn)

   const deleteBtnData = deleteBtn.dataset.noteId
   if (deleteBtnData) {
      deleteNote(deleteBtnData)
   }
})

Domelelement.noteList.addEventListener('click', (event) => {
   const editBtn = event.target as HTMLElement
   if (editBtn.classList.contains('edit-button')) {
      editTextarea(editBtn)
   } else if (editBtn.classList.contains('update-button')) {
      const text = updateNote(editBtn)
      if (text) {
         updateNoteApi(text)
         editTextarea(editBtn)
      }
   }
})
