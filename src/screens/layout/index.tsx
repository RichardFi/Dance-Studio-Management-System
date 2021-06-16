import React from "react"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router"
import {ClassListScreen} from "screens/classList"
import {CalendarScreen} from "screens/calendar"

export const ProjectScreen = () => {
    return <div>
        <h1>Project Screen</h1>
        <Link to={'/calendar'}>Calendar</Link>
        <Link to={'/my-classes'}>My Classes</Link>
        <Routes>
            <Route path={'/calendar'} element={<CalendarScreen/>}/>
            <Route path={'/my-classes'} element={<ClassListScreen/>}/>
        </Routes>
    </div>
}