'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../../lib/api/clientApi';
import css from './page.module.css';

export default function ProfilePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || 'N/A'}</p>
          <p>Email: {user?.email || 'N/A'}</p>
        </div>
      </div>
    </main>
  );
}
