import { writable, readonly } from "svelte/store";

export const _root = writable<HTMLElement>();
export const root = readonly(_root);