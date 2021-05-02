import React from 'react';
import { User } from "screens/projectList/searchPanel";
import { Table } from 'antd';
import dayjs from 'dayjs';
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
    return <Table pagination={false} columns={[
        {
            title: 'Class Name',
            dataIndex: 'name',
        },
        {
            title: 'Start Time',
            render(value, danceClass){
                return(
                    <span>
                        {danceClass.startTime ?danceClass.startTime: undefined}
                    </span>
                )
            }
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
        },
        {
            title: 'Person',
            render(value, danceClass) {
                return <span>
                    {users.find(user => user._id === danceClass.users[0])?.firstName || "unknown"}
                </span>
            },
        }
    ]} dataSource={list} />
}