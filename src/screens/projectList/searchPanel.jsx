import { useEffect, useState } from "react";

export const SearchPanel = ({users, param, setParam}) => {

    //setParam(Object.assign({}, param, ))
    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                userId: evt.target.value
            })}>
                <option value={''}>Person</option>
                {
                    users.map(user => <option value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}