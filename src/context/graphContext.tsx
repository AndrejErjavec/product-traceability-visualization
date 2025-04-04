import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ViewPort } from "react-zoomable-ui/dist/ViewPort";

interface TreeContextType {
  selectedNode: any;
  setSelectedNode: (node: any) => void;
  viewPort: ViewPort | null;
  setViewPort: (viewPort: ViewPort) => void;
  centerView: () => void;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [viewPort, setViewPort] = useState<ViewPort | null>(null);

  const centerView = () => {
    viewPort?.updateContainerSize();

    const canvas = document.querySelector(".canvas") as HTMLElement | null;
    if (canvas) {
      viewPort?.camera?.centerFitElementIntoView(canvas);
    }
  };

  return (
    <TreeContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        viewPort,
        setViewPort,
        centerView,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = (): TreeContextType => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
