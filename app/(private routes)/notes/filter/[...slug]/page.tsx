import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { NOTE_TAGS, type NoteTag } from '@/types/note';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

const PER_PAGE = 12;

export async function generateMetadata({ params }: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filterValue = slug?.[0];

  let tagDisplay = 'all notes';

  if (filterValue && filterValue !== 'all' && NOTE_TAGS.includes(filterValue as NoteTag)) {
    tagDisplay = filterValue;
  }

  const title = `Notes tagged "${tagDisplay}" - NoteHub`;
  const description = `Browse notes filtered by the "${tagDisplay}" tag.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/filter/${filterValue}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub filtered notes',
        },
      ],
    },
  };
}

async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const filterValue = slug?.[0];

  if (!filterValue) {
    notFound();
  }

  let tag: NoteTag | undefined;
  if (filterValue === 'all') {
    tag = undefined;
  } else if (NOTE_TAGS.includes(filterValue as NoteTag)) {
    tag = filterValue as NoteTag;
  } else {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        tag,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default FilteredNotesPage;
