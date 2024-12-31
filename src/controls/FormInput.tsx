import { Button, Col, Input, Row, Select, Typography } from 'antd'
import { Fragment, useState } from 'react'

const FormInput = (props: {
    Mode?: number
    title: string
    onClick: any
    lstRowOptions?: Option[]
    lstColOptions?: Option[]
}) => {

    const {
        Mode = 1,
        title = "Create Task:",
        onClick = () => { },
        lstRowOptions = [],
        lstColOptions = [],
    } = props

    const [valueInput, set_valueInput] = useState<string>("")
    const [valueSelect, set_valueSelect] = useState<{
        idRow: string | null
        idCol: string | null
    }>({
        idRow: null,
        idCol: null
    })

    if (Mode == 2) {
        return <Fragment>
            <Typography>
                {title}
            </Typography>
            <Row style={{ marginBottom: 4, marginTop: 4 }}>
                <Input addonBefore="Label" onChange={(e) => set_valueInput(e.target.value)} />
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="User"
                        value={valueSelect.idRow || null}
                        options={lstRowOptions}
                        onChange={(value) => set_valueSelect(prev => ({
                            ...prev,
                            idRow: value
                        }))}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Status"
                        value={valueSelect.idCol || null}
                        options={lstColOptions}
                        onChange={(value) => set_valueSelect(prev => ({
                            ...prev,
                            idCol: value
                        }))}
                    />
                </Col>
                <Col span={8}>
                    <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={() => onClick(valueInput, valueSelect)}>
                        Submit
                    </Button>
                </Col>
            </Row>

        </Fragment >
    }

    return <Fragment>
        <Typography>
            {title}
        </Typography>
        <Row style={{ marginBottom: 4, marginTop: 4 }}>
            <Input
                addonBefore="Name"
                onBlur={e => {
                    set_valueInput(e.target.value || "")
                }}
            />
        </Row>
        <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => onClick(valueInput, valueSelect)}>
            Submit
        </Button>
    </Fragment>
}


export default FormInput