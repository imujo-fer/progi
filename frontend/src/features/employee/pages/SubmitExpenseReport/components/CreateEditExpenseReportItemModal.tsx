import { PlusOutlined } from "@ant-design/icons";
import { Form, InputNumber, Modal, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

interface CreateEditExpenseReportItemModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateEditExpenseReportItemModal({
  open,
  setOpen,
}: CreateEditExpenseReportItemModalProps) {
  const selectCurrencyOptions = [{ value: "USD" }, { value: "EUR" }];
  const selectCategoryOptions = [{ value: "Transport" }, { value: "Food" }];

  return (
    <Modal open={open} onCancel={() => setOpen(false)} okText="Save">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Title>Add expense item</Title>
        <Form.Item label="Upload">
          <Upload listType="picture-card">
            <button type="button">
              <PlusOutlined />
              <div>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Category">
          <Select
            options={selectCategoryOptions}
            placeholder="Select category"
          ></Select>
        </Form.Item>

        <Form.Item label="Cost">
          <InputNumber min={0} placeholder="0" />
          <Select
            className="max-w-20"
            options={selectCurrencyOptions}
            placeholder="EUR"
          ></Select>
        </Form.Item>

        <Form.Item label="Description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
