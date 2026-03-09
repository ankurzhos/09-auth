import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import { notFound } from 'next/navigation';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData(['note', id]);

  if (!note) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
};

export default NotePreview;
