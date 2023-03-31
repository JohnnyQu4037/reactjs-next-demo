import { Col, Form, message as $message, Modal, Row, Select } from "antd";
import dynamic from "next/dynamic";
import deepClone from "deep-clone";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { updateAccount } from "@/api/user";

const Ace = dynamic(() => import("@/components/editor"), { ssr: false });

const BatchAccountDialog = forwardRef(
  ({ accountData, permissionOptions, getAccountData }: any, ref) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const [accountBatchForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      toggle: (status: boolean) => {
        setVisible(status);
      },
    }));

    const handleOk = async () => {
        setLoading(true);
      accountBatchForm
        .validateFields()
        .then((res) => {
          const copied = deepClone(accountData);
          copied.map((item: any) => (item.permission_id = res.permission_id));

          updateAccount(copied)
            .then(({ msg }) => {
              $message.success(msg);
              setLoading(false);
              setVisible(false);
              getAccountData();
            })
            .catch(() => {
              setLoading(false);
            });
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
        setSelected(false);
        accountBatchForm.setFieldsValue({
          permission_id: null,
          permission: null,
        });
      }
    }, [visible]);

    return (
      <>
        <Modal
          width="800px"
          open={visible}
          okText="update"
          title="Batch Update User Permission"
          maskClosable={false}
          destroyOnClose
          confirmLoading={loading}
          okButtonProps={{
            disabled: !selected,
          }}
          onOk={() => handleOk()}
          onCancel={() => {
            setVisible(false);
            accountBatchForm.resetFields();
          }}
        >
          <Form layout="vertical" form={accountBatchForm}>
            <Row gutter={16}>
              <Col span="24">
                <Form.Item label="Role Selection" name="permission_id" rules={[{ required: true }]}>
                  <Select
                    placeholder="Please Select A Role"
                    fieldNames={{ label: "permission_name", value: "id" }}
                    options={permissionOptions}
                    onChange={(value: number) => {
                      accountBatchForm.setFieldValue("permission", findPermission(value));
                      setSelected(true);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item label="Permission" name="permission">
                  <Ace formRef={accountBatchForm} readOnly={true} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
);

export default BatchAccountDialog;
