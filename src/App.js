<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthLoader from "./components/common/AuthLoader";
=======
import AppRoutes from "./routes/AppRoutes";

>>>>>>> 4a5166bf3f9b2c261756f18ddc4bc5c2dc03e338
function App() {
  return (
    <AuthLoader>
      <AppRoutes />
    </AuthLoader>
  );
}

export default App;
