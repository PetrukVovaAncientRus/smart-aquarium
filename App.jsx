import LegacyLayout from "./LegacyLayout.jsx";
import { useAquariumLogic } from "./useAquariumLogic.js";
import ConnectionStatus from "./components/ConnectionStatus.jsx";

export default function App() {
  const { isConnected } = useAquariumLogic();

  return (
    <>
      <ConnectionStatus isConnected={isConnected} />
      <LegacyLayout />
    </>
  );
}
