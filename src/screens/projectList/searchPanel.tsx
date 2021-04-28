import React from "react";

export interface User {
    id: string;
    name:string;
    email: string;
    title: string;
    organization: string;
    role: string;
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: {
        name: string;
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    //setParam(Object.assign({}, param, ))
    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>Person</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}