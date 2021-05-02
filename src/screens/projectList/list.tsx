import React from 'react';
import { User } from "screens/projectList/searchPanel";
import { Table } from 'antd';
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
    return <Table pagination={false} columns={[{
        title: 'Class Name',
        dataIndex: 'name',
    },{
        title: 'Person',
        render(danceClass) {
            return <span>
                {users.find(user => user._id === danceClass.users[0])?.firstName || "unknown"}
            </span>
        }
    }
    ]} dataSource={list} />
}