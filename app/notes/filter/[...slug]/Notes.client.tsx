'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import css from './Notes.module.css';

interface FilteredNotesClientProps {
  tag: string;
}

export default function FilteredNotesClient({
  tag,
}: FilteredNotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSetSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {!isLoading && !isError && notes.length > 0 && (
        <NoteList notes={notes} />
      )}
    </div>
  );
}
