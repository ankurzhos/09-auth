import { cookies } from 'next/headers';
import { apiClient } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse, FetchNotesParams } from './clientApi';

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const { data } = await apiClient.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await apiClient.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
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

export interface CheckSessionResponse {
  headers: Record<string, string | string[] | undefined>;
  data: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  };
}

export const checkSession = async (): Promise<CheckSessionResponse> => {
  const cookieStore = await cookies();
  const res = await apiClient.get<CheckSessionResponse['data']>('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });

  const safeHeaders: Record<string, string | string[] | undefined> = Object.fromEntries(
    Object.entries(res.headers).map(([key, value]) => [key, value ?? undefined])
  );

  return { headers: safeHeaders, data: res.data };
};
