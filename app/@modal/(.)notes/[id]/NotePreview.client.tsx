'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../../lib/api/clientApi';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

const NotePreview = ({ id }: Props) => {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button
            type="button"
            className={css.backBtn}
            onClick={handleClose}
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;