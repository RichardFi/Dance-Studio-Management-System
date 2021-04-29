import React from "react";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    role: string;
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: {
        _id: string;
        name: string
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
            <select value={param._id} onChange={evt => setParam({
                ...param,
                _id: evt.target.value
            })}>
                <option value={''}>Person</option>
                {
                    users.map(user => <option key={user.email} value={user.email}>{user.firstName}</option>)
                }
            </select>
        </div>
    </form>
}