// MyTreePanel.tsx

import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import "../styles/treeStyles.css";
import editIcon from "../assets/img/edit.svg";
import addIcon from "../assets/img/add.svg";
import addIconWomen from "../assets/img/addw.svg";

const editIconPath = editIcon;
const addIconPath = addIcon;
const addIconPathWomen = addIconWomen;

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

interface MyTreePanelProps {
  id: string;
  className: string;
  onSelectRelative: (nodeId: number) => void;
  openAddMother: () => void;
  openAddFather: () => void;
  openEditMother: () => void;
  openEditFather: () => void;
  openTreeModal: () => void;
  treeData: MyNodeData[];
  setTreeData: React.Dispatch<React.SetStateAction<MyNodeData[]>>;
}

interface MyFamilyTreeInstance {
  on(event: string, cb: (sender: unknown, args: unknown) => void): void;
  destroy(): void;
  [key: string]: unknown;
}

type TemplateObj = {
  [key: string]: unknown;
};

export function MyTreePanel({
  onSelectRelative,
  openEditFather,
  openTreeModal,
  treeData,
}: MyTreePanelProps) {
  const treeRef = useRef<HTMLDivElement>(null);
  const familyInstance = useRef<MyFamilyTreeInstance | null>(null);

  const destroyTree = () => {
    if (familyInstance.current) {
      try {
        familyInstance.current.destroy();
      } catch (error) {
        console.error(error);
      }
      familyInstance.current = null;
    }
  };

  useEffect(() => {
    if (!treeRef.current) return;
    destroyTree();

    const ftTemplates = FamilyTree.templates as Record<string, TemplateObj>;
    const maleBase = ftTemplates.myTemplate as TemplateObj;
    ftTemplates.myTemplate_male = { ...maleBase };
    ftTemplates.myTemplate_male.node = `
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
    ftTemplates.myTemplate_male.field_0 = `
    <text class="user-name" x="110" y="55" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_male.field_1 = `
    <text class="user-name" x="110" y="75" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_male.field_2 = `
    <text class="user-year" x="110" y="95" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_male.img_0 = `
      <clipPath id="avatarClip">
        <circle cx="45" cy="60" r="40"></circle>
      </clipPath>
      <image xlink:href="{val}" x="-5" y="0" width="100" height="100" clip-path="url(#avatarClip)" />
    `;

    const femaleBase = ftTemplates.myTemplate as TemplateObj;
    ftTemplates.myTemplate_female = { ...femaleBase };
    ftTemplates.myTemplate_female.node = `
      <path class="node-shape-women" d="
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
        <image x="103" y="120" width="15" height="15" href="${addIconPathWomen}" cursor="pointer" data-action="add" />
      </g>
    `;
    ftTemplates.myTemplate_female.field_0 = `
    <text class="user-name" x="110" y="55" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_female.field_1 = `
    <text class="user-name" x="110" y="75" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_female.field_2 = `
    <text class="user-year" x="110" y="95" text-anchor="start">{val}</text>
  `;
    ftTemplates.myTemplate_female.img_0 = `
      <clipPath id="avatarClip">
        <circle cx="45" cy="60" r="40"></circle>
      </clipPath>
      <image xlink:href="{val}" x="-5" y="0" width="100" height="100" clip-path="url(#avatarClip)" />
    `;

    ftTemplates.myTemplate = { ...(ftTemplates.base || {}) };
    ftTemplates.myTemplate.size = [220, 140];
    ftTemplates.myTemplate.node = `<path class="node-shape" d="..."></path>`;

    const family = new FamilyTree(treeRef.current, {
      template: "myTemplate",
      nodes: treeData,
      nodeBinding: {
        field_0: "name",
        field_1: "surname",
        field_2: "year",
        img_0: "avatarUrl",
      },
      mode: "light",
      toolbar: { layout: false, fit: false, zoom: false },
      enableSearch: false,
      minPartnerSeparation: 100,
      levelSeparation: 100,
      siblingSeparation: 100,
    }) as MyFamilyTreeInstance;

    familyInstance.current = family;

    family.on("click", (_sender, rawArgs) => {
      const args = rawArgs as {
        node?: { id: number };
        event?: { target?: { getAttribute?: (name: string) => string | null } };
      };
      const node = args.node;
      const action = args.event?.target?.getAttribute?.("data-action") || null;
      if (node) {
        const clickedNode = treeData.find((d) => d.id === node.id);
        if (clickedNode) {
          localStorage.setItem("clickedNode", JSON.stringify(clickedNode));
        }
        if (action === "edit") {
          openEditFather();
        } else if (action === "add") {
          openTreeModal();
        } else {
          onSelectRelative(node.id);
        }
      }
      return false;
    });

    return () => {
      destroyTree();
    };
  }, [onSelectRelative, openTreeModal, openEditFather, treeData]);

  return <div ref={treeRef} style={{ width: "100%", height: "100%" }} />;
}
