import {
  ExpenseReportItemControllerApiCreateExpenseReportItemRequest,
  ExpenseReportItemControllerApiUpdateExpenseReportItemRequest,
  ExpenseReportItemDTOCurrencyEnum,
  ExpenseReportItemWithSubcategoryDTO,
} from "@/api_gen";
import { expenseReportRoute } from "@/features/employee/routes/employee.routes";
import { queryClient } from "@/providers/Providers";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  InputNumber,
  Modal,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import useGetExpenseReportCategories from "../hooks/useGetExpenseReportCategories";
import usePostExpenseReportItem from "../hooks/usePostExpenseReportItem";
import usePutExpenseReportItem from "../hooks/usePutExpenseReportItem";

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
  attachment: Array<UploadFile>;
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
  const { id: expenseReportId } = expenseReportRoute.useParams();
  const { data: selectCategoryOptions = [] } = useGetExpenseReportCategories();
  const [form] = Form.useForm<FormValues>();
  const { mutate: createMutate } = usePostExpenseReportItem();
  const { mutate: updateMutate } = usePutExpenseReportItem();

  function handleFinish(values: FormValues) {
    const receiptId = values.attachment[0]?.response
      ? values.attachment[0]?.response.id
      : undefined;

    const request: ExpenseReportItemControllerApiCreateExpenseReportItemRequest =
      {
        expenseReportItemDTO: {
          expenseReportId: parseInt(expenseReportId),
          receiptId,
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
          queryClient.invalidateQueries({
            queryKey: ["expense report items", expenseReportId],
          });
          message.success("Expense item updated successfully!");
          setOpen(false);
        },
        onError: () => {
          message.error("Failed to update expense item.");
        },
      });
    } else {
      createMutate(request, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["expense report items"],
          });
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
      destroyOnClose
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
          getValueFromEvent={(field: { fileList: Array<UploadFile> }) =>
            field.fileList
          }
        >
          <Upload
            action="/api/receipts"
            accept="application/pdf"
            maxCount={1}
            defaultFileList={
              item?.receiptId
                ? [
                    {
                      name: "receipt",
                      uid: "receipt",
                      url: `/api/receipts/${item?.receiptId}`,
                    },
                  ]
                : []
            }
          >
            <Button icon={<PlusOutlined />}>Upload</Button>
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
