import {SearchPanel} from "./searchPanel";
import {List} from "./list";
import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const PorjectListScreen = () =>{
    const [param, setParam] = useState({
        name: '',
        userId: ''
    });
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() =>{
        fetch(`${apiUrl}/users`)
        .then(async response =>{
            if (response.ok){
                setList(await response.json())
            }
        })
    }, [param])

    useEffect(() =>{
        fetch(`${apiUrl}/classes`
        .then(async response =>{
            if (response.ok){
                setList(await response.json())
            }
        }))
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}