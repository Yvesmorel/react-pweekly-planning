// src/index.ts

// 1. Tu exportes ton composant principal
export { default as Calendar } from './components/index';

// 2. Tu exportes tout le contenu de ton fichier utils
export * from './lib/utils';
export * from './definitions/index';
// OU exportes des éléments spécifiques : export { formatTime, generateSlots } from './utils';