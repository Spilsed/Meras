import { writable } from 'svelte/store';

export const currentViewData = writable<Date>(new Date());
export const viewMode = writable<'day' | 'week' | 'month'>('month');
