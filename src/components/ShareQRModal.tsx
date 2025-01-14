import React from "react";
import { ModalCard, Button, FormItem, Input, Separator } from "@vkontakte/vkui";
import "../styles/modal.css";
interface ShareQRModalProps {
  id: string;
  onClose: () => void;
  qrCodeUrl: string;
}

const ShareQRModal: React.FC<ShareQRModalProps> = ({
  id,
  onClose,
  qrCodeUrl,
}) => {
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      header="Поделиться QR-кодом"
      className="modal-popup"
    >
      <FormItem>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
            marginTop: 28,
          }}
        >
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: 110, height: 110 }}
          />
        </div>
      </FormItem>
      <FormItem className="modal-input-two">
        <Input
          className="modal-input-two-input"
          value="https://www.myheritage.com/research"
        />
        <Button className="button-modal" size="m">
          Скопировать
        </Button>
      </FormItem>
      <Separator />
      <FormItem className="form-item-qr"      >
        <Button size="l" mode="secondary" className="button-modal-two">
          Заказать изготовление
        </Button>
        <Button size="l" mode="secondary" className="button-modal-three">
          Скачать QR код
        </Button>
      </FormItem>
    </ModalCard>
  );
};

export default ShareQRModal;
