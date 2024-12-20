import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, InputNumber, Modal, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import usePostExpenseReportItem from "../hooks/usePostExpenseReportItem";
import {
  ExpenseReportItemControllerApiCreateExpenseReportItemRequest,
  ExpenseReportItemControllerApiUpdateExpenseReportItemRequest,
  ExpenseReportItemDTOCurrencyEnum,
  ExpenseReportItemWithSubcategoryDTO,
} from "@/api_gen";
import Title from "antd/es/typography/Title";
import usePutExpenseReportItem from "../hooks/usePutExpenseReportItem";
import useGetExpenseReportCategories from "../hooks/useGetExpenseReportCategories";
import { queryClient } from "@/providers/Providers";

interface CreateEditExpenseReportItemModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item?: ExpenseReportItemWithSubcategoryDTO;
}

interface FormValues {
  categoryId: number;
  cost: number;
  currency: string;
  description: string;
  attachment: string;
}

export default function CreateEditExpenseReportItemModal({
  open,
  setOpen,
  item,
}: CreateEditExpenseReportItemModalProps) {
  const selectCurrencyOptions = Object.values(
    ExpenseReportItemDTOCurrencyEnum
  ).map((currency) => ({
    value: currency,
    label: currency,
  }));
  const { data: selectCategoryOptions = [] } = useGetExpenseReportCategories();
  const [form] = Form.useForm<FormValues>();
  const { mutate: createMutate } = usePostExpenseReportItem();
  const { mutate: updateMutate } = usePutExpenseReportItem();

  function handleFinish(values: FormValues) {
    const request: ExpenseReportItemControllerApiCreateExpenseReportItemRequest =
      {
        expenseReportItemDTO: {
          expenseReportId: 2,
          receiptId: 9,
          expenseSubcategoryId: values.categoryId,
          description: values.description,
          currency: values.currency as ExpenseReportItemDTOCurrencyEnum,
          currencyValue: values.cost,
          eurValue: 40,
        },
      };

    if (item) {
      const updateRequest: ExpenseReportItemControllerApiUpdateExpenseReportItemRequest =
        {
          id: item?.id,
          expenseReportItemDTO: request.expenseReportItemDTO,
        };
      updateMutate(updateRequest, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["expense report items"] });
          message.success("Expense item updated successfully!");
          form.resetFields();
          setOpen(false);
        },
        onError: () => {
          message.error("Failed to update expense item.");
        },
      });
    } else {
      createMutate(request, {
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
  }

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      okText="Save"
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{
          categoryId: item?.expenseSubcategory.id,
          cost: item?.currencyValue,
          currency: item?.currency,
          description: item?.description,
        }}
      >
        <Title>{item ? "Edit " : "Add "}Expense Item</Title>
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
          name="categoryId"
          rules={[{ required: true, message: "Please select a subcategory" }]}
        >
          <Select
            options={selectCategoryOptions?.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
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
                className="flex-1"
                value={item?.currency}
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
