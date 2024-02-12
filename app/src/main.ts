import * as Domelelement from './ts/Domelement'
import { changeActiveTab, changeViews, deleteNotes, editTextarea, updateNote, deleteLi, goToView } from './ts/Dommanipulation'
import { NoteData } from './ts/Noteinterface'
import { postNote, deleteNote, updateNoteApi, getNote } from './ts/Apiservice'

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
Domelelement.createForm.addEventListener('submit', (event) => {
   event.preventDefault()
   const data = getvalue()
   deleteLi()
   postNote(data)
   Domelelement.createForm.reset()
   window.confirm('Note created successfully! Press OK to continue.')
   Domelelement.userNameInput.value = data.username
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

window.addEventListener('load', () => {
   const allNotes = Domelelement.allNotesSection
   goToView(allNotes)
   Domelelement.modal.showModal()
})

Domelelement.modalLogin.addEventListener('submit', (event) => {
   event.preventDefault()
   const username = Domelelement.usernameLoginInput.value
   Domelelement.userNameInput.value = username
   getNote(username)
   Domelelement.modal.close()
})
