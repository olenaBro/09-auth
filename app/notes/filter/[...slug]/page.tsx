import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import FilteredNotesClient from './Notes.client';

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? 'all';
  const title =
    currentTag === 'all'
      ? 'All Notes | NoteHub'
      : `${currentTag} Notes | NoteHub`;
  const description =
    currentTag === 'all'
      ? 'Browse all your notes in NoteHub.'
      : `Browse notes filtered by ${currentTag} tag in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/filter/${currentTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? 'all';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () => fetchNotes({ page: 1, tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredNotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
