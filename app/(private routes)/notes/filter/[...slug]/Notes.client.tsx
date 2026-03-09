'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import { NoteTag } from '@/types/note';

import css from '@/app/(private routes)/notes/NotesPage.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setCurrentPage(1);
  }, 500);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes', tag, search, currentPage],
    queryFn: () => fetchNotes({ page: currentPage, perPage: PER_PAGE, search, tag }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
