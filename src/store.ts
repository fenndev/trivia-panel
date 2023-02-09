import { writable } from 'svelte/store'
import Category from './classes/Category'

export const categories = writable<Category[]>([])
