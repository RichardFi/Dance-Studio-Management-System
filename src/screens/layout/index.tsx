import React from "react"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router"
import {ClassListScreen} from "screens/classList"
import {ClassManagementScreen} from "screens/classManagement"

export const ProjectScreen = () => {
    return <div>
        <h1>Project Screen</h1>
        <Link to={'/class-management'}>Class Management</Link>
        <Link to={'/my-classes'}>My Classes</Link>
        <Routes>
            <Route path={'/class-management'} element={<ClassManagementScreen/>}/>
            <Route path={'/my-classes'} element={<ClassListScreen/>}/>
        </Routes>
    </div>
}