import { create } from 'zustand'

const apiBase = "https://journal-api-2024-ld1p.onrender.com"

const entries = await (await fetch(`${apiBase}/categories`)).json()
const categories = await (await fetch(`${apiBase}/entries`)).json()

const useStore = create(set => ({
    categories: entries,
    entries: categories,
    addEntry: async (cat_id, content) => {
        // console.log(cat_id, content)
        // TODO: Sanitise and validate entry data
        // Create a new entry from the parameters
        const newEntry = { category: cat_id, content: content }
        // Post newEntry to the API and receive returnedEntry
        const res = await fetch(`${apiBase}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        })
        const returnedEntry = await res.json()
        // Add the new entry to the list of entries
        set(state => ({entries: [...state.entries, returnedEntry]}))
        return returnedEntry._id
    }
}))

export default useStore
