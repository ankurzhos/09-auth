export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteId = Note['id'];

export const NOTE_TAGS = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export type NoteTag = (typeof NOTE_TAGS)[number];
