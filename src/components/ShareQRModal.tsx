import React, { useState } from "react";
import {
  ModalCard,
  Button,
  FormItem,
  Input,
  Separator,
  Snackbar,
} from "@vkontakte/vkui";

import { Icon28CheckCircleOutline } from "@vkontakte/icons"; // Импортируем нужные иконки
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
  const [snackbar, setSnackbar] = useState<React.ReactElement | null>(null);
  const handleCopy = () => {
    const link = "https://www.myheritage.com/research";
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Открываем Snackbar после успешного копирования
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={
              <Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />
            }
          >
            Ссылка скопирована
          </Snackbar>
        );
      })
      .catch((err) => {
        console.error("Ошибка копирования: ", err);
        // Можно добавить Snackbar для ошибки, если необходимо
      });
  };
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
        <Button className="button-modal" size="m" onClick={handleCopy}>
          Скопировать
        </Button>
      </FormItem>
      <Separator />
      <FormItem className="form-item-qr">
        <Button size="l" mode="secondary" className="button-modal-two">
          Заказать изготовление
        </Button>
        <Button size="l" mode="secondary" className="button-modal-three">
          Скачать QR код
        </Button>
      </FormItem>
      {snackbar}
    </ModalCard>
  );
};

export default ShareQRModal;
