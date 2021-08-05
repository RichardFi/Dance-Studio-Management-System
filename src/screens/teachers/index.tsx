// import React from 'react';
import { useState, useEffect } from 'react'
import { useDebounce } from '../../utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useDanceClass } from 'utils/danceClass'
import { Helmet } from 'react-helmet'
import { UserOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'

// import * as qs from "qs";

// const apiUrl = process.env.REACT_APP_API_URL;

export const TeachersScreen = () => {
  const [teachers, setTeachers] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('teachers').then(setTeachers)
  }, [])

  return (
    <div>
      <Container>
        <Helmet>
          <title>Teachers - ZeroOne</title>
        </Helmet>
        <Title>
          <UserOutlined /> Our Teachers
        </Title>
        <Content>
          <Row>
            {teachers.map(teacher => (
              <Col span={8}>
                <Card title='Card title'>
                  Card content
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
`
const Title = styled.h2`
  font-size: 2.5rem;
  padding: 2rem;
  margin: 0;
  background-color: #ffffff;
`
const Content = styled.div`
  margin: 3rem;
`
