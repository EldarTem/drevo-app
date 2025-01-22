// src/App.tsx
import React, { useState, useEffect, useCallback } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  View,
  ScreenSpinner,
  ModalRoot,
} from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { Home, Persik, MyTreePanel, TimelinePanel } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import "./styles/RelativeProfileModal.css";
import NavigationBar from "./components/NavigationBar";
import RelativeProfileModal from "./components/RelativeProfileModal";
import AddEventModal from "./components/AddEventModal";
import ShareQRModal from "./components/ShareQRModal";
import ShareLinkModal from "./components/ShareLink";
import AddMotherModal from "./components/AddMother";
import AddFatherModal from "./components/AddFather";
import EditMotherModal from "./components/EditMother";
import EditFatherModal from "./components/EditFather";
import AddMediaModal from "./components/AddMediaModal";
import QRCodeImage from "../src/assets/img/QRcode.svg";
import FamilyTreeModal from "./components/FamilyTreeModal";

const relativesData = [
  {
    id: 1,
    name: "Иван Иванов",
    year: "1921",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 2,
    name: "Мария Иванова",
    year: "1955",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 3,
    name: "Анна Смирнова",
    year: "1980",
    avatarUrl: "https://cdn.balkan.app/shared/3.jpg",
  },
];

const App: React.FC = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  const [fetchedUser, setUser] = useState<Partial<UserInfo> | undefined>();
  const [popout, setPopout] = useState<React.ReactNode | null>(
    <ScreenSpinner size="large" />
  );
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Обернули функции в useCallback для оптимизации и предотвращения лишних перерендерингов
  const openShareQR = useCallback(() => setActiveModal("share-qr"), []);
  const openAddMedia = useCallback(() => setActiveModal("add-media"), []);
  const openEditFather = useCallback(() => setActiveModal("edit-father"), []);
  const openEditMother = useCallback(() => setActiveModal("edit-mother"), []);
  const openShareLink = useCallback(() => setActiveModal("share-link"), []);
  const openAddEvent = useCallback(() => setActiveModal("add-event"), []);
  const openAddMother = useCallback(() => setActiveModal("add-mother"), []);
  const openAddFather = useCallback(() => setActiveModal("add-father"), []);
  const openTreeModal = useCallback(
    () => setActiveModal("family-tree-modal"),
    []
  );

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <RelativeProfileModal
        id="relative-profile"
        onClose={closeModal}
        selectedRelative={
          selectedId
            ? {
                id: String(selectedId),
                name: relativesData.find((r) => r.id === selectedId)?.name,
                year: relativesData.find((r) => r.id === selectedId)?.year,
                avatarUrl: relativesData.find((r) => r.id === selectedId)
                  ?.avatarUrl,
                onClose: closeModal,
                openShareQR: openShareQR,
                openAddMedia: openAddMedia,
                openEditFather: openEditFather,
              }
            : null
        }
        openShareQR={openShareQR}
        openAddMedia={openAddMedia}
        openEditFather={openEditFather}
      />

      <AddEventModal id="add-event" onClose={closeModal} />

      <ShareQRModal
        id="share-qr"
        onClose={closeModal}
        qrCodeUrl={QRCodeImage}
      />

      <ShareLinkModal id="share-link" onClose={closeModal} />
      <AddMotherModal id="add-mother" onClose={closeModal} />
      <AddFatherModal id="add-father" onClose={closeModal} />
      <EditMotherModal id="edit-mother" onClose={closeModal} />
      <EditFatherModal id="edit-father" onClose={closeModal} />
      <AddMediaModal id="add-media" onClose={closeModal} />
      <FamilyTreeModal
        id="family-tree-modal"
        onClose={closeModal}
        onSelectRelation={(relation) => {
          console.log("Выбран тип родственника:", relation);
          switch (relation) {
            case "Отец":
              openAddFather();
              break;
            case "Мать":
              openAddMother();
              break;
            // Добавьте остальные случаи по необходимости
            default:
              break;
          }
        }}
      />
    </ModalRoot>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        if (bridge.isWebView()) {
          const user = await bridge.send("VKWebAppGetUserInfo", {});
          setUser(user);

          const storageData = await bridge.send("VKWebAppStorageGet", {
            keys: ["6287487:web_token:login:auth"],
          });

          const tokenData = storageData.keys.find(
            (item) => item.key === "6287487:web_token:login:auth"
          );

          if (tokenData && tokenData.value) {
            const parsedToken = JSON.parse(tokenData.value);
            setAccessToken(parsedToken.access_token);
          } else {
            console.warn("Токен не найден в локальном хранилище");
          }
        } else {
          console.log("Приложение запущено в браузере");
          setUser({
            id: 123456,
            first_name: "Браузер",
            last_name: "Пользователь",
            photo_200: "https://via.placeholder.com/200",
          });
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setUser({
          id: 123456,
          first_name: "Ошибка",
          last_name: "Пользователь",
          photo_200: "https://via.placeholder.com/200",
        });
      } finally {
        setPopout(null);
      }
    }

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout} modal={modal}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  id={DEFAULT_VIEW_PANELS.HOME}
                  fetchedUser={fetchedUser}
                  accessToken={accessToken}
                  openPopup={openAddEvent}
                  openQR={openShareQR}
                  openLink={openShareLink}
                  openAddMother={openAddMother}
                  openAddFather={openAddFather}
                  openEditMother={openEditMother}
                  openEditFather={openEditFather}
                  openAddMedia={openAddMedia}
                />
                <Persik id={DEFAULT_VIEW_PANELS.PERSIK} />
                <MyTreePanel
                  id="my_tree"
                  className="relative-profile"
                  onSelectRelative={(nodeId) => {
                    console.log("Выбран узел с ID:", nodeId);
                    setSelectedId(nodeId);
                    setActiveModal("relative-profile");
                  }}
                  openAddMother={openAddMother}
                  openAddFather={openAddFather}
                  openEditMother={openEditMother}
                  openEditFather={openEditFather}
                  openTreeModal={openTreeModal}
                />

                <TimelinePanel id={DEFAULT_VIEW_PANELS.TIMELINE} />
              </View>
              <NavigationBar openShareLinkModal={openShareLink} />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
