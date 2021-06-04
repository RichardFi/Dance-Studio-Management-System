import { Button, Modal, Select, Row, Col, Form, Input, DatePicker, Popconfirm } from 'antd'

/* interface ClassModalProps {

}
 */
export const EventModal = (props: any) => {
    return <Modal
        title='Class'
        visible={props.eventVisible}
        onOk={props.handleEventOk}
        confirmLoading={props.confirmEventLoading}
        onCancel={props.handleEventCancel}
    >
        <Form
            name='basic'
            initialValues={{ remember: true }}
            form={props.form}
            {...props.formItemLayout}

        /*       onFinish={onFinish}
          onFinishFailed={onFinishFailed} */
        >
            <Form.Item
                label='Class Name'
                name='name'
                rules={[{ required: true, message: 'Please input the dance class name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Course'
                name='course'
                rules={[{ required: true, message: 'Please select a course' }]}
            >
                <Select>
                    {
                        props.course.map((course: any) => <Select.Option key={course._id} value={course._id}>{course.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item
                label='Start Time'
                name='startTime'
                rules={[{ required: true, message: 'Please input the class start time' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />

            </Form.Item>

            <Form.Item
                label='End Time'
                name='endTime'
                rules={[{ required: true, message: 'Please input the class end time' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item
                label='Teacher'
                name='teacher'
                rules={[{ required: true, message: 'Please select a teacher for the class' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Description'
                name='description'
                rules={[{ required: true, message: 'Please input description for the class' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name='join'
                label='&nbsp;'
                style={{ textAlign: 'right' }}
                colon={false}
            >
                <Button type='primary'>Join the Class</Button>
            </Form.Item>
        </Form>
    </Modal>

}