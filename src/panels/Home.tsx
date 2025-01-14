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

  openAddMother?: () => void;
}

export interface HomeProps extends NavIdProps {
  fetchedUser?: Partial<UserInfo>;
  accessToken?: string | null;
  openPopup?: () => void;
  openQR?: () => void;
  openLink?: () => void;
  openAddMother?: () => void;
  openAddFather?: () => void;
  openEditMother?: () => void;
  openEditFather?: () => void;
  openAddMedia?: () => void;
}

export const Home: FC<HomeProps> = ({
  id,
  fetchedUser,
  accessToken,
  openPopup,
  openQR,
  openLink,
  openAddMother,
  openAddFather,
  openEditMother,
  openEditFather,
  openAddMedia,
}) => {
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
      {accessToken && (
        <Group header={<Header mode="secondary">Access Token</Header>}>
          <Div>{accessToken}</Div>
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
            Добавить событие
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openAddMedia}
            style={{ marginTop: 10 }}
          >
            Добавить медиа
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openQR}
            style={{ marginTop: 10 }}
          >
            Поделиться QR-кодом
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openLink}
            style={{ marginTop: 10 }}
          >
            Пригласить
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openAddMother}
            style={{ marginTop: 10 }}
          >
            Добавить мать
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openAddFather}
            style={{ marginTop: 10 }}
          >
            Добавить отца
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openEditMother}
            style={{ marginTop: 10 }}
          >
            Редактировать мать
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={openEditFather}
            style={{ marginTop: 10 }}
          >
            Редактировать отца
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
