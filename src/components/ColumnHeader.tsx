import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

const ColumnHeader = ({
    item = "",
    onDelCol = () => { },
}: {
    item: string
    onDelCol: (id: string) => void
}) => {
    return (
        <Space>
            <Typography>
                {item || ""}
            </Typography>
            <Button type="primary" danger size={"small"}
                onClick={() => onDelCol(item)}
            ><DeleteOutlined />
            </Button>
        </Space>
    )
}

export default ColumnHeader