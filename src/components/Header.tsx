import { Button, Col, Row, Space } from 'antd';
import FormInput from '../controls/FormInput';

const Header = (props: {
    lstRowOptions: Option[];
    lstColOptions: Option[];

    actCreateUser: (value: string) => void
    actCreateStatus: (value: string) => void
    actCreateTask: (value: string, valueOpt: {
        idRow: string;
        idCol: string;
    }) => void
    actUpdateTask: (value: string, valueOpt: {
        idRow: string;
        idCol: string;
    }) => void
    actDeleteAllTable: () => void
    actDeleteAllTasks: () => void
}) => {

    const {
        lstRowOptions = [],
        lstColOptions = [],
        actCreateUser = () => { },
        actCreateStatus = () => { },
        actCreateTask = () => { },
        actUpdateTask = () => { },
        actDeleteAllTable = () => { },
        actDeleteAllTasks = () => { }
    } = props

    return (
        <>
            <Row gutter={[8, 8]} style={{ marginBottom: 8 }} >
                <Col style={{ minWidth: "22%" }}>
                    <FormInput
                        title='Create User:'
                        onClick={(valueInput: string) => actCreateUser(valueInput)}
                    />
                </Col>
                <Col style={{ minWidth: "22%" }}>
                    <FormInput
                        title='Create Status:'
                        onClick={(valueInput: string,) => actCreateStatus(valueInput)}
                    />
                </Col>
                <Col style={{ minWidth: "22%" }}>
                    <FormInput
                        title='Create Task:'
                        Mode={2}
                        lstRowOptions={lstRowOptions}
                        lstColOptions={lstColOptions}
                        onClick={(valueInput: string, valueSelect: {
                            idRow: string,
                            idCol: string
                        }) => actCreateTask(valueInput, valueSelect)}
                    />
                </Col>
                <Col style={{ minWidth: "22%" }}>
                    <FormInput
                        title='Update Task:'
                        Mode={2}
                        lstRowOptions={lstRowOptions}
                        lstColOptions={lstColOptions}
                        onClick={(valueInput: string, valueSelect: {
                            idRow: string,
                            idCol: string
                        }) => actUpdateTask(valueInput, valueSelect)}
                    />
                </Col>
                <Col style={{ display: "flex", alignItems: "center", justifyContent: 'end', minWidth: "12%" }}>
                    <Space direction="vertical" >
                        <Button
                            danger
                            ghost
                            onClick={actDeleteAllTable} >
                            Delete Table
                        </Button>
                        <Button
                            danger
                            ghost
                            onClick={actDeleteAllTasks}>
                            Delete Tasks
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    )
}
export default Header;