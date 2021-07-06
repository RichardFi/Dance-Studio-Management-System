import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { ClassListScreen } from 'screens/classList'
import { ClassManagementScreen } from 'screens/classManagement'
import { PageHeader } from 'antd'

export const PageHeaderComponent = () => {
  const [pathname, setPathname] = useState(window.location.pathname)

  return (
    <div>
      <PageHeader
        style={{ backgroundColor: '#fff' }}
        className='site-page-header'
        title={pathname}
        subTitle='This is a subtitle'
      />
    </div>
  )
}
