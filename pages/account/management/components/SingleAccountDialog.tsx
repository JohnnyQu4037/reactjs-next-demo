import rules from "@/constant/rules";
import { Col, Form, Input, message as $message, Modal, Row, Select } from "antd";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Rule } from "antd/es/form";
import { updateAccount, createAccount } from "@/api/user";

const Ace = dynamic(() => import("@/components/editor"), { ssr: false });

const SingleAccountDialog = forwardRef(
  ({ accountData, permissionOptions, getAccountData }: any, ref) => {
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({ title: "Add New User", okText: "Create" });
    const [loading, setLoading] = useState(false);
    const [accountForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      toggle: (status: boolean) => {
        setVisible(status);
      },
    }));

    const handleOk = async () => {
      setLoading(true);

      accountForm
        .validateFields()
        .then((res) => {
          const params: any = {
            email: res.email,
            password: res.password,
            first_name: res.first_name,
            last_name: res.last_name,
            username: res.username,
            is_active: true,
            permission_id: res.permission_id,
            mobile: res.mobile,
          };
          if (accountData.id) {
            params.id = accountData.id;
            updateAccount([params])
              .then(({ msg }) => {
                $message.success(msg);
                setLoading(false);
                setVisible(false);
                getAccountData();
              })
              .catch(() => {
                setLoading(false);
              });
          } else {
            createAccount(params)
              .then(({ msg }) => {
                $message.success(msg);
                setLoading(false);
                setVisible(false);
                getAccountData();
              })
              .catch(() => {
                setLoading(false);
              });
          }
        })
        .catch((e) => {
          $message.error("Please compete the form before submission");
          setLoading(false);
        });
    };

    const findPermission = (id: number) => {
      const foundData = permissionOptions.find((i: any) => i.id === id);
      if (foundData) {
        return JSON.stringify(foundData["permission"], null, 2);
      } else {
        return JSON.stringify({}, null, 2);
      }
    };

    useEffect(() => {
      if (visible) {
        if (accountData.id) {
          setState({
            title: `Update Account`,
            okText: "Update",
          });
          accountForm.setFieldsValue({
            email: accountData.email,
            password: "",
            username: accountData.username,
            first_name: accountData.first_name,
            last_name: accountData.last_name,
            mobile: accountData.mobile,
            permission_id: accountData.permission_id,
            permission: findPermission(accountData.permission_id),
          });
        } else {
          setState({
            title: "Create New Account",
            okText: "Create",
          });
        }
      }
    }, [visible]);

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
            accountForm.resetFields();
          }}
        >
          <Form layout="vertical" form={accountForm}>
            <Row gutter={16}>
              <Col span="8">
                <Form.Item label="Email" name="email" rules={rules.email as Rule[]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    accountData.id ? {} : { required: true, message: "Please enter a Password" },
                    ...rules.password,
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item label="Username" name="username" rules={rules.username}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true, message: "Please enter first name" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true, message: "Please enter last name" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="8">
                <Form.Item label="Mobile" name="mobile">
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item label="Role Selection" name="permission_id" rules={[{ required: true }]}>
                  <Select
                    placeholder="Please Select A Role"
                    fieldNames={{ label: "permission_name", value: "id" }}
                    options={permissionOptions}
                    onChange={(value: number) => {
                      accountForm.setFieldValue("permission", findPermission(value));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item label="Permission" name="permission">
                  <Ace formRef={accountForm} readOnly={true} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
);

export default SingleAccountDialog;
