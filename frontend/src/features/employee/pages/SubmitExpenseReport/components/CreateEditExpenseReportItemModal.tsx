import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, InputNumber, Modal, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import usePostExpenseReportItem from "../hooks/usePostExpenseReportItem";
import {
  ExpenseReportItemControllerApiCreateExpenseReportItemRequest,
  ExpenseReportItemDTOCurrencyEnum,
} from "@/api_gen";

interface CreateEditExpenseReportItemModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
}

interface FormValues {
  category: string;
  cost: number;
  currency: string;
  description: string;
  attachment: string;
}

export default function CreateEditExpenseReportItemModal({
  open,
  setOpen,
  editing,
}: CreateEditExpenseReportItemModalProps) {
  const selectCurrencyOptions = Object.values(
    ExpenseReportItemDTOCurrencyEnum
  ).map((currency) => ({
    value: currency,
    label: currency,
  }));
  const selectCategoryOptions = [{ value: "Transport" }, { value: "Food" }];
  const [form] = Form.useForm<FormValues>();
  const { mutate } = usePostExpenseReportItem();

  function handleFinish(values: FormValues) {
    const request: ExpenseReportItemControllerApiCreateExpenseReportItemRequest =
      {
        expenseReportItemDTO: {
          expenseReportId: 1,
          receiptId: 5,
          expenseSubcategoryId: 1,
          description: values.description,
          currency: values.currency as ExpenseReportItemDTOCurrencyEnum,
          currencyValue: values.cost,
          eurValue: 40,
        },
      };

    mutate(request, {
      onSuccess: () => {
        message.success("Expense item saved successfully!");
        form.resetFields();
        setOpen(false);
      },
      onError: () => {
        message.error("Failed to save expense item.");
      },
    });
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      okText="Save"
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Title>{editing ? "Edit " : "Add "}Expense Item</Title>
        <Form.Item
          label="Upload"
          name="attachment"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Category"
          name="expenseSubcategoryId"
          rules={[{ required: true, message: "Please select a subcategory" }]}
        >
          <Select
            options={selectCategoryOptions}
            placeholder="Select subcategory"
          />
        </Form.Item>

        <Form.Item label="Cost" required>
          <Flex>
            <Form.Item
              name="cost"
              noStyle
              rules={[{ required: true, message: "Please enter the cost" }]}
            >
              <InputNumber min={0} placeholder="0" style={{ flex: 2 }} />
            </Form.Item>
            <Form.Item
              name="currency"
              noStyle
              rules={[{ required: true, message: "Please select a currency" }]}
            >
              <Select
                options={selectCurrencyOptions}
                placeholder="Currency"
                style={{ flex: 1 }}
              />
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please add a description" }]}
        >
          <TextArea rows={4} placeholder="Add a description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
