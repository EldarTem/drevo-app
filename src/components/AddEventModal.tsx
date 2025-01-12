import React from "react";
import { ModalCard, Button, Input, FormItem, File } from "@vkontakte/vkui";

interface AddEventModalProps {
  id: string;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ id, onClose }) => {
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      header="Добавить событие"
      subheader="Расскажите нам что-нибудь о своём родственнике?"
      actions={[
        <Button key="submit" size="l" mode="primary" onClick={onClose}>
          Добавить
        </Button>,
      ]}
    >
      <FormItem>
        <Input placeholder="Расскажите о событии..." type="text" />
      </FormItem>
      <FormItem top="Видно всем">
        <Input placeholder="Сейчас" disabled />
      </FormItem>
      <FormItem top="Добавить фото или видео">
        <File mode="secondary" />
      </FormItem>
    </ModalCard>
  );
};

export default AddEventModal;
