/* SECTIONS  */
const allNotesSection = document.querySelector('.all-notes-container') as HTMLElement
const createNewNoteSection = document.querySelector('.create-note-container') as HTMLElement

/* TABS */

/* CONTAINERS  */
const buttonContainer = document.querySelector('.button-container') as HTMLElement
const tabsContainer = document.querySelector('.tabs-wrapper') as HTMLElement
/* BUTTONS */

const publishBtn = document.querySelector('.publish-button') as HTMLElement
const deleteBtn = document.querySelector('.delete-button') as HTMLButtonElement

/* UL LIST  */
const noteList = document.querySelector('.notes-list') as HTMLElement

/* INPUT */
const titleInput = document.querySelector('.title-input') as HTMLInputElement
const textareaInput = document.querySelector('.note-field') as HTMLTextAreaElement
const userNameInput = document.querySelector('.username-input') as HTMLInputElement
export { allNotesSection, createNewNoteSection, tabsContainer, publishBtn, noteList, userNameInput, textareaInput, titleInput, buttonContainer, deleteBtn }
