import React from 'react';
import { User } from "screens/classList/searchPanel";
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link, BrowserRouter as Router} from 'react-router-dom';

export interface DanceClass {
    _id: string;
    users: [string];
    name: string;
    course: string;
    startTime: boolean;
    endTime: string;
    description: string;
    teacher: string
}

interface ListProps extends TableProps<DanceClass> {
    //list: DanceClass[],
    users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
    return <Table rowKey={"id"} pagination={false} columns={[
        {
            title: 'Class Name',
            dataIndex: 'name',
            render(value, danceClass) {
                return <Link to={danceClass._id}>{danceClass.name}</Link>
            }
        },
        {
            title: 'Start Time',
            render(value, danceClass) {
                return (
                    <span>
                        {danceClass.startTime ? danceClass.startTime : undefined}
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
    ]} {...props} />
}