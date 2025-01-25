import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { ModalPage } from "@vkontakte/vkui";
import manavatar from "../assets/img/man.svg";
import womanavatar from "../assets/img/woman.svg";
import ivanIvanIcon from "../assets/img/man.svg";

interface FamilyTreeModalProps {
  id: string;
  onClose: () => void;
  onSelectRelation: (relation: string) => void;
}

interface RelationNode {
  id: number;
  fid?: number;
  mid?: number;
  pids?: number[];
  name?: string;
  surname?: string;
  year?: string;
  year2?: string;
  gender?: string;
  avatarUrl?: string;
  template?: string;
}

interface FamilyTreeEventArgs {
  node?: RelationNode;
}

interface FamilyTreeInstance {
  destroy: () => void;
  on: (
    event: string,
    callback: (sender: unknown, args: unknown) => void
  ) => void;
}
interface FamilyTreeTemplate {
  size?: [number, number];
  node?: string;
  link?: unknown;
  field_0?: string;
  field_1?: string;
  img_0?: string;
  [key: string]: unknown;
}

interface FamilyTreeTemplates {
  base?: FamilyTreeTemplate;
  [key: string]: FamilyTreeTemplate | undefined;
}

const relations: RelationNode[] = [
  { id: 1, pids: [2], name: "Добавить папу", gender: "", avatarUrl: manavatar },
  {
    id: 2,
    pids: [1],
    name: "Добавить маму",
    gender: "",
    avatarUrl: womanavatar,
  },
  {
    id: 7,
    pids: [8],
    name: "Добавить брата",
    gender: "",
    avatarUrl: manavatar,
  },
  {
    id: 4,
    pids: [8],
    name: "Добавить сестру",
    gender: "",
    avatarUrl: womanavatar,
  },
  { id: 5, fid: 8, name: "Добавить сына", gender: "", avatarUrl: manavatar },
  { id: 6, fid: 8, name: "Добавить дочь", gender: "", avatarUrl: womanavatar },
  {
    id: 3,
    pids: [8],
    name: "Добавить партнера",
    year: "Жена, бывшая жена,",
    year2: "гражданская жена..",
    gender: "female",
  },
  {
    id: 8,
    fid: 1,
    mid: 2,
    pids: [4, 3, 7],
    name: "Иван",
    surname: "Иванов",
    gender: "male",
    year: "1925",
    avatarUrl: ivanIvanIcon,
  },
];

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({
  id,
  onClose,
  onSelectRelation,
}) => {
  const treeRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<FamilyTreeInstance | null>(null);

  const destroyTree = () => {
    if (familyRef.current) {
      try {
        familyRef.current.destroy();
      } catch (err) {
        console.error("Ошибка при уничтожении FamilyTree:", err);
      }
      familyRef.current = null;
    }
  };

  useEffect(() => {
    if (!treeRef.current) return;
    destroyTree();

    const ft = FamilyTree.templates as FamilyTreeTemplates;

    ft.customTemplate = { ...(ft.base ?? {}) };
    ft.customTemplate.size = [200, 96];
    ft.customTemplate.node = `
      <path class="node-shape-modal" d="
        M 0,0
        H 200
        A 16,16 0 0 1 216,16
        V 60
        A 16,16 0 0 1 200,76
        H 0
        A 16,16 0 0 1 -16,60
        V 16
        A 16,16 0 0 1 0,0
        z
      " fill="#e0f7fa" stroke="#00796b" stroke-width="2"></path>
    `;
    ft.customTemplate.field_0 = `
      <text class="user-name" x="125" y="43" text-anchor="middle" fill="#333" font-size="12px">{val}</text>
    `;
    ft.customTemplate.img_0 = `
      <clipPath id="{clipId}">
        <circle cx="27.5" cy="27.5" r="45"></circle>
      </clipPath>
      <image xlink:href="{val}" x="5" y="15" width="45" height="45" clip-path="url(#{clipId})" />
    `;
    ft.customTemplate.link = ft.base?.link;

    ft.customTemplate_male = { ...ft.customTemplate };
    ft.customTemplate_male.node = `
      <path class="node-shape-modal" d="
        M 0,0
        H 200
        A 16,16 0 0 1 216,16
        V 80
        A 16,16 0 0 1 200,96
        H 0
        A 16,16 0 0 1 -16,80
        V 16
        A 16,16 0 0 1 0,0
        z
      " fill="#fff3e0" stroke="#ff6f00" stroke-width="2"></path>
    `;
    ft.customTemplate_male.field_0 = `
      <text class="user-name" x="125" y="43" text-anchor="middle" fill="#333" font-size="12px">{val}</text>
    `;
    ft.customTemplate_male.field_1 = `
      <text class="user-year" x="100" y="70" text-anchor="start">{val}</text>
    `;
    ft.customTemplate_male.img_0 = `
      <clipPath id="{clipId}">
        <circle cx="32.5" cy="48" r="32.5"></circle>
      </clipPath>
      <image
        xlink:href="{val}"
        x="0"
        y="16.5"
        width="55"
        height="55"
        clip-path="url(#{clipId})"
      />
    `;
    ft.customTemplate_male.link = ft.customTemplate.link;

    ft.customTemplate_female = { ...ft.customTemplate };
    ft.customTemplate_female.node = `
      <path class="node-shape-add-partner" d="
        M 0,0
        H 200
        A 16,16 0 0 1 216,16
        V 80
        A 16,16 0 0 1 200,96
        H 0
        A 16,16 0 0 1 -16,80
        V 16
        A 16,16 0 0 1 0,0
        z
      " fill="#fff3e0" stroke="#ff6f00" stroke-width="2"></path>
    `;
    ft.customTemplate_female.field_0 = `
      <text class="user-add-name" x="83" y="30" text-anchor="middle" fill="#333" font-size="12px">{val}</text>
    `;
    ft.customTemplate_female.field_1 = `
      <text class="user-add-year" x="5" y="55" text-anchor="start">{val}</text>
    `;
    ft.customTemplate_female.field_2 = `
      <text class="user-add-year" x="5" y="75" text-anchor="start">{val}</text>
    `;
    ft.customTemplate_female.link = ft.customTemplate.link;
    const relationData = relations.map((rel) => ({
      ...rel,
      fid: rel.fid ?? undefined,
      mid: rel.mid ?? undefined,
      pids: rel.pids ?? [],
      name: rel.name ? `${rel.name} ${rel.surname || ""}` : "",
    }));

    const family = new FamilyTree(treeRef.current, {
      template: "customTemplate",
      nodes: relationData,
      nodeBinding: {
        field_0: "name",
        field_1: "year",
        field_2: "year2",
        img_0: "avatarUrl",
      },
      mode: "light",
      toolbar: { layout: false, fit: false, zoom: false },
      enableSearch: false,
      minPartnerSeparation: 100,
      partnerNodeSeparation: 50,
      siblingSeparation: 50,
      levelSeparation: 50,
    });

    familyRef.current = family;

    family.on("click", (_sender, rawArgs) => {
      if (typeof rawArgs !== "object" || rawArgs === null) return;
      const node = (rawArgs as FamilyTreeEventArgs)?.node;
      if (!node) return;
      const found = relations.find((r) => r.id === node.id);
      if (found && found.name) {
        onSelectRelation(found.name);
        onClose();
      }
    });

    return () => {
      destroyTree();
    };
  }, [onClose, onSelectRelation]);

  return (
    <ModalPage id={id} onClose={onClose} className="family-modal">
      <div ref={treeRef} style={{ width: "100%", height: "100vh" }} />
    </ModalPage>
  );
};

export default FamilyTreeModal;
