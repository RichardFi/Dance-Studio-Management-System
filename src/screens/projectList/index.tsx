//import React from 'react';
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

//import * as qs from "qs";

//const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        _id: '',
        name: ''
    });/*  */

    const debouncedParam = useDebounce(param, 200)
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const client = useHttp();

    useEffect(() => {
        client('classes', { data: cleanObject(debouncedParam) }).then(setList);
        //console.log(qs.stringify(cleanObject(param)))
        /*         fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
                    .then(async response => {
                        if (response.ok) {
                            setList(await response.json())
                        }
                    }) */
    }, [debouncedParam])

    useEffect(() => {
        client('users').then(setUsers);
        /*         fetch(`${apiUrl}/users`)
                    .then(async response => {
                        if (response.ok) {
                            setUsers(await response.json())
                        }
                    }) */
    }, [param])
    return <div>
        <Container>
            <h1>Class List</h1>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </Container>
    </div>
}

const Container = styled.div`
padding: 3.2rem;
`