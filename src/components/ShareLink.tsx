import React from "react";
import {
  ModalCard,
  Button,
  FormItem,
  Input,
  RadioGroup,
  Radio,
} from "@vkontakte/vkui";
import "../styles/modal.css";

interface ShareLinkModalProps {
  id: string;
  onClose: () => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ id, onClose }) => {
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
      <RadioGroup className="radiodiv-modal">
        <Radio value="alive">С правами администратора</Radio>
        <Radio value="deceased">Только просмотр</Radio>
      </RadioGroup>
      <FormItem className="modal-input-two">
        <Input
          className="modal-input-two-input"
          value="https://www.myheritage.com/research"
        />
        <Button className="button-modal" size="m">
          Скопировать
        </Button>
      </FormItem>
      <FormItem
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "8px",
          padding: "0",
        }}
      >
        <img
          src="/src/assets/img/VK.svg"
          alt="Share on VK"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={() => handleLinkClick("https://vk.com")}
        />
        <img
          src="/src/assets/img/FB.svg"
          alt="Share on Facebook"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={() => handleLinkClick("https://facebook.com")}
        />
      </FormItem>
    </ModalCard>
  );
};

export default ShareLinkModal;
