import * as Domelement from './Domelement.ts'

const changeActiveTab = (clickedTab: HTMLElement) => {
   const tabLink = clickedTab.closest('.tab-link') as HTMLElement

   if (tabLink && !tabLink.classList.contains('active')) {
      console.log('click')
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
      Domelement.createNewNoteSection.classList.remove('hidden')
      Domelement.allNotesSection.classList.add('hidden')
   }
   if (tabLinkData == 'all notes') {
      Domelement.allNotesSection.classList.remove('hidden')
      Domelement.createNewNoteSection.classList.add('hidden')
   }
}

export { changeActiveTab, changeViews }

/* 
tabsContainer.addEventListener('click', (event) => {
   const clickedTab = (event.target as HTMLElement).closest('.tab-link')
   if (clickedTab) {
      const tabaDataValue = clickedTab.getAttribute('data-tabs')
   }
})

export { tabsContainer }
 */
