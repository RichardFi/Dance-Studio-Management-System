//import React from 'react';
import { SearchPanel } from "./searchPanel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useAsync } from "utils/useAsync";
import { DanceClass } from "screens/projectList/list";
import { Typography } from "antd";
//import * as qs from "qs";

//const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        _id: '',
        name: ''
    });/*  */


    const debouncedParam = useDebounce(param, 200)
    const [users, setUsers] = useState([]);
    //const [list, setList] = useState([]);
    const client = useHttp();
    const { run, isLoading, error, data:list } = useAsync<DanceClass[]>();

    useEffect(() => {
        run(client('classes', { data: cleanObject(debouncedParam) }));
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
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>: null }

            <List loading={isLoading} users={users} dataSource={list || []} />
        </Container>
    </div>
}

const Container = styled.div`
padding: 3.2rem;
`