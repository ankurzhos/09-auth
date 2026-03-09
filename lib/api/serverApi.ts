import axios from 'axios';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse, FetchNotesParams } from './api/clientApi';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const serverApiClient = (cookie?: string) => {
  const headers: Record<string, string> = {};
  if (cookie) {
    headers.Cookie = cookie;
  }
  return axios.create({
    baseURL,
    headers,
    withCredentials: true,
  });
};

export const fetchNotes = async (
  params: FetchNotesParams,
  cookie?: string
): Promise<FetchNotesResponse> => {
  const client = serverApiClient(cookie);
  const { data } = await client.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string, cookie?: string): Promise<Note> => {
  const client = serverApiClient(cookie);
  const { data } = await client.get<Note>(`/notes/${id}`);
  return data;
};

export const getMe = async (cookie?: string): Promise<User> => {
  const client = serverApiClient(cookie);
  const { data } = await client.get<User>('/users/me');
  return data;
};

export const checkSession = async (cookie?: string): Promise<User | null> => {
  try {
    const client = serverApiClient(cookie);
    const { data } = await client.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
};
