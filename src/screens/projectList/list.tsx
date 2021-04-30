import React from 'react';
import { User } from "screens/projectList/searchPanel";

interface DanceClass {
    _id: string;
    users: [string];
    name: string;
    course: string;
    startTime: boolean;
    endTime: string;
    description: string;
    teacher: string
}
interface ListProps {
    list: DanceClass[],
    users: User[]
}

export const List = ({ list, users }: ListProps) => {
    return <table>
        <thead>
            <tr>
                <th>class</th>
                <th>person</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(danceClass => 
                    <tr key={danceClass._id}>
                        <td>{danceClass.name}</td>
                        {danceClass && users ? <td>{users.find(user => user._id === danceClass.users[0])?.firstName || "unknown"}</td> : <td /> }  
                    </tr>)
            }
        </tbody>
    </table>
}