import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { getPermissions, updatePermission, createPermission, deletePermission } from "@/pages/api/permission";

async function getData() {
  const response = await getPermissions();
  const data = response.data;
  console.log(data);
}
function Permission() {
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <Button type="primary" size="small" onClick={() => "handleAddRole"}>
          ADD NEW ROLE
        </Button>
        {/* <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="(record: PERMISSION.PermissionData) => record.id"
          loading={loading}
          // :pagination="pagination"
        /> */}
      </div>
    </>
  );
}

// <template>
//
//         <single-permission-dialog
//             ref="singleDialogRef"
//             :role="state.editing"
//             @submit="run"
//         />
//     </div>
// </template>
// <script setup lang="ts">
// import { ref, reactive, watch } from 'vue';
// import type { TableColumnsType } from 'ant-design-vue';
// import { usePagination } from 'vue-request';
// import { getPermissions, deletePermission } from '@/api/permission';
// import SinglePermissionDialog from './components/SinglePermissionDialog.vue';
// import { usePermissionStore } from '@/store/modules/permission';

// const columns: TableColumnsType = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         width: 100,
//     },
//     {
//         title: 'Role',
//         dataIndex: 'permission_name',
//         width: 300,
//     },
//     {
//         title: 'Created At',
//         dataIndex: 'created_at',
//         width: 300,
//     },
//     {
//         title: 'Updated At',
//         dataIndex: 'updated_at',
//         width: 300,
//     },
//     {
//         title: 'Operation',
//         key: 'operation',
//         width: 300,
//     },
// ];

// const singleDialogRef = ref();
// const permissionStore = usePermissionStore();

// const {
//     data: dataSource,
//     run,
//     loading,
//     current,
//     pageSize,
//     total,
//     ...rest
// } = usePagination(getPermissions, {
//     formatResult: (res) => res,
//     pagination: {
//         totalKey: 'length',
//     },
// });

// const pagination = reactive({
//     total,
//     showTotal: (total: number) => `Total ${total} items`,
//     showSizeChanger: true,
//     defaultPageSize: 20,
//     pageSizeOptions: [10, 20, 30, 40],
// });
// const state = reactive<{
//     editing: PERMISSION.PermissionData | object;
// }>({
//     editing: {},
// });

// const editRow = (record: PERMISSION.PermissionData) => {
//     state.editing = record;
//     singleDialogRef.value.toggle();
// };

// const handleAddRole = () => {
//     state.editing = {};
//     singleDialogRef.value.toggle();
// };

// const handleDeleteRole = (id: number) => {
//     return new Promise((resolve) => {
//         deletePermission({ id })
//             .then(() => {
//                 run();
//             })
//             .catch((e) => {
//                 console.log(e);
//             })
//             .finally(() => {
//                 resolve(true);
//             });
//     });
// };

// watch(dataSource, (val) => {
//     // update permission store
//     permissionStore.setPermissions(val);
// });
// </script>
// <style lang="less" scoped>
// .permission-manager {
//     .btns {
//         margin-bottom: 16px;
//     }
// }
// </style>
export default Permission;
