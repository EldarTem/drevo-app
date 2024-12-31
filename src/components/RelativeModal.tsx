import { FC } from "react";
import { ModalCard, Button } from "@vkontakte/vkui";
import { Icon28CameraOutline } from "@vkontakte/icons";
import { RelativeData } from "../types";

interface RelativeModalProps {
  id: string;
  onClose: () => void;
  selectedRelative: RelativeData | null;
}

const RelativeModal: FC<RelativeModalProps> = ({
  id,
  onClose,
  selectedRelative,
}) => {
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      header={
        selectedRelative ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            {selectedRelative.photoUrl ? (
              <img
                src={selectedRelative.photoUrl}
                alt={selectedRelative.name}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              />
            ) : (
              <Icon28CameraOutline
                width={50}
                height={50}
                style={{ marginRight: 8 }}
              />
            )}
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {selectedRelative.name}
              </div>
              <div style={{ fontSize: 12, color: "#818c99" }}>Ваш предок</div>
            </div>
          </div>
        ) : null
      }
      actions={
        selectedRelative ? (
          <>
            <Button mode="primary" size="l" style={{ marginRight: 8 }}>
              Редактировать
            </Button>
            <Button mode="secondary" size="l">
              Удалить
            </Button>
          </>
        ) : null
      }
    >
      {selectedRelative ? (
        <div style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 12 }}>
            <b>Дата и место рождения:</b> {selectedRelative.birth} – Москва
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Дата смерти и место захоронения:</b> 15 сен. 1995 – Москва
            <br />
            <a href="#map">На карте</a>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Фото и видео:</b>
            <div style={{ display: "flex", marginTop: 8 }}>
              <img
                src="https://i.pravatar.cc/100?img=63"
                alt="photo1"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  marginRight: 8,
                  borderRadius: 4,
                }}
              />
              <img
                src="https://i.pravatar.cc/100?img=64"
                alt="photo2"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  marginRight: 8,
                  borderRadius: 4,
                }}
              />
              <Button size="m" mode="tertiary">
                Смотреть все
              </Button>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Близкие родственники:</b>
            <div>Иван Иванов (сын)</div>
            <div>Татьяна Иванова (дочь)</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Биография</b>
            <p style={{ marginTop: 4 }}>
              Здесь можно разместить развернутый текст, описывающий жизнь и
              деятельность данного предка.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Нет данных для отображения</p>
        </div>
      )}
    </ModalCard>
  );
};

export default RelativeModal;
