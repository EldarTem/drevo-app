import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import "../styles/treeStyles.css";

const editIconPath = "/src/assets/img/edit.svg";
const addIconPath = "/src/assets/img/add.svg";

interface MyNodeData {
  id: number;
  pids?: number[];
  fid?: number;
  mid?: number;
  name?: string;
  surname?: string;
  year?: string;
  avatarUrl?: string;
}

const testData: MyNodeData[] = [
  {
    id: 1,
    pids: [7, 9],
    name: "Иван",
    surname: "Иванов",
    year: "1921",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 9,
    pids: [1],
    name: "Султание",
    surname: "Иванова",
    year: "1925",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 7,
    pids: [1],
    name: "Эльмаз",
    surname: "Иванова",
    year: "1925",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 3,
    mid: 7,
    fid: 1,
    name: "Иван",
    surname: "Иванов",
    year: "1950",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
  {
    id: 2,
    mid: 7,
    fid: 1,
    name: "Мария",
    surname: "Иванова",
    year: "1955",
    avatarUrl: "https://cdn.balkan.app/shared/2.jpg",
  },
];

export function MyTreePanel({
  onSelectRelative,
  onEditNode,
  onAddNode,
}: {
  onSelectRelative: (nodeId: number) => void;
  onEditNode: (nodeId: number) => void;
  onAddNode: (nodeId: number) => void;
}) {
  const treeRef = useRef<HTMLDivElement>(null);
  const familyInstance = useRef<FamilyTree | null>(null);

  const destroyTree = () => {
    if (familyInstance.current) {
      console.log("Уничтожение FamilyTree...");
      try {
        familyInstance.current.destroy();
      } catch (error) {
        console.error("Ошибка при уничтожении FamilyTree:", error);
      }
      familyInstance.current = null;
    }
  };

  useEffect(() => {
    if (!treeRef.current) return;

    destroyTree();

    FamilyTree.templates.myTemplate = Object.assign(
      {},
      FamilyTree.templates.base
    );

    FamilyTree.templates.myTemplate.size = [220, 140];
    FamilyTree.templates.myTemplate.node = `
      <path class="node-shape" d="
          M 0,0 
          H 220 
          A 16,16 0 0 1 236,16  
          V 112 
          A 16,16 0 0 1 220,128 
          H 130 
          v 0 
          l -20,20
          l -20,-20
          v 0
          H 0
          A 16,16 0 0 1 -16,112
          V 16
          A 16,16 0 0 1 0,0
          z
      "></path>
      <g class="node-actions">
        <image x="205" y="10" width="20" height="20" href="${editIconPath}" cursor="pointer" data-action="edit" />
        <image x="103" y="120" width="15" height="15" href="${addIconPath}" cursor="pointer" data-action="add" />
      </g>
    `;
    FamilyTree.templates.myTemplate.field_0 = `
      <text class="user-name" x="120" y="55" text-anchor="start">
        {val}
      </text>
    `;
    FamilyTree.templates.myTemplate.field_1 = `
      <text class="user-year" x="120" y="75" text-anchor="start">
        {val}
      </text>
    `;
    FamilyTree.templates.myTemplate.img_0 = `
      <clipPath id="avatarClip">
        <circle cx="45" cy="60" r="40"></circle>
      </clipPath>
      <image xlink:href="{val}" x="-5" y="0" width="100" height="100" clip-path="url(#avatarClip)" />
    `;

    const family = new FamilyTree(treeRef.current, {
      template: "myTemplate",
      nodes: testData,
      nodeBinding: {
        field_0: "name",
        field_1: "year",
        img_0: "avatarUrl",
      },
      mode: "light",
      toolbar: { layout: false, fit: false, zoom: false },
      minPartnerSeparation: 100,
      levelSeparation: 100,
      siblingSeparation: 100,
    });

    familyInstance.current = family;

    family.on("click", (sender, args) => {
      const node = args?.node;
      const action = args?.event?.target?.getAttribute("data-action");

      if (node) {
        if (action === "edit") {
          console.log("Редактирование узла:", node.id);
          onEditNode(node.id);
        } else if (action === "add") {
          console.log("Добавление узла:", node.id);
          onAddNode(node.id);
        } else {
          console.log("Выбран узел:", node);
          onSelectRelative(node.id);
        }
      } else {
        console.warn("Узел не найден!");
      }
      return false;
    });

    return () => {
      destroyTree();
    };
  }, [onSelectRelative, onEditNode, onAddNode]);

  return <div ref={treeRef} style={{ width: "100%", height: "100%" }} />;
}
