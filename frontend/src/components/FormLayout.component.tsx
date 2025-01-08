import { Form, Button, Modal, FormInstance } from "antd";
import useModal from "../hooks/useModal";
import TextArea from "antd/es/input/TextArea";

type FormLayoutProps<T extends object> = {
  title?: string;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  isPending?: boolean;
  onDiscard: () => void;
  discardLabel?: string;
  submitLabel?: string;
  hideCancel?: boolean;
  form: FormInstance;
  disabled?:boolean;
};

export function FormLayout<T extends object>({
  onSubmit,
  title,
  children,
  isPending,
  onDiscard,
  submitLabel,
  discardLabel,
  hideCancel,
  form,
  disabled
}: FormLayoutProps<T>) {
  const discardModal = useModal();

  const onCancel = () => {
    if (form.isFieldsTouched()) {
      discardModal.openModal();
    } else {
      onDiscard();
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      {title && <h1 className="mb-8 mt-4 text-2xl font-medium">{title}</h1>}
      {children}
      <div className="mt-14 flex justify-end gap-2">
        {!hideCancel && (
          <Button danger onClick={onCancel}>
            {discardLabel || "Cancel"}
          </Button>
        )}
        <Button type="primary" htmlType="submit" loading={isPending}>
          {submitLabel || "Save"}
        </Button>
        <Modal
          title={disabled? "Request Revision":"Discard changes?"}
          open={discardModal.isModalOpen}
          onOk={onDiscard}
          onCancel={discardModal.closeModal}
          okText={disabled ? "Request revision":"Discard changes"}
          okType="danger"
          cancelText={disabled? "Review again":"Keep editing"}
          okButtonProps={{ type: "primary" }}
        >
            {disabled ? (
            <>
              <Form.Item
              name="revisionMessage"
              rules={[{ required: true, message: 'Please input the required changes!' }]}
              >
              <TextArea placeholder="Input required changes" />
              </Form.Item>
            </>
            ) : <p>
            Are you sure you want to discard all changes? Any unsaved
            modifications will be lost.
          </p>}
          
        </Modal>
      </div>
    </Form>
  );
}
