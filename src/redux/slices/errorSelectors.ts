// Чтобы избежать циклических импортов и возможных проблем с ними - задаём типы для selector-ов slice-а в отдельном файле

import type { RootState } from '../store';

export const selectError = (state: RootState) => state.error;
