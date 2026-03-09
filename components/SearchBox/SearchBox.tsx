import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.trim();
    onSearch(search);
  };

  return (
    <input className={css.input} type="text" placeholder="Search notes" onChange={handleChange} />
  );
}
