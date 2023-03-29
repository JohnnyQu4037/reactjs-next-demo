import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Form, Input } from "antd";
import { updatePermission, createPermission } from "@/pages/api/permission";
import { message as $message } from "antd";
import dynamic from "next/dynamic";

const Ace = dynamic(() => import("@/components/editor"), { ssr: false });

const SinglePermissionDialog = forwardRef(({ role, getPermissionData }: any, ref) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({ title: "Add New User", okText: "Create" });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    toggle: (status: boolean) => {
      setVisible(status);
    },
  }));

  const handleOk = async () => {
    setLoading(true);

    const params: any = validate();
    if (params) {
      if (role.id) {
        params.id = role.id;
        updatePermission(params)
          .then(({ msg }) => {
            $message.success(msg);
            setLoading(false);
            setVisible(false);
            getPermissionData();
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        createPermission(params)
          .then(({ msg }) => {
            $message.success(msg);
            setLoading(false);
            setVisible(false);
            getPermissionData();
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };

  const validate = () => {
    try {
      const { permission_name, permission } = form.getFieldsValue();
      return {
        permission_name,
        permission: JSON.parse(permission),
      };
    } catch (e) {
      console.log(e);
      $message.error("Please enter config in correct Json format");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role.id) {
      setState({
        title: `Modify Role ${role.permission_name}`,
        okText: "Update",
      });
      form.setFieldsValue({ permission_name: role.permission_name, permission: JSON.stringify(role.permission, null, 2) });
    } else {
      setState({
        title: "Add New Role",
        okText: "Create",
      });
    }
  }, [role]);

  return (
    <>
      <Modal
        width="800px"
        open={visible}
        okText={state.okText}
        title={state.title}
        maskClosable={false}
        destroyOnClose
        confirmLoading={loading}
        onOk={() => handleOk()}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="permission_name" label="Role Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="permission" label="Permission Config" rules={[{ required: true }]}>
            <Ace formRef={form} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default SinglePermissionDialog;
