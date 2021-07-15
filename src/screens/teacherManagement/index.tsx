import React, { useState, useEffect } from 'react'
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Modal,
  Select
} from 'antd'
import { useHttp } from 'utils/http'
import { PageHeaderComponent } from 'components/pageHeader'
import styled from '@emotion/styled'

interface Item {
  key: string
  name: string
  _id: string
  description: string
  enrolDate: Date
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export const TeacherManagementScreen = () => {
  const originData: Item[] = []

  const page = 'Teacher Management'

  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const client = useHttp()

  const isEditing = (record: Item) => record._id === editingKey

  const edit = (record: Partial<Item> & { _id: React.Key }) => {
    form.setFieldsValue({ name: '', description: '', ...record })
    setEditingKey(record._id)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (_id: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item

      const newData = [...data]
      console.log(newData)
      const index = newData.findIndex(item => _id === item._id)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })

        client(`teachers/${newData[index]._id}`, {
          method: 'PATCH',
          data: newData[index]
        })
          .then(res => {
            setData(newData)
            setEditingKey('')
          })
          .catch(info => {
            alert(info.err.message)
          })
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true
    },
    {
      title: 'Enrol Date',
      dataIndex: 'enrolDate',
      width: '15%',
      editable: false
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        console.log(record)
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href='javascript:;'
              onClick={() => save(record._id)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  useEffect(() => {
    client('teachers')
      .then(data =>
        data.map((teacher: any) => {
          return {
            _id: teacher._id,
            name: teacher.name,
            description: teacher.description,
            enrolDate: teacher.enrolDate
          }
        })
      )
      .then(setData)
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleTeacherOk = () => {}
  return (
    <div>
      <PageHeaderComponent page={page} />
      <Modal
        title='New Teacher'
        visible={isModalVisible}
        onOk={handleTeacherOk}
        /*         confirmLoading={confirmEventLoading}
         */ onCancel={handleCancel}
      >
        <Form
          name='basic'
          initialValues={{ remember: true }}
/*           form={props.form}
          {...props.formItemLayout}
          onFinish={props.onFinishJoinClass} */
          /*       onFinish={onFinish}
          onFinishFailed={onFinishFailed} */
        >
          <Form.Item
            label='Class Name'
            name='name'
            rules={[
              { required: true, message: 'Please input the dance class name' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Container>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName='editable-row'
            pagination={{
              onChange: cancel
            }}
          />
        </Form>
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
