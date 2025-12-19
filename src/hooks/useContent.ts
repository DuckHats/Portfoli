import { useLanguage } from './useLanguage';
import { contentConfig } from '../config/content.config';
export function useContent() {
  const {
    language
  } = useLanguage();
  return contentConfig[language];
}