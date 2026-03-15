import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NoteTag } from '@/types/note';

interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: Draft;
  setDraft: (draft: Partial<Draft>) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: newData =>
        set(state => ({
          draft: { ...state.draft, ...newData },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { initialDraft };
