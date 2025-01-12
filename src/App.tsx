import React, { useState, useEffect } from "react";
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
// Добавляем массив relativesData
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

  // Добавляем состояние selectedId
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <RelativeProfileModal
        id="relative-profile"
        onClose={closeModal}
        selectedRelative={
          selectedId ? relativesData.find((r) => r.id === selectedId) : null
        }
      />
      <AddEventModal id="add-event" onClose={closeModal} />
      <ShareQRModal
        id="share-qr"
        onClose={closeModal}
        qrCodeUrl="../src/assets/img/QRcode.svg"
      />
      <ShareLinkModal id="share-link" onClose={closeModal} />
      <AddMotherModal id="add-mother" onClose={closeModal} />
      <AddFatherModal id="add-father" onClose={closeModal} />
      <EditMotherModal id="edit-mother" onClose={closeModal} />
      <EditFatherModal id="edit-father" onClose={closeModal} />
    </ModalRoot>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        if (import.meta.env.DEV) {
          setUser({
            id: 123456,
            first_name: "Тест",
            last_name: "Пользователь",
          });
        } else {
          const user = await bridge.send("VKWebAppGetUserInfo", {});
          setUser(user);
        }
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
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
                  openPopup={() => setActiveModal("add-event")}
                  openQR={() => setActiveModal("share-qr")}
                  openLink={() => setActiveModal("share-link")}
                  openAddMother={() => setActiveModal("add-mother")}
                  openAddFather={() => setActiveModal("add-father")}
                  openEditMother={() => setActiveModal("edit-mother")}
                  openEditFather={() => setActiveModal("edit-father")}
                />
                <Persik id={DEFAULT_VIEW_PANELS.PERSIK} />
                <MyTreePanel
                  id={DEFAULT_VIEW_PANELS.MY_TREE}
                  className="relative-profile"
                  onSelectRelative={(nodeId) => {
                    console.log("Выбран узел с ID:", nodeId);
                    setSelectedId(nodeId); // Используем setSelectedId
                    setActiveModal("relative-profile");
                  }}
                  onEditNode={(nodeId) =>
                    console.log("Редактировать узел:", nodeId)
                  }
                  onAddNode={(nodeId) => console.log("Добавить узел:", nodeId)}
                />
                <TimelinePanel id={DEFAULT_VIEW_PANELS.TIMELINE} />
              </View>
              <NavigationBar
                openShareLinkModal={() => setActiveModal("share-link")}
              />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
