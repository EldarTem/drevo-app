declare global {
  interface FamilyTreeOptions {
    data: Array<{
      id: number;
      name: string;
      parentId?: number;
    }>;
    nodeBinding: {
      field_0: string;
    };
  }

  interface FamilyTreeInstance {
    on(event: string, callback: (node: FamilyTreeNode) => void): void;
    destroy(): void;
  }

  interface FamilyTreeNode {
    id: number;
    name: string;
  }

  interface Window {
    FamilyTree: new (
      container: HTMLElement,
      options: FamilyTreeOptions
    ) => FamilyTreeInstance;
  }
}

export {};
