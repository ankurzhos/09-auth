import { apiClient } from './index';
import { User } from '@/types/user';
import { Note, NoteTag, NoteId } from '@/types/note';

// Аутентифікація
export const register = async (email: string, password: string): Promise<User> => {
  const { data } = await apiClient.post<User>('/auth/register', { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await apiClient.post<User>('/auth/login', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await apiClient.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/users/me');
  return data;
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await apiClient.patch<User>('/users/me', { username });
  return data;
};

// Нотатки
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await apiClient.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Pick<Note, 'title' | 'content' | 'tag'>): Promise<Note> => {
  const { data } = await apiClient.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: NoteId): Promise<Note> => {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
};
