import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../../lib/api/serverApi';
import FilteredNotesClient from '../[...slug]/Notes.client';

export default async function ContentDefault() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', 'all'],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredNotesClient tag="all" />
    </HydrationBoundary>
  );
}
