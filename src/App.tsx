import React, { useState, useEffect, useMemo } from "react";
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
import NavigationBar from "./components/NavigationBar";
import RelativeProfileModal from "./components/RelativeProfileModal";
import { RelativeData } from "./types";

const relativesData: RelativeData[] = [
  {
    id: 1,
    name: "Гарольд Иванов",
    birth: "1910",
    photoUrl: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Неизвестная",
    birth: "1915",
    photoUrl: "https://i.pravatar.cc/100?img=12",
  },
  { id: 3, name: "Иван Иванов", birth: "1921", father: 1, mother: 2 },
  { id: 4, name: "Татьяна Иванова", birth: "1923", father: 1, mother: 2 },
  {
    id: 5,
    name: "Михаил Иванов",
    birth: "1948",
    father: 3,
    photoUrl: "https://i.pravatar.cc/100?img=13",
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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectRelative = (nodeId: number) => {
    console.log("Выбран родственник с ID:", nodeId);
    setSelectedId(nodeId);
    setActiveModal("relative-profile");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const selectedRelative = useMemo(() => {
    return relativesData.find((relative) => relative.id === selectedId) || null;
  }, [selectedId]);

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <RelativeProfileModal
        id="relative-profile"
        onClose={closeModal}
        selectedRelative={selectedRelative}
      />
    </ModalRoot>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        if (import.meta.env.DEV) {
          const user: Partial<UserInfo> = {
            id: 123456,
            first_name: "Тест",
            last_name: "Пользователь",
          };
          setUser(user);
        } else {
          const user = (await bridge.send(
            "VKWebAppGetUserInfo",
            {}
          )) as Partial<UserInfo>;
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
                <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
                <Persik id={DEFAULT_VIEW_PANELS.PERSIK} />
                <MyTreePanel
                  id={DEFAULT_VIEW_PANELS.MY_TREE}
                  onSelectRelative={handleSelectRelative}
                />
                <TimelinePanel id={DEFAULT_VIEW_PANELS.TIMELINE} />
              </View>
              <NavigationBar />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
