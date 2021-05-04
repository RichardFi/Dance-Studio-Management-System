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
import { useDanceClass } from "utils/danceClass";

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
    const { isLoading, error, data:list } = useDanceClass(debouncedParam);

    useEffect(() => {
        client('users').then(setUsers);
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