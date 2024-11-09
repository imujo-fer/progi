import { Form, Button, Modal, FormInstance } from "antd";
import useModal from "../hooks/useModal";

type FormLayoutProps<T extends object> = {
  title?: string;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  isPending?: boolean;
  onDiscard: () => void;
  isDirty?: boolean;
  submitLabel?: string;
  hideCancel?: boolean;
  form?: FormInstance;
};

export function FormLayout<T extends object>({
  onSubmit,
  title,
  children,
  isPending,
  onDiscard,
  isDirty: dirty,
  submitLabel,
  hideCancel,
  form,
}: FormLayoutProps<T>) {
  const discardModal = useModal();

  const onCancel = () => {
    if (dirty) {
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
            Cancel
          </Button>
        )}
        <Button type="primary" htmlType="submit" loading={isPending}>
          {submitLabel || "Save"}
        </Button>
        <Modal
          title={"Discard changes?"}
          open={discardModal.isModalOpen}
          onOk={onDiscard}
          onCancel={discardModal.closeModal}
          okText={"Keep editing"}
          okType="danger"
          cancelText={"Discard changes"}
          okButtonProps={{ type: "primary" }}
        >
          <p>
            Are you sure you want to discard all changes? Any unsaved
            modifications will be lost.
          </p>
        </Modal>
      </div>
    </Form>
  );
}
