import * as Domelement from './Domelement.ts'
import { getRequestData, Note } from './Noteinterface.ts'

const changeActiveTab = (clickedTab: HTMLElement) => {
   const tabLink = clickedTab.closest('.tab-link') as HTMLElement

   if (tabLink && !tabLink.classList.contains('active')) {
      document.querySelectorAll('.active').forEach((tab) => {
         tab.classList.remove('active')
      })
      tabLink.classList.add('active')
   }
}

const changeViews = (clickedTab: HTMLElement) => {
   const tabLink = clickedTab.closest('.tab-link') as HTMLElement
   const tabLinkData = tabLink.dataset.tabs
   if (tabLinkData == 'new note') {
      const newNote = Domelement.createNewNoteSection
      goToView(newNote)
   }
   if (tabLinkData == 'all notes') {
      const allNotes = Domelement.allNotesSection
      goToView(allNotes)
   }
}
const goToView = (displaySection: HTMLElement) => {
   const allSections = document.querySelectorAll('section:not(.tabs)') as NodeListOf<HTMLElement>

   allSections.forEach((section) => {
      if (section !== displaySection) {
         section.classList.add('hidden')
      }
   })
   displaySection.classList.remove('hidden')
}

const createNewNoteItem = (noteData: getRequestData) => {
   const { username, title, note, createdAt, id } = noteData

   const listItem = document.createElement('li') as HTMLElement
   listItem.setAttribute('class', 'note-item')
   listItem.setAttribute('data-note-id', id)

   const noteTitle = document.createElement('h2') as HTMLElement
   noteTitle.setAttribute('class', 'note-title')
   noteTitle.textContent = title

   const dateContainer = document.createElement('div') as HTMLElement
   dateContainer.setAttribute('class', 'date-container')

   const dateParagraph = document.createElement('p') as HTMLElement
   dateParagraph.textContent = formatDate(createdAt)

   const contentContainer = document.createElement('div') as HTMLElement
   contentContainer.setAttribute('class', 'content-container')

   const textarea = document.createElement('textarea') as HTMLElement
   textarea.setAttribute('cols', '33')
   textarea.setAttribute('rows', '8')
   textarea.setAttribute('placeholder', 'Enter your note here...')
   textarea.setAttribute('readonly', '')
   textarea.textContent = note

   const authorContainer = document.createElement('div') as HTMLElement
   authorContainer.setAttribute('class', 'autor-container')

   const lineIcon = document.createElement('ion-icon')
   lineIcon.setAttribute('class', 'icon')
   lineIcon.setAttribute('name', 'remove-outline')
   const authorSpan = document.createElement('span')
   authorSpan.textContent = username
   const buttonContainer = document.createElement('div')
   buttonContainer.setAttribute('class', 'button-container')

   const editButton = document.createElement('button')
   editButton.setAttribute('type', 'button')
   editButton.setAttribute('class', 'edit-button button')
   editButton.textContent = 'EDIT'

   const deleteButton = document.createElement('button')
   deleteButton.setAttribute('type', 'button')
   deleteButton.setAttribute('class', 'delete-button button')
   deleteButton.textContent = 'DELETE'
   deleteButton.setAttribute('data-note-id', id)

   Domelement.noteList.appendChild(listItem)
   listItem.appendChild(noteTitle)

   listItem.appendChild(dateContainer)
   dateContainer.appendChild(dateParagraph)

   listItem.appendChild(contentContainer)
   contentContainer.appendChild(textarea)

   listItem.appendChild(authorContainer)
   authorContainer.appendChild(lineIcon)
   authorContainer.appendChild(authorSpan)

   listItem.appendChild(buttonContainer)
   buttonContainer.appendChild(editButton)
   buttonContainer.appendChild(deleteButton)
}
const deleteLi = () => {
   const ul = Domelement.noteList
   while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
   }
}
const deleteNotes = (clickedBtn: HTMLElement) => {
   const deleteBtnData = clickedBtn.dataset.noteId
   if (deleteBtnData) {
      const listItem = clickedBtn.closest('.note-item') as HTMLElement
      if (listItem) {
         listItem.remove()
      }
   }
}

const changeTextareaAttr = (textarea: HTMLTextAreaElement | null) => {
   if (textarea) {
      const isReadonly = textarea.getAttribute('readonly') !== null
      if (isReadonly) {
         textarea.removeAttribute('readonly')
         textarea.setAttribute('placeholder', 'Edit your note here...')
         textarea.style.cursor = 'auto'
      } else {
         textarea.setAttribute('readonly', '')
         textarea.setAttribute('placeholder', 'Enter your note here...')
         textarea.style.cursor = 'default'
      }
   }
}
const editTextarea = (clickedBtn: HTMLElement) => {
   if (clickedBtn) {
      const noteItem = clickedBtn.closest('.note-item')
      if (noteItem) {
         const textarea = noteItem.querySelector('textarea')
         changeTextareaAttr(textarea)
      }
   }
   if (clickedBtn.classList.contains('edit-button')) {
      clickedBtn.textContent = 'UPDATE'
      clickedBtn.classList.remove('edit-button')
      clickedBtn.classList.add('update-button')
   } else if (clickedBtn.classList.contains('update-button')) {
      clickedBtn.textContent = 'EDIT'
      clickedBtn.classList.remove('update-button')
      clickedBtn.classList.add('edit-button')
   }
}

const updateNote = <T extends Note>(clickedBtn: HTMLElement) => {
   if (clickedBtn) {
      const noteItem = clickedBtn.closest('.note-item') as HTMLElement

      if (noteItem) {
         const textarea = noteItem.querySelector('textarea')
         const updatedText = textarea!.value.trim()
         const noteId = noteItem.dataset.noteId as string
         const note: T = {
            note: updatedText,
            id: noteId,
         } as T
         return note
      }
   }
}

const formatDate = (date: string) => {
   const splitDateParts = date.split('/')
   const joinedParts = new Date(`${splitDateParts[2]}-${splitDateParts[0]}-${splitDateParts[1]}`)
   const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

   const day = joinedParts.getDate()
   const getWeekDayIndex = joinedParts.getDay()
   const WeekDay = weekDays[getWeekDayIndex]

   const monthIndex = joinedParts.getMonth()

   const monthName = months[monthIndex]

   const year = joinedParts.getFullYear()

   const formattedDate = `${WeekDay} ${day} ${monthName} ${year}`
   return formattedDate
}

export { changeActiveTab, changeViews, createNewNoteItem, deleteNotes, editTextarea, updateNote, goToView, deleteLi }
