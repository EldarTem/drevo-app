// App.tsx

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

interface MyNodeData {
  id: number;
  pids?: number[];
  fid?: number;
  mid?: number;
  name?: string;
  surname?: string;
  year?: string;
  gender?: string;
  avatarUrl?: string;
  [key: string]: unknown;
}

const initialTestData: MyNodeData[] = [
  {
    id: 1,
    pids: [7, 9],
    name: "Иван",
    surname: "Иванов",
    year: "1921",
    gender: "male",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 9,
    pids: [1],
    name: "Султание",
    surname: "Иванова",
    year: "1925",
    gender: "female",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 11,
    pids: [1],
    name: "Эльмаз",
    surname: "Иванова",
    year: "1925",
    gender: "female",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 10,
    pids: [1],
    name: "Эльмаз",
    surname: "Иванова",
    year: "1925",
    gender: "female",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 7,
    pids: [1],
    name: "Эльмаз",
    surname: "Иванова",
    year: "1925",
    gender: "female",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 3,
    mid: 7,
    fid: 1,
    name: "Иван",
    surname: "Иванов",
    year: "1950",
    gender: "male",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 2,
    mid: 7,
    fid: 1,
    name: "Мария",
    surname: "Иванова",
    year: "1955",
    gender: "female",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
];

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

  const [treeData, setTreeData] = useState<MyNodeData[]>(initialTestData);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

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

  // Вызывается при сохранении данных в модалке AddMother
  const handleSaveMother = useCallback(
    (motherData: {
      name: string;
      surname: string;
      year: string;
      gender: string;
      avatarUrl: string;
    }) => {
      const storedStr = localStorage.getItem("clickedNode");
      if (storedStr) {
        const storedNode = JSON.parse(storedStr);
        const newId = Date.now();
        const newMotherNode: MyNodeData = {
          id: newId,
          name: motherData.name,
          surname: motherData.surname,
          year: motherData.year,
          gender: motherData.gender,
          avatarUrl: motherData.avatarUrl,
        };
        setTreeData((prev) =>
          prev
            .map((node) =>
              node.id === storedNode.id ? { ...node, mid: newId } : node
            )
            .concat(newMotherNode)
        );
      }
    },
    [setTreeData]
  );

  // Вызывается при сохранении данных в модалке AddFather
  const handleSaveFather = useCallback(
    (fatherData: {
      name: string;
      surname: string;
      year: string;
      gender: string;
      avatarUrl: string;
    }) => {
      const storedStr = localStorage.getItem("clickedNode");
      if (storedStr) {
        const storedNode = JSON.parse(storedStr);
        const newId = Date.now();
        const newFatherNode: MyNodeData = {
          id: newId,
          name: fatherData.name,
          surname: fatherData.surname,
          year: fatherData.year,
          gender: fatherData.gender,
          avatarUrl: fatherData.avatarUrl,
        };
        setTreeData((prev) =>
          prev
            .map((node) =>
              node.id === storedNode.id ? { ...node, fid: newId } : node
            )
            .concat(newFatherNode)
        );
      }
    },
    [setTreeData]
  );

  const handleSelectRelation = useCallback((relation: string) => {
    // Раньше сразу добавляли, теперь только открываем нужную модалку (или если нужно — добавляем)
    switch (relation) {
      case "Добавить папу":
        setActiveModal("add-father");
        break;
      case "Добавить маму":
        setActiveModal("add-mother");
        break;
      case "Добавить брата":
        setActiveModal("add-father");
        break;
      case "Добавить сестру":
        setActiveModal("add-mother");
        break;
      case "Добавить сына":
        setActiveModal("add-father");
        break;
      case "Добавить дочь":
        setActiveModal("add-mother");
        break;
      case "Добавить партнера":
        setActiveModal("add-mother");
        break;
      default:
        break;
    }
  }, []);

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
      <AddMotherModal
        id="add-mother"
        onClose={closeModal}
        onSaveMother={handleSaveMother}
      />
      <AddFatherModal
        id="add-father"
        onClose={closeModal}
        onSaveFather={handleSaveFather}
      />
      <EditMotherModal id="edit-mother" onClose={closeModal} />
      <EditFatherModal id="edit-father" onClose={closeModal} />
      <AddMediaModal id="add-media" onClose={closeModal} />
      <FamilyTreeModal
        id="family-tree-modal"
        onClose={closeModal}
        onSelectRelation={handleSelectRelation}
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
                    setSelectedId(nodeId);
                    setActiveModal("relative-profile");
                  }}
                  openAddMother={openAddMother}
                  openAddFather={openAddFather}
                  openEditMother={openEditMother}
                  openEditFather={openEditFather}
                  openTreeModal={openTreeModal}
                  treeData={treeData}
                  setTreeData={setTreeData}
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
