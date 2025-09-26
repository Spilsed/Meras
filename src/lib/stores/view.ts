import { writable } from 'svelte/store';

<<<<<<< HEAD
export const currentViewDate = writable<Date>(new Date());
=======
export const currentViewData = writable<Date>(new Date());
>>>>>>> 2f80bf659ebb517d826f40d822dad1acefde7318
export const viewMode = writable<'day' | 'week' | 'month'>('month');
