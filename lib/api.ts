import axios from 'axios';
import type { Note, NoteId, NoteTag } from '@/types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: 'created' | 'updated';
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
  sortBy,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag, sortBy },
  });
  return data;
};

export const deleteNote = async (id: NoteId) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Pick<Note, 'title' | 'content' | 'tag'>): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', note);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};
