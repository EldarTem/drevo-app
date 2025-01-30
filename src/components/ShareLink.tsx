// ShareLinkModal.tsx

import React, { useState } from "react";
import {
  ModalCard,
  Button,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Snackbar,
} from "@vkontakte/vkui";
import { Icon28CheckCircleOutline } from "@vkontakte/icons"; // Импортируем нужные иконки
import "../styles/modal.css";
import VKicon from "../assets/img/VK.svg";
import FBicon from "../assets/img/FB.svg";

interface ShareLinkModalProps {
  id: string;
  onClose: () => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ id, onClose }) => {
  // Состояние для выбранного доступа
  const [selectedAccess, setSelectedAccess] = useState<string>("admin"); // Начальное значение

  // Состояние для Snackbar
  const [snackbar, setSnackbar] = useState<React.ReactElement | null>(null);

  // Обработчик изменения выбора радио-кнопок
  const handleRadioChange = (value: string) => {
    setSelectedAccess(value);
  };

  // Обработчик копирования ссылки
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

  // Обработчик клика по иконкам соцсетей
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <ModalCard
      id={id}
      onClose={onClose}
      header="Пригласить"
      className="modal-popup-s"
    >
      {/* Радиокнопки для выбора доступа */}
      <RadioGroup className="radiodiv-modal">
        <Radio
          value="admin"
          checked={selectedAccess === "admin"}
          onChange={() => handleRadioChange("admin")} // Обработчик для "С правами администратора"
        >
          С правами администратора
        </Radio>
        <Radio
          value="view"
          checked={selectedAccess === "view"}
          onChange={() => handleRadioChange("view")} // Обработчик для "Только просмотр"
        >
          Только просмотр
        </Radio>
      </RadioGroup>

      {/* Поле для ссылки и кнопка "Скопировать" */}
      <FormItem className="modal-input-two">
        <Input
          className="modal-input-two-input"
          value="https://www.myheritage.com/research"
          readOnly // Сделаем поле только для чтения
        />
        <Button className="button-modal" size="m" onClick={handleCopy}>
          Скопировать
        </Button>
      </FormItem>

      {/* Иконки для поделиться в соцсетях */}
      <FormItem
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "8px",
          padding: "0",
        }}
      >
        <img
          src={VKicon}
          alt="Share on VK"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={() => handleLinkClick("https://vk.com")}
        />
        <img
          src={FBicon}
          alt="Share on Facebook"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={() => handleLinkClick("https://facebook.com")}
        />
      </FormItem>

      {/* Рендеринг Snackbar, если он активен */}
      {snackbar}
    </ModalCard>
  );
};

export default ShareLinkModal;
