import LegacyLayout from "./LegacyLayout.jsx";
import { useAquariumLogic } from "./useAquariumLogic.js";

export default function App() {
  useAquariumLogic();

  return <LegacyLayout/>;
}
