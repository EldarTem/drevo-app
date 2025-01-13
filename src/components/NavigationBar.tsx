import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
  Icon24User,
  Icon24ShareExternal,
  Icon24Globe,
  Icon24TreeNodes,
} from "@vkontakte/icons";
import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";

interface NavigationBarProps {
  openShareLinkModal: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  openShareLinkModal,
}) => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation();

  return (
    <Tabbar>
      <div className="tabbar-div">
        <TabbarItem
          onClick={() => routeNavigator.push("/")}
          selected={activePanel === "home"}
          text="Главная"
        >
          <Icon24User />
        </TabbarItem>
        <TabbarItem
          onClick={() => routeNavigator.push("/my_tree")}
          selected={activePanel === "my_tree"}
          text="Древо"
        >
          <Icon24TreeNodes />
        </TabbarItem>
        <TabbarItem text="Поделиться" onClick={openShareLinkModal}>
          <Icon24ShareExternal />
        </TabbarItem>
        <TabbarItem selected={activePanel === "persik"} text="Русский">
          <Icon24Globe />
        </TabbarItem>
      </div>
    </Tabbar>
  );
};

export default NavigationBar;
