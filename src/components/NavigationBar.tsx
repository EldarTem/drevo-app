import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
  Icon24User,
  Icon24ShareExternal,
  Icon24Globe,
  Icon24TreeNodes,
  Icon24Clock,
} from "@vkontakte/icons";
import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";

const NavigationBar: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation();

  return (
    <Tabbar>
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
      <TabbarItem text="Поделиться">
        <Icon24ShareExternal />
      </TabbarItem>
      <TabbarItem
        onClick={() => routeNavigator.push("/persik")}
        selected={activePanel === "persik"}
        text="Персик"
      >
        <Icon24Globe />
      </TabbarItem>
      <TabbarItem
        onClick={() => routeNavigator.push("/timeline")}
        selected={activePanel === "timeline"}
        text="Хронология"
      >
        <Icon24Clock />
      </TabbarItem>
    </Tabbar>
  );
};

export default NavigationBar;
