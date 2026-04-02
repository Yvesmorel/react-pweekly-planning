// src/index.ts

// 1. Tu exportes ton composant principal
export { default as Calendar } from './components/index';

// 2. Tu exportes tout le contenu de ton fichier utils
export * from './lib/utils';
export * from './definitions/index';
export * from './hooks/useCalendarTask'
export * from './contexts/CalendarTaskContext'
export * from './components/TaskContainer/'
export * from './components/TaskContainer/TaskVirtual'
export * from './components/AddTask'
export * from './components/SumHoursContainer'
export * from './components/SumHoursHead'
export * from './components/GroupContainer'
export * from './components/VirtualGroupRow'
export * from './components/VirtualGroupRowDay'
export * from './components/DayContainer'
export { default as useCalendarDateState } from './hooks/useCalendarDateState'
export * from './contexts/CalendarTaskContext'
export * from './hooks/useIntersectionObserver'




