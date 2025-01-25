// src/components/FamilyTreeModal.tsx
import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import manavatar from "../assets/img/man.svg";
import womanavatar from "../assets/img/woman.svg";
import addPartnerIcon from "../assets/img/woman.svg";
import ivanIvanIcon from "../assets/img/woman.svg"; 

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
  gender?: string;
  avatarUrl?: string;
  template?: string; 
}

const relations: RelationNode[] = [
  {
    id: 1,
    pids: [2], 
    name: "Добавить папу",
    year: "1921",
    gender: "male",
    avatarUrl: manavatar,
    template: "customTemplate",
  },
  {
    id: 2,
    pids: [1], 
    name: "Добавить маму",
    year: "1921",
    gender: "female",
    avatarUrl: womanavatar,
    template: "customTemplate",
  },
  {
    id: 7,
    pids: [8],
    name: "Добавить брата",
    year: "1990",
    gender: "male",
    avatarUrl: manavatar,
    template: "customTemplate",
  },
  {
    id: 4,
    pids: [8],
    name: "Добавить сестру",
    year: "2000",
    gender: "female",
    avatarUrl: womanavatar,
    template: "customTemplate",
  },
  {
    id: 5,
    fid: 8,
    name: "Добавить сына",
    year: "1950",
    gender: "male",
    avatarUrl: manavatar,
    template: "customTemplate",
  },
  {
    id: 6,
    fid: 8,
    name: "Добавить дочь",
    year: "1955",
    gender: "female",
    avatarUrl: womanavatar,
    template: "customTemplate",
  },
  {
    id: 3,
    pids: [8],
    name: "Добавить партнера",
    year: "2010",
    gender: "female",
    avatarUrl: addPartnerIcon,
    template: "addPartnerTemplate", 
  },
  {
    id: 8,
    fid: 1, 
    mid: 2,
    pids: [4, 3, 7],
    name: "Иван",
    surname: "Иванов",
    year: "1955",
    gender: "male",
    avatarUrl: ivanIvanIcon,
    template: "ivanIvanTemplate",
  },
];

const FamilyTreeModal: React.FC<FamilyTreeModalProps> = ({
  id,
  onClose,
  onSelectRelation,
}) => {
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

    const customTemplate = {
      ...FamilyTree.templates.base,
      size: [200, 60],
      node: `
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
        " fill="transparent" stroke="#fff" stroke-width="2"></path>
      `,
      field_0: `
        <text class="user-name" x="125" y="43" text-anchor="middle" fill="#333" font-size="12px">{val}</text>
      `,

      img_0: `
      <clipPath id="{clipId}">
        <circle cx="27.5" cy="27.5" r="45"></circle>
      </clipPath>
      <image xlink:href="{val}" x="5" y="15" width="45" height="45" clip-path="url(#{clipId})" />
    `,

      link: FamilyTree.templates.base.link, 
    };

    // Шаблон для добавления партнера
    const addPartnerTemplate = {
      ...FamilyTree.templates.customTemplate,
      size: [200, 60],
      node: `
        <path class="node-shape-add-partner" d="
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
        <g class="node-actions">
          <image x="170" y="20" width="20" height="20" href="${addPartnerIcon}" cursor="pointer" data-action="addPartner" />
        </g>
      `,
      field_0: `
        <text class="user-name-add-partner" x="100" y="30" text-anchor="middle" fill="#00796b" font-size="12px">{val}</text>
      `,
      img_0: `
        <clipPath id="{clipId}">
          <circle cx="100" cy="20" r="20"></circle>
        </clipPath>
        <image xlink:href="{val}" x="80" y="0" width="40" height="40" clip-path="url(#{clipId})" />
      `,
      link: FamilyTree.templates.base.link,
    };

    // Шаблон для корня
    const ivanIvanTemplate = {
      ...FamilyTree.templates.customTemplate,
      size: [200, 80],
      node: `
        <path class="node-shape-ivan" d="
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
        <g class="node-actions">
          <image x="170" y="30" width="20" height="20" href="${addPartnerIcon}" cursor="pointer" data-action="addPartner" />
          <image x="140" y="30" width="20" height="20" href="${ivanIvanIcon}" cursor="pointer" data-action="viewProfile" />
        </g>
      `,
      field_0: `
        <text class="user-name-ivan" x="100" y="40" text-anchor="middle" fill="#ff6f00" font-size="14px">{val}</text>
      `,
      field_1: `
        <text class="user-year-ivan" x="100" y="60" text-anchor="middle" fill="#ff6f00" font-size="12px">{val}</text>
      `,
      img_0: `
        <clipPath id="{clipId}">
          <circle cx="100" cy="20" r="20"></circle>
        </clipPath>
        <image xlink:href="{val}" x="80" y="0" width="40" height="40" clip-path="url(#{clipId})" />
      `,
      link: FamilyTree.templates.base.link,
    };

    FamilyTree.templates.customTemplate = customTemplate;
    FamilyTree.templates.addPartnerTemplate = addPartnerTemplate;
    FamilyTree.templates.ivanIvanTemplate = ivanIvanTemplate;

    const relationData = relations.map((rel) => ({
      id: rel.id,
      fid: rel.fid || null,
      mid: rel.mid || null,
      pids: rel.pids || [],
      name: rel.name ? `${rel.name} ${rel.surname || ""}` : "",
      year: rel.year || "",
      avatarUrl: rel.avatarUrl || "",
      template: rel.template || "customTemplate",
    }));

    console.log("Relation Data:", relationData);

    const family = new FamilyTree(treeRef.current, {
      template: "customTemplate",
      nodes: relationData,
      nodeBinding: {
        field_0: "name",
        field_1: "year",
        img_0: "avatarUrl",
      },
      mode: "light",
      toolbar: { layout: false, fit: false, zoom: false },
      enableSearch: false,
      minPartnerSeparation: 100,
      partnerNodeSeparation: 50,
      siblingSeparation: 100,
      levelSeparation: 100,
    });

    familyInstance.current = family;

    family.on("click", (_sender, args) => {
      const node = args?.node;
      const action = args?.event?.target?.getAttribute("data-action");

      if (node && node.id !== 0) {
        const nodeTemplate = node.data?.template;

        if (action === "addPartner") {
          console.log("Добавить партнера для узла:", node.id);
          onSelectRelation("Добавить партнера");
          onClose();
        } else if (
          action === "viewProfile" &&
          nodeTemplate === "ivanIvanTemplate"
        ) {
          console.log("Просмотр профиля Иванова Ивана:", node.id);
          onSelectRelation("Просмотр профиля Иванова Ивана");
          onClose();
        } else {
          const selectedRelation = relations.find(
            (rel) => rel.id === node.id
          )?.name;
          if (selectedRelation) {
            console.log("Выбран тип родственника:", selectedRelation);
            onSelectRelation(selectedRelation);
            onClose();
          }
        }
      }
    });

    return () => {
      destroyTree();
    };
  }, [onSelectRelation, onClose]);

  return (
    <div
      id={id}
      onClick={onClose} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          width: "100%", 
          height: "100%", 
          backgroundColor: "transparent",
          borderRadius: "8px",
          position: "relative",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          ref={treeRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default FamilyTreeModal;
