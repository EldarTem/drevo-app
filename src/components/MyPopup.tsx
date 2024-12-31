import React from "react";
import { Alert } from "@vkontakte/vkui";

interface MyPopupProps {
  onClose: () => void;
}

const MyPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  return (
    <Alert
      actions={[
        {
          title: "Закрыть",
          mode: "cancel",
          action: onClose,
        },
        {
          title: "Подтвердить",
          mode: "destructive",
          action: () => {
            onClose();
          },
        },
      ]}
      onClose={onClose}
      header="Заголовок попапа"
      text="Текст попапа. Здесь можно разместить информацию или запросить подтверждение."
    />
  );
};

export default MyPopup;
