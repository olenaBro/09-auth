'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '../../../../components/Modal/Modal';
import NotePreview from '../../../../components/NotePreview/NotePreview';

export default function InterceptedNotePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
