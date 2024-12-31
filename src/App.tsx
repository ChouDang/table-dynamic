import { Layout, Table } from "antd";
import Header from "./components/Header";
import useTableDynamic from "./hooks/useTableDynamic";
import './App.css';

function App() {

  const {
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
    actDeleteAllTasks,

  } = useTableDynamic()

  return (
    <>
      <Layout>
        {contextHolder}
        <Layout.Content style={{ margin: 16 }}>
          <Header
            lstRowOptions={lstRowOptions}
            lstColOptions={lstColOptions}

            actCreateUser={actCreateUser}
            actCreateStatus={actCreateStatus}
            actCreateTask={actCreateTask}
            actUpdateTask={actUpdateTask}
            actDeleteAllTable={actDeleteAllTable}
            actDeleteAllTasks={actDeleteAllTasks}
          />
          <Table
            rowKey={'id'}
            dataSource={dataTable}
            columns={tableColumn}
          />
        </Layout.Content>
      </Layout>
    </>
  )
}

export default App
