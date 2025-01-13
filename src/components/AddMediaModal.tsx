import React, { useState, useEffect, useRef } from "react";
import { ModalPage, Button, Div, Avatar, Group } from "@vkontakte/vkui";
import { Icon48PictureOutline, Icon16Cancel } from "@vkontakte/icons";
import "../styles/appPanel.css";

interface AddMediaModalProps {
  id: string;
  onClose: () => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({ id, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const urls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ModalPage id={id} onClose={onClose} className="add-media">
      <Group>
        <Div style={{ padding: "0" }}>
          <div className="modal-subtitle">Гароль Иванов - Ваш прадед</div>
          <div className="modal-title">Добавить медиа</div>
        </Div>
        <Div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent:
              uploadedFiles.length === 0 ? "center" : " flex-start",
            alignItems: uploadedFiles.length === 0 ? "center" : "flex-start",
            alignContent: uploadedFiles.length === 0 ? "none" : "flex-start",
            minHeight: "320px",
            border:
              uploadedFiles.length === 0
                ? "2px dashed rgb(211, 211, 211)"
                : "none",
            borderRadius: "10px",
            position: "relative",
            padding: "0",
            marginTop: "22px",
          }}
        >
          {uploadedFiles.length === 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon48PictureOutline width={44} height={44} fill="#99A2AD" />
                <div
                  style={{
                    marginTop: "15px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Перетащите фото и видео сюда
                </div>
              </div>
            </>
          ) : (
            <>
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "160px",
                    height: "160px",
                  }}
                >
                  <Avatar
                    size={160}
                    src={url}
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div
                    className="life-event-close"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "rgba(0, 0, 0, 0.5)",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => removeFile(index)}
                  >
                    <Icon16Cancel fill="#fff" width={14} height={14} />
                  </div>
                </div>
              ))}
              {/* Кнопка "Добавить ещё" */}
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed rgb(211, 211, 211)",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={handleButtonClick}
              >
                <Icon48PictureOutline fill="#99A2AD" width={44} height={44} />
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Добавить ещё
                </div>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Div>
      </Group>
      <Div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          padding: "0",
        }}
      >
        {uploadedFiles.length === 0 ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
                width: "100%",
              }}
            >
              <div
                style={{ marginTop: "10px", fontSize: "14px", color: "#999" }}
              >
                или
              </div>
              <Button
                size="l"
                onClick={handleButtonClick}
                className="button-add-media"
              >
                Выберите файлы
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              size="l"
              mode="primary"
              onClick={onClose}
              className="button-modal-two"
            >
              Завершить
            </Button>
            <Button
              size="l"
              mode="secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => setUploadedFiles([])}
              className="button-modal-three"
            >
              Отменить загрузку
            </Button>
          </>
        )}
      </Div>
    </ModalPage>
  );
};

export default AddMediaModal;
