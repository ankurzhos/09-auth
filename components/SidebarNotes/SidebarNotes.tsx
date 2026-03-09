import Link from 'next/link';
import { NOTE_TAGS } from '@/types/note';

import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {NOTE_TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag === 'all' ? 'All notes' : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
