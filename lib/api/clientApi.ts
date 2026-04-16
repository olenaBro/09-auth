import { api } from './api';
import type { Note, NoteTag } from '@/types/note';

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
import type { User } from '@/types/user';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username: string;
}

// ---- Notes ----
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

// ---- Auth ----
export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<{ success: boolean }>('/auth/session');
  return data.success;
};

// ---- User ----
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
};