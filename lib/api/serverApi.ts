import axios from 'axios';
import { cookies } from 'next/headers';
import { Note } from '../../types/note';
import { User } from '../../types/user';

const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page ?? 1,
      perPage: 12,
      ...(params.search ? { search: params.search } : {}),
      ...(params.tag && params.tag !== 'all' ? { tag: params.tag } : {}),
    },
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async (): Promise<{ success: boolean }> => {
  const cookieHeader = await getCookieHeader();
  const response = await serverApi.get<{ success: boolean }>('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};
