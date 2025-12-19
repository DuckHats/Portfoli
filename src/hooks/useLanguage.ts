import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../config/content.config';
interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}
export const useLanguage = create<LanguageStore>()(persist(set => ({
  language: 'ca',
  setLanguage: language => set({
    language
  })
}), {
  name: 'duckhats-language'
}));