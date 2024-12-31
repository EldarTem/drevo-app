import { FC, useEffect, useRef } from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import { RelativeData } from "../types";

interface MyTreePanelProps {
  id: string;
  onSelectRelative: (id: number) => void;
  relativesData: RelativeData[];
}

export const MyTreePanel: FC<MyTreePanelProps> = ({
  id,
  onSelectRelative,
  relativesData,
}) => {
  const treeContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (treeContainer.current && window.FamilyTree) {
      const options: FamilyTreeOptions = {
        data: relativesData.map((relative) => ({
          id: relative.id,
          name: relative.name,
          parentId: relative.father || relative.mother,
        })),
        nodeBinding: {
          field_0: "name",
        },
      };

      const tree: FamilyTreeInstance = new window.FamilyTree(
        treeContainer.current,
        options
      );

      tree.on("nodeClick", (node: FamilyTreeNode) => {
        onSelectRelative(node.id);
      });

      return () => {
        tree.destroy();
      };
    }
  }, [relativesData, onSelectRelative]);

  return (
    <Panel id={id}>
      <PanelHeader>Древо родственников</PanelHeader>
      <div ref={treeContainer} style={{ width: "100%", height: "100vh" }}></div>
    </Panel>
  );
};
