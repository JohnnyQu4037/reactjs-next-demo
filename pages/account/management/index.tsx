import { getAccounts, deleteAccounts } from "@/api/user";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { sortString, sortDate } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { getPermissions } from "@/api/permission";
import { message as $message } from "antd";
import SingleAccountDialog from "./components/SingleAccountDialog";
import BatchAccountDialog from "./components/BatchAccountDialog";

const Management: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [selectedUser, setSelectedUser] = useState<ACCOUNT.AccountData[]>([]);
  const singleAccountDialogRef = useRef<any>();
  const batchAccountDialogRef = useRef<any>();

  const [permissionOptions, setPermissionOptions] = useState([]);
  const columns: ColumnsType<ACCOUNT.AccountData> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "User Name",
      dataIndex: "username",
      width: 200,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) =>
        sortString(a.first_name || "", b.first_name || ""),
      width: 200,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) =>
        sortString(a.last_name || "", b.last_name || ""),
      width: 200,
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
      width: 100,
      render(value) {
        return value ? "Active" : "InActive";
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 150,
      render(value, record, index) {
        const found = permissionOptions.find((i: any) => i.id === record.permission_id) || {
          permission_name: "unknown",
        };
        return found["permission_name"] || null;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      width: 300,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) =>
        sortDate(a.created_at || "", b.created_at || ""),
      width: 300,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      sorter: (a: ACCOUNT.AccountData, b: ACCOUNT.AccountData) =>
        sortDate(a.updated_at || "", b.updated_at || ""),
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
                handelDeleteAccount(record.id);
              }}
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handelDeleteAccount = (id: number) => {
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
    singleAccountDialogRef?.current?.toggle(true);
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

  const handleAddAccount = () => {
    setEditingData({});
    singleAccountDialogRef?.current?.toggle(true);
  };

  const handleBatchUpdate = () => {
    setEditingData(selectedUser);
    batchAccountDialogRef?.current?.toggle(true);
  };

  const rowSelection = {
    onChange: (_: any, selectedRows: ACCOUNT.AccountData[]) => {
      setSelectedUser(selectedRows);
    },
  };
  useEffect(() => {
    getPermissions().then((response) => {
      setPermissionOptions(response);
    });
    setLoading(true);
    getData();
  }, []);
  return (
    <>
      <div>
        <Button type="primary" size="small" onClick={() => handleAddAccount()}>
          ADD NEW USER
        </Button>
        <Button
          type="primary"
          danger
          size="small"
          disabled={!selectedUser.length ? true : false}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          onClick={() => {
            handleBatchUpdate();
          }}
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
      <SingleAccountDialog
        accountData={editingData}
        ref={singleAccountDialogRef}
        permissionOptions={permissionOptions}
        getAccountData={getData}
      />
      <BatchAccountDialog
        ref={batchAccountDialogRef}
        accountData={editingData}
        permissionOptions={permissionOptions}
        getAccountData={getData}
      />
    </>
  );
};

export default Management;
