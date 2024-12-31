import { FC } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps } from "@vkontakte/vkui";

export interface HomeProps extends NavIdProps {
  fetchedUser?: Partial<UserInfo>;
  openPopup?: () => void;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser, openPopup }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group
          header={
            <Header mode="secondary">User Data Fetched with VK Bridge</Header>
          }
        >
          <Cell
            before={photo_200 && <Avatar src={photo_200} />}
            subtitle={city?.title}
          >
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("/persik")}
          >
            Покажите Персика, пожалуйста!
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openPopup}
            style={{ marginTop: 10 }}
          >
            Добавление родственника
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
