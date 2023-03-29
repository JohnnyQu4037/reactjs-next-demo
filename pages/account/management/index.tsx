import { getAccounts, deleteAccounts } from "@/pages/api/user";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { sortString, sortDate } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { message as $message } from "antd";

// import SinglePermissionDialog from "./components/SinglePermissionDialog";

const Management: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [selectedUser, setSelectedUser] = useState<ACCOUNT.AccountData[]>([]);
  const singleDialogRef = useRef<any>();
  const columns: ColumnsType<ACCOUNT.AccountData> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) => sortDate(a.last_login || "", b.last_login || ""),
      width: 300,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) => sortString(a.first_name || "", b.first_name || ""),
      width: 300,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) => sortString(a.last_name || "", b.last_name || ""),
      width: 300,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: "Active",
      dataIndex: "is_active",
      filters: [
        { text: "Active", value: true },
        { text: "InActive", value: false },
      ],
      onFilter: (value, record: ACCOUNT.AccountData) => record.is_active === value,
      width: 300,
      render(value) {
        return value ? "Active" : "InActive";
      },
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      width: 300,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) => sortDate(a.created_at || "", b.created_at || ""),
      width: 300,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) => sortDate(a.updated_at || "", b.updated_at || ""),
      width: 300,
    },
    {
      title: "Operation",
      key: "operation",
      width: 250,
      render: (_, record: ACCOUNT.AccountData) => {
        return (
          <>
            <Button type="link" onClick={() => editRow(record)}>
              Edit
            </Button>
            /
            <Popconfirm
              title="Are you sure to remove?"
              ok-text="Yes"
              cancel-text="No"
              onConfirm={() => {
                handleDeleteRole(record.id);
              }}
              disabled
            >
              <Button type="link" danger disabled>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDeleteRole = (id: number) => {
    setLoading(true);
    deleteAccounts({ id })
      .then(({ msg }) => {
        $message.success(msg);
        setLoading(false);
        getData();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editRow = (recordData: ACCOUNT.AccountData) => {
    setEditingData(recordData);
    singleDialogRef?.current?.toggle(true);
  };

  const getData = async () => {
    await getAccounts()
      .then((response) => {
        setDataSource(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleAddRole = () => {
    setEditingData({});
    singleDialogRef?.current?.toggle(true);
  };

  const rowSelection = {
    onChange: (_: any, selectedRows: ACCOUNT.AccountData[]) => {
      setSelectedUser(selectedRows);
    },
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <>
      <div>
        <Button type="primary" size="small" onClick={() => handleAddRole()}>
          ADD NEW USER
        </Button>
        <Button
          type="primary"
          danger
          size="small"
          onClick={() => handleAddRole()}
          disabled={!selectedUser.length ? true : false}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
        >
          UPDATE PERMISSION
        </Button>
        <Table
          size={"small"}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record: ACCOUNT.AccountData) => record.id.toString()}
          loading={loading}
          pagination={{
            total: dataSource.length,
            position: ["bottomRight"],
            showTotal: (total) => `Total ${total} items`,
            defaultPageSize: 20,
            defaultCurrent: 1,
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
          }}
          rowSelection={{ ...rowSelection }}
        />
      </div>
      {/* <SinglePermissionDialog role={editingData} ref={singleDialogRef} getPermissionData={getData} /> */}
    </>
  );
};

export default Management;
