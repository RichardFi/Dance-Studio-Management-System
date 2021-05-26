// import React from 'react';
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useState, useEffect } from 'react'
import { cleanObject, useDebounce } from '../../utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useAsync } from 'utils/useAsync'
import { DanceClass } from 'screens/classList/list'
import { Typography } from 'antd'
import { useDanceClass } from 'utils/danceClass'
import { Helmet } from 'react-helmet'

// import * as qs from "qs";

// const apiUrl = process.env.REACT_APP_API_URL;

export const ClassListScreen = () => {
  const [param, setParam] = useState({
    _id: '',
    name: ''
  })/*  */

  const debouncedParam = useDebounce(param, 200)
  const [users, setUsers] = useState([])
  // const [list, setList] = useState([]);
  const client = useHttp()
  const { isLoading, error, data: list } = useDanceClass(debouncedParam)

  useEffect(() => {
    client('users').then(setUsers)
  }, [param])

  return (
    <div>
      <Container>
        <Helmet>
          <title>Class List - ZeroOne</title>
        </Helmet>
        <h1>Class List</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        {(error != null) ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}

        <List loading={isLoading} users={users} dataSource={list || []} />
      </Container>
    </div>
  )
}

const Container = styled.div`
padding: 3.2rem;
`
