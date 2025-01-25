// AddMotherModal.tsx

import React, { useState, useEffect } from "react";
import {
  ModalPage,
  Input,
  Radio,
  RadioGroup,
  Group,
  Div,
  Button,
  Avatar,
  Select,
  Textarea,
} from "@vkontakte/vkui";
import { Icon24Add, Icon48Camera } from "@vkontakte/icons";
import "../styles/appPanel.css";

interface AddMotherModalProps {
  id: string;
  onClose: () => void;
  onSaveMother: (motherData: {
    name: string;
    surname: string;
    year: string;
    gender: string;
    avatarUrl: string;
  }) => void;
}

export const AddMotherModal: React.FC<AddMotherModalProps> = ({
  id,
  onClose,
  onSaveMother,
}) => {
  const [isAlive, setIsAlive] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);

  const [firstName, setFirstName] = useState<string>("Александра");
  const [patronymic, setPatronymic] = useState<string>("Петровна");
  const [maidenName, setMaidenName] = useState<string>("Журавлёва");
  const [dayOfBirth, setDayOfBirth] = useState<string>("");
  const [monthOfBirth, setMonthOfBirth] = useState<string>("");
  const [yearOfBirth, setYearOfBirth] = useState<string>("");
  const [marriedName, setMarriedName] = useState<string>("Кузьменко");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("Архангельск");

  const [dayOfDeath, setDayOfDeath] = useState<string>("");
  const [monthOfDeath, setMonthOfDeath] = useState<string>("");
  const [yearOfDeath, setYearOfDeath] = useState<string>("");
  const [placeOfBurial, setPlaceOfBurial] = useState<string>("");

  const [biography, setBiography] = useState<string>("");

  // Для динамического заголовка
  const [targetNodeName, setTargetNodeName] = useState<string>("");

  useEffect(() => {
    const storedStr = localStorage.getItem("clickedNode");
    if (storedStr) {
      const parsed = JSON.parse(storedStr);
      const namePart = parsed.name || "";
      const surnamePart = parsed.surname || "";
      setTargetNodeName(`${namePart} ${surnamePart}`.trim());
    }
  }, []);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoURL(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPhotoURL(undefined);
    }
  }, [photo]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 10 * 1024 * 1024;

      if (!validTypes.includes(selectedFile.type)) {
        alert("Недопустимый формат файла. Пожалуйста, выберите JPG или PNG.");
        return;
      }

      if (selectedFile.size > maxSize) {
        alert("Размер файла превышает 10МБ.");
        return;
      }

      setPhoto(selectedFile);
    }
  };

  const handleBiographyChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBiography(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Собираем только основные данные для демонстрации создания узла
    const motherName = `${firstName}${patronymic ? " " + patronymic : ""}`;
    const motherYear = yearOfBirth || "1900";

    onSaveMother({
      name: motherName,
      surname: marriedName || "Фамилия",
      year: motherYear,
      gender: "female",
      avatarUrl: photoURL || "https://cdn.balkan.app/shared/2.jpg",
    });

    onClose();
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlive(e.target.value === "alive");
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { label: "Январь", value: "01" },
    { label: "Февраль", value: "02" },
    { label: "Март", value: "03" },
    { label: "Апрель", value: "04" },
    { label: "Май", value: "05" },
    { label: "Июнь", value: "06" },
    { label: "Июль", value: "07" },
    { label: "Август", value: "08" },
    { label: "Сентябрь", value: "09" },
    { label: "Октябрь", value: "10" },
    { label: "Ноябрь", value: "11" },
    { label: "Декабрь", value: "12" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <ModalPage id={id} className="add-mother-modal">
      <form onSubmit={handleSubmit}>
        <Group>
          <Div>
            <div className="modal-title">
              Добавить мать для {targetNodeName || "Неизвестно"}
            </div>
          </Div>
          <Div className="photo-group">
            <Avatar size={113} src={photoURL}>
              {!photo && (
                <Icon48Camera className="camera-icon" width={48} height={48} />
              )}
            </Avatar>

            <Div className="upload-input-wrapper">
              <Div className="input-label">Загрузить фото</Div>
              <Div
                className="upload-input"
                role="button"
                tabIndex={0}
                onClick={() => {
                  const fileInput = document.getElementById(
                    "photo-upload-input-mother"
                  ) as HTMLInputElement | null;
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const fileInput = document.getElementById(
                      "photo-upload-input-mother"
                    ) as HTMLInputElement | null;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }
                }}
              >
                <Div className="upload-status">
                  {photo ? photo.name : "Фото не выбрано"}
                </Div>
                {photo ? (
                  <Icon24Add className="add-icon" />
                ) : (
                  <Icon48Camera
                    className="camera-icon"
                    width={24}
                    height={24}
                  />
                )}
              </Div>
              <input
                id="photo-upload-input-mother"
                type="file"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />
              <Div className="input-label">
                Поддерживаемые форматы JPG, PNG до 10МБ
              </Div>
            </Div>
          </Div>
        </Group>

        <Group>
          <Div className="two-columns">
            <Div className="column">
              <Div className="input-label">Имя</Div>
              <Input
                placeholder="Введите имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Div className="input-label">Отчество</Div>
              <Input
                placeholder="Введите отчество"
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
              />
              <Div className="input-label">Дата рождения</Div>
              <Div className="date-wrapper">
                <Div className="date-select">
                  <Select
                    placeholder="День"
                    value={dayOfBirth}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setDayOfBirth(event.target.value)
                    }
                    options={[
                      { label: "День", value: "" },
                      ...days.map((day) => ({
                        label: day.toString(),
                        value: day.toString().padStart(2, "0"),
                      })),
                    ]}
                  />
                </Div>
                <Div className="date-select">
                  <Select
                    placeholder="Месяц"
                    value={monthOfBirth}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setMonthOfBirth(event.target.value)
                    }
                    options={[
                      { label: "Месяц", value: "" },
                      ...months.map((month) => ({
                        label: month.label,
                        value: month.value,
                      })),
                    ]}
                  />
                </Div>
                <Div className="date-select">
                  <Select
                    placeholder="Год"
                    value={yearOfBirth}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setYearOfBirth(event.target.value)
                    }
                    options={[
                      { label: "Год", value: "" },
                      ...years.map((year) => ({
                        label: year,
                        value: year,
                      })),
                    ]}
                  />
                </Div>
              </Div>
            </Div>
            <Div className="column">
              <Div className="input-label">Девичья фамилия</Div>
              <Input
                placeholder="Введите девичью фамилию"
                value={maidenName}
                onChange={(e) => setMaidenName(e.target.value)}
              />
              <Div className="input-label">Фамилия после замужества</Div>
              <Input
                placeholder="Введите фамилию после замужества"
                value={marriedName}
                onChange={(e) => setMarriedName(e.target.value)}
              />
              <Div className="input-label">Место рождения</Div>
              <Input
                placeholder="Введите место рождения"
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
              />
            </Div>
          </Div>
        </Group>

        <Div>
          <RadioGroup onChange={handleRadioChange} className="radiodiv">
            <Radio value="alive" checked={isAlive}>
              Жива
            </Radio>
            <Radio value="deceased" checked={!isAlive}>
              Умерла
            </Radio>
          </RadioGroup>
        </Div>

        {!isAlive && (
          <Group>
            <Div className="two-columns">
              <Div className="column">
                <Div className="input-label">Дата смерти</Div>
                <Div className="date-wrapper">
                  <Div className="date-select">
                    <Select
                      placeholder="День"
                      value={dayOfDeath}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setDayOfDeath(event.target.value)
                      }
                      options={[
                        { label: "День", value: "" },
                        ...days.map((day) => ({
                          label: day.toString(),
                          value: day.toString().padStart(2, "0"),
                        })),
                      ]}
                    />
                  </Div>
                  <Div className="date-select">
                    <Select
                      placeholder="Месяц"
                      value={monthOfDeath}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setMonthOfDeath(event.target.value)
                      }
                      options={[
                        { label: "Месяц", value: "" },
                        ...months.map((month) => ({
                          label: month.label,
                          value: month.value,
                        })),
                      ]}
                    />
                  </Div>
                  <Div className="date-select">
                    <Select
                      placeholder="Год"
                      value={yearOfDeath}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setYearOfDeath(event.target.value)
                      }
                      options={[
                        { label: "Год", value: "" },
                        ...years.map((year) => ({
                          label: year,
                          value: year,
                        })),
                      ]}
                    />
                  </Div>
                </Div>
              </Div>

              <Div className="column">
                <Div className="input-label">Место захоронения</Div>
                <Input
                  placeholder="Введите место захоронения"
                  value={placeOfBurial}
                  onChange={(e) => setPlaceOfBurial(e.target.value)}
                />
              </Div>
            </Div>
          </Group>
        )}

        <Group>
          <Div>
            <Div className="input-label">Биография</Div>
            <Textarea
              placeholder="Напишите биографию"
              value={biography}
              onChange={handleBiographyChange}
            />

            <Button
              type="submit"
              stretched
              mode="primary"
              className="submit-popup"
            >
              Добавить
            </Button>
          </Div>
        </Group>
      </form>
    </ModalPage>
  );
};

export default AddMotherModal;
