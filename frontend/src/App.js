import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./components/Screens/RegisterScreen";
import EventsDisplay from "./components/EventScreens/EventsDisplay";
import LoginScreen from "./components/Screens/Login";
const App = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<EventsDisplay />} exact={true}/>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} exact={true}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
