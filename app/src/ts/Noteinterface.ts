export interface NoteData {
   username: string
   title: string
   note: string
}

export interface getRequestData {
   createdAt: string
   note: string
   username: string
   id: string
   title: string
}

export interface Note {
   note: string
   id: string
}
