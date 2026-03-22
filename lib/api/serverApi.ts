import axios from 'axios';
import { cookies } from 'next/headers';
import { apiClient } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse, FetchNotesParams } from './clientApi';

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

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await apiClient.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await apiClient.get<User>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
