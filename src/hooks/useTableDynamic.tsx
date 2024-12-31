import { notification, TableProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import ColumnHeader from '../components/ColumnHeader';
import TableCell from '../components/TableCell';

const useTableDynamic = () => {

    const [dataTable, set_dataTable] = useState<TableModel[]>([])
    const [dataColumns, set_dataColumns] = useState<TableCol[]>(["user"])
    const [api, contextHolder] = notification.useNotification();

    const generateId = useCallback(() => Math.random().toString(36).substr(2, 9), [])

    const openNotificationWithIcon = (type: NotificationType, message: string, description?: string) => api[type]({ message, description });

    const actCreateUser = useCallback((value: string) => {
        if (value.length === 0 || !value.trim())
            return openNotificationWithIcon("error", "User has no name")

        if (dataTable.length && dataTable.some(i => i.fields[0].name === value))
            return openNotificationWithIcon("error", "User has exist")

        set_dataTable(prev => [...prev, {
            id: generateId(),
            fields: dataColumns.map((i, index) => index === 0
                ? { name: i, taskName: value }
                : { name: i })
        }])

        return openNotificationWithIcon("success", "Creater user success")
    }, [dataTable, dataColumns])

    const actCreateStatus = useCallback((value: string) => {
        if (value.length === 0 || !value.trim())
            return openNotificationWithIcon("error", "Status has no name")
        if (dataColumns.some(i => i === value))
            return openNotificationWithIcon("error", "Status has exist")

        set_dataColumns(prev => {
            let newCol = [...prev, value]
            set_dataTable(prev => prev.map(i => ({
                ...i,
                fields: newCol.map((col, index) => ({
                    ...i.fields[index],
                    name: col,
                }))
            })))
            return newCol
        })

        return openNotificationWithIcon("success", "Creater status success")
    }, [dataTable, dataColumns])

    const actCreateTask = useCallback((value: string, valueOpt: {
        idRow: string
        idCol: string
    }) => {
        if (value.length === 0 || !value.trim())
            return openNotificationWithIcon("error", "Task has no name")
        if (!valueOpt.idCol || !valueOpt.idRow)
            return openNotificationWithIcon("error", "Creater task fail", "You have not selected a user and status.")

        let fdIndexColOfRow = dataColumns.findIndex(i => i === valueOpt.idCol)
        let fdIndexRow = dataTable.findIndex(i => i.id === valueOpt.idRow)
        if (dataTable[fdIndexRow].fields[fdIndexColOfRow].taskName)
            return openNotificationWithIcon("error", "Create task fail", "task has exist.")

        set_dataTable(prev => prev.map(i => {
            if (i.id === valueOpt.idRow) {
                i.fields[fdIndexColOfRow] = {
                    ...i.fields[fdIndexColOfRow],
                    taskName: value,
                    isDone: false
                }
                return { ...i }
            } else { return { ...i } }
        }))
        return openNotificationWithIcon("success", "Creater task succes")
    }, [dataTable, dataColumns])

    const actUpdateTask = useCallback((value: string, valueOpt: {
        idRow: string
        idCol: string
    }) => {
        if (value.length === 0 || !value.trim())
            return openNotificationWithIcon("error", "Task has no name")
        if (!valueOpt.idCol || !valueOpt.idRow)
            return openNotificationWithIcon("error", "Creater task fail", "You have not selected a user and status.")

        let fdIndexColOfRow = dataColumns.findIndex(i => i === valueOpt.idCol)
        let fdIndexRow = dataTable.findIndex(i => i.id === valueOpt.idRow)
        if (!dataTable[fdIndexRow].fields[fdIndexColOfRow].taskName)
            return openNotificationWithIcon("error", "Update task fail", "no task to update.")

        set_dataTable(prev => prev.map(i => {
            if (i.id === valueOpt.idRow) {
                i.fields[fdIndexColOfRow] = {
                    ...i.fields[fdIndexColOfRow],
                    taskName: value,
                    isDone: false
                }
            }
            return { ...i }
        }))
        return openNotificationWithIcon("success", "Update task success")
    }, [dataTable, dataColumns])

    const actCheckedCell = useCallback((checked: boolean, record: TableModel, indexCol: number) => {
        set_dataTable(prev => prev.map(i => {
            if (i.id === record.id) {
                i.fields[indexCol] = {
                    ...i.fields[indexCol],
                    isDone: checked
                }
                return { ...i }
            }
            return { ...i }
        }))
    }, [dataTable])

    let lstRowOptions = useMemo(() => {
        let dataUserRows: Option[] = dataTable.map(i => ({
            value: i.id,
            label: i.fields[0].taskName || ""
        }))
        return dataUserRows
    }, [dataTable])

    let lstColOptions = useMemo(() => {
        let lstColNotHasUser: Option[] = dataColumns.map((i) => ({
            value: i,
            label: i
        }))
        lstColNotHasUser.shift()
        return lstColNotHasUser
    }, [dataColumns])

    const onDelRow = useCallback((id: string) => {
        set_dataTable(prev => prev.filter(i => i.id !== id))
        return openNotificationWithIcon("success", "Del user succes")
    }, [dataTable])

    const onDelCol = useCallback((name: string) => {
        set_dataColumns(prev => {
            let newCol = prev.filter(i => i !== name)
            set_dataTable(prevTable => prevTable.map(itable => {
                return {
                    ...itable,
                    fields: itable.fields.filter(ftable => ftable.name !== name)
                }
            }))
            return newCol
        })
        return openNotificationWithIcon("success", "Del status succes")
    }, [dataTable, dataColumns])

    const actDeleteAllTable = useCallback(() => {
        set_dataTable([])
        set_dataColumns(["user"])
    }, [])

    const actDeleteAllTasks = useCallback(() => {
        set_dataTable(prev => prev.map(i => ({
            ...i,
            fields: i.fields.map((field, index) => ({
                name: field.name,
                ...(index === 0 && {
                    taskName: field.taskName
                })
            }))
        })))
    }, [])

    const tableColumn = useMemo(() => {
        let column: TableProps<TableModel>['columns'] = dataColumns.map((item, index) => {
            if (index === 0) {
                return {
                    title: item,
                    align: "center",
                    render: (_: string, record: TableModel) => <TableCell
                        key={record.id}
                        index={index}
                        record={record}
                        onDelRow={onDelRow}
                    />
                }
            }
            return {
                title: <ColumnHeader item={item} onDelCol={onDelCol} />,
                align: "center",
                render: (_: string, record: TableModel) => {
                    if (typeof record?.fields[index]?.isDone !== "boolean") return <></>
                    return <TableCell
                        key={record.id}
                        index={index}
                        record={record}
                        actCheckedCell={actCheckedCell}
                    />
                }
            }
        })
        return column
    }, [dataTable, dataColumns])

    return {
        contextHolder,
        dataTable,
        tableColumn,

        lstRowOptions,
        lstColOptions,

        actCreateUser,
        actCreateStatus,
        actCreateTask,
        actUpdateTask,
        actDeleteAllTable,
        actDeleteAllTasks
    }
}

export default useTableDynamic