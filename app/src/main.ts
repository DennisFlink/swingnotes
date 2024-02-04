import * as element from './ts/Domelement'
import { changeActiveTab, changeViews } from './ts/Dommanipulation'

element.tabsContainer.addEventListener('click', (event) => {
   const clickedTab = event.target as HTMLElement

   changeActiveTab(clickedTab)
   changeViews(clickedTab)
})
