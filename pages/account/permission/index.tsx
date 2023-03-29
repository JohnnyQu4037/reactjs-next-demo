import { getPermissions, deletePermission } from "@/pages/api/permission";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { message as $message } from "antd";
import SinglePermissionDialog from "./components/SinglePermissionDialog";

const Permission: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState({});
  const singleDialogRef = useRef<any>();
  const columns: ColumnsType<PERMISSION.PermissionData> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Role",
      dataIndex: "permission_name",
      width: 300,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: 300,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      width: 300,
    },
    {
      title: "Operation",
      key: "operation",
      width: 300,
      render: (_, record: PERMISSION.PermissionData) => {
        return (
          <>
            <Button type="link" onClick={() => editRow(record)}>
              Modify
            </Button>
            /
            <Popconfirm
              title="Are you sure to remove?"
              ok-text="Yes"
              cancel-text="No"
              onConfirm={() => {
                handleDeleteRole(record.id);
              }}
            >
              <Button type="link" danger>
                {" "}
                Remove{" "}
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDeleteRole = (id: number) => {
    setLoading(true);
    deletePermission({ id })
      .then(({ msg }) => {
        $message.success(msg);
        setLoading(false);
        getData();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editRow = (recordData: PERMISSION.PermissionData) => {
    setEditingData(recordData);
    singleDialogRef?.current?.toggle(true);
  };

  const getData = async () => {
    await getPermissions()
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
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <>
      <div>
        <Button type="primary" size="small" onClick={() => handleAddRole()} style={{ marginBottom: "10px" }}>
          ADD NEW ROLE
        </Button>
        <Table
          size={"small"}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record: PERMISSION.PermissionData) => record.id?.toString() || "UNKNOWN_ID" + record.permission_name}
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
        />
      </div>
      <SinglePermissionDialog role={editingData} ref={singleDialogRef} getPermissionData={getData} />
    </>
  );
};

export default Permission;
