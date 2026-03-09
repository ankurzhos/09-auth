import { cookies } from 'next/headers';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import css from '@/app/(private routes)/profile/ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'My profile - NoteHub',
  description: 'View and edit your profile.',
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const user = await getMe(cookie);

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
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
