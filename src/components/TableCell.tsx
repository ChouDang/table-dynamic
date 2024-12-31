import { Button, Checkbox, Space, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

const TableCell = ({
    index = 0,
    record,
    onDelRow = () => { },
    actCheckedCell = () => { }
}: {
    index: number
    record: TableModel
    onDelRow?: (id: string) => void
    actCheckedCell?: (checked: boolean, record: TableModel, indexCol: number) => void
}) => {

    if (index === 0) {
        return <Space size={[8, 8]}>
            <Typography.Text strong >
                {record?.fields[index]?.taskName || ""}
            </Typography.Text>
            <Button type="primary" danger size={"small"}
                onClick={() => onDelRow(record.id)}
            ><DeleteOutlined />
            </Button>
        </Space>
    }

    return (
        <Space size={[8, 8]}>
            <Checkbox
                checked={record?.fields[index]?.isDone || false}
                onChange={(e) => actCheckedCell(e.target.checked, record, index)} />
            <Typography>
                {record?.fields[index]?.taskName || ""}
            </Typography>
        </Space>
    )
}

export default TableCell