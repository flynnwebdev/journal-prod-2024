import React, { useState, useEffect } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import NavBar from "./NavBar"
import ShowEntry from "./ShowEntry"
import useStore from "./store"


const App = () => {
    const load = useStore(state => state.load)

    useEffect(() => { load() }, [])

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<CategorySelection />} />
                <Route path="/entry">
                    <Route path=":id" element={<ShowEntry />} />
                    <Route path="new/:cat_id" element={<NewEntry />} />
                </Route>
                <Route path="*" element={<h3>Page not found!</h3>} />
            </Routes>
        </>
    )
}

export default App
