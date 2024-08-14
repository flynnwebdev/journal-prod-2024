import { create } from 'zustand'

const apiBase = "https://journal-api-2024-ld1p.onrender.com"

const useStore = create(set => {
    return {
        categories: [],
        entries: [],
        load: async () => {
            const categories = await (await fetch(`${apiBase}/categories`)).json()
            const entries = await (await fetch(`${apiBase}/entries`)).json()
            set({ categories, entries })
        },
        addEntry: async (cat_id, content) => {
            const newEntry = { category: cat_id, content: content }

            const res = await fetch(`${apiBase}/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEntry),
            })
            const returnedEntry = await res.json()

            set(state => ({entries: [...state.entries, returnedEntry]}))
            return returnedEntry._id
        }
    }
})

export default useStore
