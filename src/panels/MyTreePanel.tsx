import { useState, useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import "../styles/treeStyles.css"; // ваши стили, если нужны
import RelativeProfileModal from "../components/RelativeProfileModal";

export function MyTreePanel() {
  const treeRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!treeRef.current) return;

    // Инициализируем дерево
    const family = new FamilyTree(treeRef.current, {
      nodes: [
        { id: 1, name: "Person #1" },
        { id: 2, fid: 1, name: "Person #2" },
      ],
      nodeBinding: {
        field_0: "name",
      },
      // Можно убрать лишние настройки, если не нужны
      mode: "light",
      toolbar: { layout: false, fit: false, zoom: false },
    });

    // При клике на узел
    family.on("click", () => {
      console.log("Node clicked - open the modal");
      setIsModalOpen(true);
    });

    // Убираем дерево при размонтировании
    return () => {
      family.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Контейнер для дерева */}
      <div
        ref={treeRef}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
        }}
      />

      {/* Если isModalOpen === true, показываем модалку */}
      {isModalOpen && (
        <RelativeProfileModal
          id="relative-modal"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
