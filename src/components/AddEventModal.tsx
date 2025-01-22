import React, { useState, useRef, useEffect } from "react";
import {
  ModalPage,
  Button,
  Div,
  Group,
  Popover,
  CellButton,
  LocaleProvider,
  Calendar,
  Separator,
} from "@vkontakte/vkui";
import {
  Icon16DropdownOutline,
  Icon28CheckCircleOn,
  Icon16Cancel,
  Icon12Add,
  Icon28Camera,
} from "@vkontakte/icons";
import "../styles/appPanel.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface AddEventModalProps {
  id: string;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ id, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("Видно всем");
  const [isVisibilityPopoverOpened, setIsVisibilityPopoverOpened] =
    useState<boolean>(false);
  const [publicationTime, setPublicationTime] = useState<Date | null>(null);
  const [isCalendarPopoverOpened, setIsCalendarPopoverOpened] =
    useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const locale = "ru";
  const size: "m" | "s" = "m";

  useEffect(() => {
    const urls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uploadedFiles]);

  useEffect(() => {
    autoResizeTextarea();
  }, [description]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleToggleVisibilityPopover = () => {
    setIsVisibilityPopoverOpened((prev) => !prev);
    if (isCalendarPopoverOpened) setIsCalendarPopoverOpened(false);
  };

  const handleSelectVisibility = (option: string) => {
    setVisibility(option);
    setIsVisibilityPopoverOpened(false);
  };

  const handleToggleCalendarPopover = () => {
    setIsCalendarPopoverOpened((prev) => !prev);
    if (isVisibilityPopoverOpened) setIsVisibilityPopoverOpened(false);
  };

  const handleSelectPublicationTime = (date: Date | undefined) => {
    if (date) {
      setPublicationTime(date);
      setIsCalendarPopoverOpened(false);
    }
  };

  const handleAddEvent = () => {
    if (description.trim() === "") {
      alert("Описание события не может быть пустым.");
      return;
    }

    console.log("Добавлено событие:", {
      description,
      visibility,
      publicationTime: publicationTime
        ? format(publicationTime, "d MMMM yyyy 'в' H:mm", { locale: ru })
        : "Сейчас",
      files: uploadedFiles,
    });
    onClose();
  };

  const isAddButtonDisabled = description.trim() === "";

  const removeFile = (index: number) => {
    URL.revokeObjectURL(filePreviews[index]);
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <ModalPage id={id} onClose={onClose} className="add-media">
      <Group>
        <Div style={{ padding: "0" }}>
          <div className="modal-title">Добавить воспоминание</div>
        </Div>

        <Div style={{ padding: "0", marginTop: "30px", minHeight: "260px" }}>
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Расскажите нам что-нибудь о своём родственнике"
            className="custom-textarea"
          />
          {uploadedFiles.length > 0 && (
            <Div style={{ padding: "0" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {filePreviews.map((url, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "160px",
                      height: "160px",
                    }}
                  >
                    {uploadedFiles[index].type.startsWith("image/") ? (
                      <img
                        src={url}
                        alt={uploadedFiles[index].name}
                        style={{
                          width: "160px",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <video
                        src={url}
                        style={{
                          width: "160px",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        controls
                      />
                    )}
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
              </div>
            </Div>
          )}
        </Div>
        <Separator
          style={{ width: "100%", marginLeft: "0px", marginRight: "0px" }}
        />
        <Div
          style={{
            padding: "0 16px",
            marginTop: "16px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Popover
            shown={isVisibilityPopoverOpened}
            onShownChange={setIsVisibilityPopoverOpened}
            placement="right"
            content={
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <CellButton
                  role="menuitem"
                  onClick={() => handleSelectVisibility("Видно всем")}
                  after={
                    visibility === "Видно всем" && (
                      <Icon28CheckCircleOn
                        fill="#5181B8"
                        width={24}
                        height={24}
                      />
                    )
                  }
                  style={{
                    color: "#000000",
                  }}
                >
                  Видно всем
                </CellButton>
                <CellButton
                  role="menuitem"
                  onClick={() => handleSelectVisibility("Только мне")}
                  after={
                    visibility === "Только мне" && (
                      <Icon28CheckCircleOn
                        fill="#5181B8"
                        width={24}
                        height={24}
                      />
                    )
                  }
                  style={{
                    color: "#000000",
                  }}
                >
                  Только мне
                </CellButton>
              </div>
            }
          >
            <a
              className="section-link"
              onClick={handleToggleVisibilityPopover}
              style={{
                color: "#626D7A",
              }}
            >
              {visibility} <Icon16DropdownOutline fill="#9EB4C8" />
            </a>
          </Popover>

          {/* Popover для выбора времени публикации */}
          <Popover
            shown={isCalendarPopoverOpened}
            onShownChange={setIsCalendarPopoverOpened}
            placement="right"
            content={
              <LocaleProvider value={locale}>
                <Calendar
                  value={publicationTime || new Date()}
                  onChange={handleSelectPublicationTime}
                  enableTime={true}
                  disablePast={false}
                  size={size}
                />
              </LocaleProvider>
            }
          >
            <div
              className="section-link"
              onClick={handleToggleCalendarPopover}
              style={{
                color: "#626D7A",
              }}
            >
              {publicationTime
                ? format(publicationTime, "d MMMM yyyy 'в' H:mm", {
                    locale: ru,
                  })
                : "Сейчас"}{" "}
              <Icon16DropdownOutline fill="#9EB4C8" />
            </div>
          </Popover>
        </Div>
      </Group>

      <Div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label
          htmlFor="file-upload"
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#99A2AD",
            fontWeight: "500",
            gap: "8px",
            border: "1px solid transparent",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Icon28Camera fill="#99A2AD" />
            <div
              style={{
                position: "absolute",
                top: "-3px",
                right: "-4px",
                width: "15px",
                height: "15px",
                backgroundColor: "#5181B8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Icon12Add fill="#fff" width={10} height={10} />
            </div>
          </div>
          Добавить фото или видео
        </label>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          size="l"
          mode="primary"
          onClick={handleAddEvent}
          disabled={isAddButtonDisabled}
          style={{
            padding: "0px 23px",
            textAlign: "center",
            backgroundColor: "#447BBA",
          }}
        >
          Добавить
        </Button>
      </Div>
    </ModalPage>
  );
};

export default AddEventModal;
