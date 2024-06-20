
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthLoader from "./components/common/AuthLoader";
function App() {
  return (
    <AuthLoader>
      <AppRoutes />
    </AuthLoader>
  );
}

export default App;
