import React from 'react';
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });/*  */

    const debouncedParam = useDebounce(param, 200)
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        //console.log(qs.stringify(cleanObject(param)))
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
            .then(async response => {
                if (response.ok) {
                    setList(await response.json())
                }
            })
    }, [debouncedParam])

    useEffect(() => {
        fetch(`${apiUrl}/users`)
            .then(async response => {
                if (response.ok) {
                    setUsers(await response.json())
                }
            })
    }, [param])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}