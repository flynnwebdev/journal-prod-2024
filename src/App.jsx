import React, { useState, useEffect } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import NavBar from "./NavBar"
import ShowEntry from "./ShowEntry"
import useStore from "./store"

const App = () => {

    // Higher-order Component (HOC)
    const ShowEntryWrapper = () => {
        const { entries, categories } = useStore()
        // Get id from useParams
        const { id } = useParams()
        // Get entry with the given id
        const entry = entries.find((e) => e._id == id)
        const cat = entry ? categories.find((c) => c._id == entry.category) : ""
        return entry ? <ShowEntry content={entry.content} category={cat.name} /> : <h3>Entry not found!</h3>
    }

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<CategorySelection />} />
                <Route path="/entry">
                    <Route path=":id" element={<ShowEntryWrapper />} />
                    <Route path="new/:cat_id" element={<NewEntry />} />
                </Route>
                <Route path="*" element={<h3>Page not found!</h3>} />
            </Routes>
        </>
    )
}

export default App
