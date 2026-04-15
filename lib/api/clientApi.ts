import { api } from './api';
import { Note, NoteTag } from '../../types/note';
import { User } from '../../types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface CreateNoteBody {
  title: string;
  content: string;
  tag: NoteTag;
}

interface AuthBody {
  email: string;
  password: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 12,
      ...(params.search ? { search: params.search } : {}),
      ...(params.tag && params.tag !== 'all' ? { tag: params.tag } : {}),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (body: CreateNoteBody): Promise<Note> => {
  const response = await api.post<Note>('/notes', body);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (body: AuthBody): Promise<User> => {
  const response = await api.post<User>('/auth/register', body);
  return response.data;
};

export const login = async (body: AuthBody): Promise<User> => {
  const response = await api.post<User>('/auth/login', body);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean }> => {
  const response = await api.get<{ success: boolean }>('/auth/session');
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (body: Partial<User>): Promise<User> => {
  const response = await api.patch<User>('/users/me', body);
  return response.data;
};
