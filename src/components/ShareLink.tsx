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
import VKicon from "../assets/img/VK.svg";
import FBicon from "../assets/img/FB.svg";

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
    </ModalCard>
  );
};

export default ShareLinkModal;
