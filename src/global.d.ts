declare module "@balkangraph/familytree.js" {
  // Это сам конструктор FamilyTree (класс/фабрика)
  interface FamilyTreeStatic {
    new (
      container: HTMLElement | string,
      options: FamilyTreeOptions
    ): FamilyTreeInstance;
    templates: Record<string, unknown>;
    [key: string]: unknown;
  }

  // Опции, которые передаются во второй аргумент конструктора
  interface FamilyTreeOptions {
    template?: string;
    templates?: string[];
    nodes?: FamilyTreeNodeData[];
    mode?: "dark" | "light";
    toolbar?: {
      layout?: boolean;
      fit?: boolean;
      zoom?: boolean;
    };
    nodeBinding?: {
      field_0?: string;
      field_1?: string;
      field_2?: string;
      img_0?: string;
    };
    enableSearch?: boolean;
    minPartnerSeparation?: number;
    partnerNodeSeparation?: number;
    siblingSeparation?: number;
    levelSeparation?: number;
    [key: string]: unknown;
  }

  // Структура одного узла (family node)
  interface FamilyTreeNodeData {
    id: number;
    fid?: number | null;
    mid?: number | null;
    pids?: number[];
    name?: string;
    surname?: string;
    year?: string;
    gender?: string;
    avatarUrl?: string;
    template?: string;
    [key: string]: unknown;
  }

  // Экземпляр (то, что возвращается при new FamilyTree(...))
  interface FamilyTreeInstance {
    on(event: string, callback: (sender: unknown, args: unknown) => void): void;
    destroy(): void;
    [key: string]: unknown;
  }

  // Экспортируем константу (по умолчанию)
  const FamilyTree: FamilyTreeStatic;
  export default FamilyTree;
}
