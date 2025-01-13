import React, { useState } from "react";
import { ModalPage, Group, Div, Avatar } from "@vkontakte/vkui";
import {
  Icon16Add,
  Icon16DropdownFlipped,
  Icon16ChevronOutline,
  Icon16MoreVertical,
  Icon16CalendarOutline,
  Icon28ViewOutline,
  Icon28QrCodeOutline,
  Icon16Cancel,
} from "@vkontakte/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/RelativeProfileModal.css";
import Image1 from "../assets/img/image1.png";
import Image2 from "../assets/img/image2.png";
import Image3 from "../assets/img/image3.png";
interface RelativeProfileModalProps {
  id: string;
  onClose: () => void;
  selectedRelative: {
    id: string;
    name?: string;
    year?: string;
    avatarUrl?: string;
    onClose: () => void;
    openShareQR: () => void;
    openAddMedia: () => void;
    openEditFather: () => void;
  } | null;
  openShareQR: () => void;
  openAddMedia: () => void;
  openEditFather: () => void;
}

const RelativeProfileModal: React.FC<RelativeProfileModalProps> = ({
  id,
  onClose,
  openShareQR,
  openAddMedia,
  openEditFather,
}) => {
  const [isRelativesVisible, setIsRelativesVisible] = useState(true);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const routeNavigator = useRouteNavigator();

  const toggleRelativesVisibility = () => {
    setIsRelativesVisible((prev) => !prev);
  };

  const handleToggleText = () => {
    setIsTextExpanded((prev) => !prev);
  };

  const relatives = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7f3c76a85323cfd27ac0b610f498c3dac5fd69fde5c8d5bf43de02eb597ea3ef",
      name: "Григорий Иванов",
      relation: "Его отец",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2db112472063a6d5707febfc3f627b69eaef59b7424143fb8b625341116a1884",
      name: "Юлия Иванова",
      relation: "Его мать",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/28474551813dd43a6f708885e0157d4cfbeb919a37e185d1730cfe2c5c2baa91",
      name: "Анжелика Иванова",
      relation: "Его жена",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9b42c2fad078bfd267f101823d3e53a550d0ad604388a119cefd22a7bf800822",
      name: "Себастьян Иванов",
      relation: "Его сын",
    },
  ];

  const photos = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c9a3deef9f13306db63b9ce0c197b94a9f975c7bf854fcdc90c140d4ef7e4413",
      alt: "Family photo 1",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/245c147ee6184e0b096ce8dcb6a792a03b09fdb9c31a9bb05603a8c6cf541915",
      alt: "Family photo 2",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4fa956739ca77beecbdc7f2d8c5bea43abff9510d38bb93eec1f1f6a4b099508",
      alt: "Family photo 3",
    },
  ];

  const lifeEvents = [
    {
      date: "22.06.1941",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ce94d9cbacf5482930af95518062e216a20738f67b4398258fc7ea2d1946af91",
      description:
        "Стал известным после того, как многочисленные фотографии с его участием стали интернет-мемом...",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f0dd387173beb17344cfb63ee1d80c008960c5a1043ff15e445a862630aacd86",
      videoUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/dd9b5b9823d3b94c49fec925e386af8889941c398f95ce1c24c433e26f562f78",
      images: [Image1, Image2, Image3],
    },
  ];

  return (
    <ModalPage
      id={id}
      onClose={onClose}
      settlingHeight={80}
      className="relative-profile"
    >
      <Group>
        <Div className="header-icons">
          <Icon28ViewOutline onClick={() => routeNavigator.push("/timeline")} />
          <Icon28QrCodeOutline onClick={openShareQR} />
        </Div>

        {/* Информация о профиле */}
        <Div className="profile-info">
          <Avatar
            size={72}
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c203ea62718e48a2f1409873489f045f8cff85e00095bac254ba36cb7fb16298"
          />
          <div>
            <h2 className="profile-name">Гарольд Иванов</h2>
            <span className="profile-status">Ваш прадед</span>
          </div>
        </Div>

        <Div className="profile-details">
          <p className="profile-details-date">
            Дата и место рождения: <br />
            <span>30 дек. 1910 - Москва</span>
          </p>
          <p className="profile-details-date">
            Дата смерти и место захоронения: <br />
            <span>15 сен. 1995 - Москва</span>
          </p>
        </Div>

        <Div className="buttons">
          <button className="edit-button" onClick={openEditFather}>
            Редактировать
          </button>
          <button
            className="delete-button"
            onClick={() => console.log("Удалить")}
          >
            Удалить
          </button>
        </Div>

        {/* Фото и видео */}
        <Div className="section">
          <div className="section-group">
            <h2 className="section-title">Фото и видео</h2>
            <div className="add-btn" onClick={openAddMedia}>
              <Icon16Add fill="#5181B8" />
            </div>
          </div>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <img key={index} src={photo.imageUrl} alt={photo.alt} />
            ))}
          </div>
        </Div>

        {/* Родственники */}
        <Div className="section">
          <div className="section-group">
            <h2 className="section-title">Близкие родственники</h2>
            <div className="dropdown-btn" onClick={toggleRelativesVisibility}>
              <Icon16DropdownFlipped
                fill="#5181B8"
                style={{
                  transform: isRelativesVisible
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          </div>
          <div
            className={`relative-cards-container ${
              isRelativesVisible ? "open" : "closed"
            }`}
          >
            {relatives.map((relative, index) => (
              <div className="relative-card" key={index}>
                <Avatar size={48} src={relative.imageUrl} noBorder />
                <div>
                  <h4 className="relative-card-name">{relative.name}</h4>
                  <span className="relative-card-status">
                    {relative.relation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Div>

        {/* Биография */}
        <Div className="section">
          <div className="section-group">
            <h2 className="section-title">Биография</h2>
            <div className="add-btn">
              <Icon16Add fill="#5181B8" />
            </div>
          </div>
          <p className={`section-text ${isTextExpanded ? "expanded" : ""}`}>
            Стал известным после того, как многочисленные фотографии с его
            участием стали интернет-мемом. Стал известным после того, как
            многочисленные фотографии с его участием стали интернет-мемом. Стал
            известным после того, как многочисленные фотографии с его участием
            стали интернет-мемом. Стал известным после того, как многочисленные
            фотографии с его участием стали интернет-мемом.
          </p>
          <a className="section-link" onClick={handleToggleText}>
            {isTextExpanded ? "Скрыть" : "Читать полностью"}{" "}
            <Icon16ChevronOutline fill="#9EB4C8" />
          </a>
        </Div>

        {/* События из жизни */}
        <Div className="section">
          <div className="section-group">
            <h2 className="section-title">События из жизни</h2>
          </div>
          <button className="life-event-add">Добавить событие</button>
          {lifeEvents.map((event, index) => (
            <div className="life-event" key={index}>
              <div className="life-exent-header">
                <span>
                  <Icon16CalendarOutline width={16} height={16} />
                  {event.date}
                </span>
                <Icon16MoreVertical width={12} height={24} fill="#99A2AD" />
              </div>

              <div>
                <p>{event.description}</p>
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: ".custom-next-button",
                    prevEl: ".custom-prev-button",
                  }}
                  spaceBetween={11}
                  slidesPerView="auto"
                  loop
                  style={{
                    marginTop: "16px",
                    padding: "10px 0",
                    width: "110%",
                  }}
                >
                  {event.images.map((image, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <img
                        src={image}
                        alt={`Slide ${imgIndex + 1}`}
                        style={{
                          width: "140px",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      <div
                        className="life-event-close"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "rgba(0, 0, 0, 0.5)",
                          width: "18px",
                          height: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          console.log(`Удалить фото ${imgIndex + 1}`)
                        }
                      >
                        <Icon16Cancel fill="#fff" width={10} height={10} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="slider-buttons">
                  <span className="custom-prev-button" />
                  <span className="custom-next-button" />
                </div>
              </div>
            </div>
          ))}
        </Div>
      </Group>
    </ModalPage>
  );
};

export default RelativeProfileModal;
