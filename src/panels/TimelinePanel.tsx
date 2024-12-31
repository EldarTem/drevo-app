import { FC } from "react";
import { Panel, Div } from "@vkontakte/vkui";
import {
  Icon24User,
  Icon24LocationMapOutline,
  Icon24CalendarOutline,
} from "@vkontakte/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/TimelinePanel.css";
interface TimelinePanelProps {
  id: string;
}

const TimelinePanel: FC<TimelinePanelProps> = ({ id }) => {
  const navigationItems = [
    "Информация",
    "Даты",
    "Биография",
    "Галерея",
    "Воспоминания",
  ];

  const timelineEvents = [
    {
      date: "22.06.1945",
      title: "Родился в селе Новоивановка",
      description:
        "Андраш Арато родился в 1945 году в венгерском городе Кёсег. В 1969 году Арато закончил электротехнический факультет Будапештского университета технологии и экономики.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2e55a792f6f5d6259c37f843c5ee424aabaa9f785a7a92104f37ec0a677f2031",
    },
    {
      date: "22.06.2002",
      title: "Женился, устроился работать на завод",
      description:
        "В 2002 году Андраш Арато выиграл премию Яноша Урбанека. Венгерская электротехническая ассоциация ежегодно присуждает эту премию за выдающуюся деятельность в области технологий освещения.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a6b2da64eb220fba6e1f02509dc742717808944869511e10addefce0333d96b4",
    },
    {
      date: "22.06.2019",
      title: "Переехал в Москву",
      description:
        "В 2019 году стал рекламным лицом Coca-Cola в Венгрии. Также снялся в рекламе российского пива «Zatecky Gus».",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/37e771870667926d493439932a58a4d6ff7795a02414d69113d5c662b94389b5",
    },
  ];
  interface Memory {
    author: string;
    date: string;
    content: string;
  }

  const memoriesData: Memory[] = [
    {
      author: "Пётр Алексеевич",
      date: "22.06.2019",
      content:
        "Я — представитель десятков, сотен, а может и тысяч людей, которые свой телевизионный путь начали с лёгкого весёлого пинка Гарольда Иванова. Он обладал удивительной способностью убедить человека в том, что он способен даже на то, что он не способен!",
    },
    {
      author: "Пётр Алексеевич",
      date: "22.06.2019",
      content:
        "Я — представитель десятков, сотен, а может и тысяч людей, которые свой телевизионный путь начали с лёгкого весёлого пинка Гарольда Иванова. Он обладал удивительной способностью убедить человека в том, что он способен даже на то, что он не способен!",
    },
    {
      author: "Пётр Алексеевич",
      date: "22.06.2019",
      content:
        "Я — представитель десятков, сотен, а может и тысяч людей, которые свой телевизионный путь начали с лёгкого весёлого пинка Гарольда Иванова. Он обладал удивительной способностью убедить человека в том, что он способен даже на то, что он не способен!",
    },
    {
      author: "Пётр Алексеевич",
      date: "22.06.2019",
      content:
        "Я — представитель десятков, сотен, а может и тысяч людей, которые свой телевизионный путь начали с лёгкого весёлого пинка Гарольда Иванова. Он обладал удивительной способностью убедить человека в том, что он способен даже на то, что он не способен!",
    },
  ];

  return (
    <Panel id={id}>
      <Div>
        <Div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {navigationItems.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "9px 12px",
                  background: "rgba(0, 114, 245, 0.1)",
                  borderRadius: "24px",
                  color: "#5991D2",
                  fontSize: "14px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#68AFFF",
              borderRadius: "80px",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
            tabIndex={0}
          >
            <Icon24User fill="#FFFFFF" />
            <span>Зарегистрироваться</span>
          </button>
        </Div>

        {/* Главный блок */}
        <Div
          style={{
            padding: "130px",
            background: "rgba(0, 114, 245, 0.07)",
            borderRadius: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ flex: "1 1 50%", textAlign: "left" }}>
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "300",
                  lineHeight: "1.2",
                  marginBottom: "16px",
                }}
              >
                Гарольд Иванов
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "16px", color: "#666" }}>
                  Дата и место рождения
                </div>
                <div style={{ fontSize: "36px", fontWeight: "300" }}>
                  22.06.1944
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <Icon24LocationMapOutline fill="#0072F5" />
                <div style={{ fontSize: "16px" }}>
                  Россия, город Тартара, село Новоивановка
                </div>
              </div>
              <button
                style={{
                  padding: "23px 35px",
                  background: "#68AFFF",
                  color: "#FFFFFF",
                  borderRadius: "80px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Воспоминания о Гарольде
              </button>
            </div>
            <div style={{ flex: "1 1 50%", textAlign: "center" }}>
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <img
                  src="src\assets\img\garold.png"
                  alt="Гарольд Иванов"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </Div>

        {/* События из жизни */}
        <div style={{ padding: "0px 102px" }}>
          <h2
            style={{
              fontSize: "52px",
              textAlign: "center",

              fontWeight: "300",
            }}
          >
            События из жизни
          </h2>
          {timelineEvents.map((event, index) => (
            <div key={index}>
              <div style={{ textAlign: "center" }}>
                {index === 0 ? (
                  <>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "2px solid #C1DEFF",
                        textAlign: "center",
                        lineHeight: "32px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#68AFFF",
                        margin: "0 auto",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      style={{
                        height: "50px",
                        width: "2px",
                        background: "#D0E4FF",
                        margin: "0 auto",
                      }}
                    ></div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        height: "50px",
                        width: "2px",
                        background: "#D0E4FF",
                        margin: "0 auto",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "2px solid #C1DEFF",
                        textAlign: "center",
                        lineHeight: "32px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#68AFFF",
                        margin: "0 auto",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      style={{
                        height: "50px",
                        width: "2px",
                        background: "#D0E4FF",
                        margin: "0 auto",
                      }}
                    ></div>
                  </>
                )}
              </div>
              <div
                style={{
                  padding: "47px",
                  background: "rgba(0, 114, 245, 0.07)",
                  border: "2px solid #C1DEFF",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    flex: "1 1 50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "400px",
                      height: "400px",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src="src\assets\img\garold.png"
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#FFFFFF",
                        borderRadius: "16px",
                        padding: "4px 8px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <button
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E0E6ED",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        ←
                      </button>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0072F5",
                          fontWeight: "500",
                        }}
                      >
                        1/3
                      </span>
                      <button
                        style={{
                          background: "#0072F5",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          cursor: "pointer",
                        }}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "100px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#68AFFF",
                      fontWeight: "500",
                      marginBottom: "36px",
                      fontSize: "14px",
                    }}
                  >
                    <Icon24CalendarOutline style={{ marginRight: "8px" }} />
                    <span>{event.date}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "300",
                      marginBottom: "32px",
                    }}
                  >
                    {event.title}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#26272D",
                      lineHeight: "1.5",

                      paddingRight: "82px",
                    }}
                  >
                    {event.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Div
          style={{
            padding: "0px 102px",
            borderRadius: "24px",
            marginTop: "24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#68AFFF",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Дата смерти и место захоронения:
            </h3>
            <div
              style={{
                fontSize: "52px",
                fontWeight: "300",
                color: "#26272D",
                marginBottom: "16px",
              }}
            >
              22.06.2024
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "16px",
                color: "#26272D",
              }}
            >
              <Icon24LocationMapOutline fill="#0072F5" />
              <span>
                Россия, респ. Татарстан, село Нижневерхневка, Старонововское
                кладбище
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#FFFFFF",
              border: "1px solid #E0E6ED",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <form
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <input
                type="text"
                placeholder="Адрес или объект"
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #E0E6ED",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 24px",
                  background: "#68AFFF",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Найти
              </button>
            </form>
            <div
              style={{
                width: "100%",
                height: "300px",
                background: "#F9FAFB",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#68AFFF",
                  fontSize: "32px",
                }}
              >
                📍
              </div>
            </div>
          </div>
        </Div>
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <h3
            style={{
              fontSize: "18px",
              color: "#68AFFF",
              fontWeight: "500",
              marginBottom: "16px",
            }}
          >
            Биография
          </h3>
          <p
            style={{
              fontSize: "42px",
              fontWeight: "300",
              lineHeight: "1.5",
              color: "#26272D",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            Гарольд Иванов мог стать железнодорожником, как его отец, а стал не
            много ни мало «мэтром телевидения». Работая в молодёжной редакции
            центрального телевидения, Гарольд Иванов стоял у истоков таких
            передач как КВН, «А ну-ка, парни!», «А ну-ка, девушки!», «От всей
            души», «Аукцион», «Что? Где? Когда?», «Поле чудес» и многих других.
          </p>
          <div
            style={{
              marginTop: "24px",
              height: "2px",
              width: "120px",
              background: "#68AFFF",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
        </div>
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <h3
            style={{
              fontSize: "52px",
              fontWeight: "300",
              marginBottom: "24px",
              color: "#26272D",
            }}
          >
            Фотогалерея
          </h3>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={20}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            style={{ padding: "0 16px" }}
          >
            <SwiperSlide>
              <img
                src="src/assets/img/image2.png"
                alt="Фото 1"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="swiper-slide-center"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="src/assets/img/image2.png"
                alt="Фото 2"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="swiper-slide-center"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="src/assets/img/image3.png"
                alt="Фото 3"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="swiper-slide-center"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="src/assets/img/image3.png"
                alt="Фото 3"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="swiper-slide-center"
              />
            </SwiperSlide>
          </Swiper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <button
              className="custom-prev"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2px solid #68AFFF",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(104, 175, 255, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <img src="src\assets\img\left.svg" alt="left" />
            </button>
            <button
              className="custom-next"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2px solid #68AFFF",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(104, 175, 255, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <img src="src\assets\img\right.svg" alt="right" />
            </button>
          </div>
        </div>
        <Div style={{ textAlign: "center", marginTop: "45px" }}>
          <h3 style={{ fontSize: "42px", fontWeight: "300" }}>Воспоминания</h3>
        </Div>
        <Div>
          \
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
              marginRight: "100px",
              marginLeft: "100px",
            }}
          >
            <div
              style={{
                width: "48px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                className="custom-prev-1"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "2px solid #68AFFF",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(104, 175, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <img src="src\assets\img\left.svg" alt="left" />
              </button>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".custom-prev-1",
                nextEl: ".custom-next-1",
              }}
              spaceBetween={18}
              slidesPerView={2}
              loop={true}
              style={{ padding: "0 17px" }}
            >
              {memoriesData.map((memory, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      background: "rgba(0, 114, 245, 0.07)",
                      borderRadius: "16px",
                      padding: "32px",
                      textAlign: "left",
                      maxWidth: "520px",
                    }}
                  >
                    <img
                      src="src\assets\img\quotes.svg"
                      alt="Quote"
                      style={{
                        width: "24px",
                        marginBottom: "16px",
                      }}
                    />
                    <h4 style={{ fontSize: "18px", marginBottom: "8px" }}>
                      {memory.author}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#99A2AD",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Icon24CalendarOutline style={{ marginRight: "8px" }} />
                      {memory.date}
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                      {memory.content}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              style={{
                width: "48px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                className="custom-next-1"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "2px solid #68AFFF",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(104, 175, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <img src="src\assets\img\right.svg" alt="right" />
              </button>
            </div>
          </div>
        </Div>
        <Div
          style={{
            background: "rgba(0, 114, 245, 0.07)",
            borderRadius: "24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            marginTop: "45px",
            padding: "130px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundImage: "url('srcassetsimg\bg-footer.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              opacity: 0.15,
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "16px",
                color: "#0072F5",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Создать фамильное древо
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "600",
                color: "#26272D",
                lineHeight: "1.4",
                marginBottom: "32px",
              }}
            >
              Хотите сохранить воспоминания о близких — создайте своё фамильное
              древо
            </h2>
            <button
              style={{
                padding: "24px 40px",
                background: "#68AFFF",
                borderRadius: "80px",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Зарегистрироваться
            </button>
          </div>
        </Div>
        <footer
          style={{
            marginTop: "40px",
            fontSize: "14px",
            color: "#A3A3A3",
            lineHeight: "1.5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>© 2024 «Drevo»</div>
          <a
            href="/privacy"
            style={{
              color: "#0072F5",
              textDecoration: "none",
              fontWeight: "500",
              marginLeft: "40px",
              display: "block",
            }}
          >
            Политика конфиденциальности
          </a>
        </footer>
      </Div>
    </Panel>
  );
};

export default TimelinePanel;
