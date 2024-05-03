import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { LoadingContextProvider } from "./context/Loading";
import Page1 from "./screens/Page1";
import Page2 from "./screens/Page2";
import { ActionExampleContextProvider } from "./context/actionExampleContext";
import PrivateRoute from "./hoc/PrivateRoute";
import { ROLE } from "./constants/roles";
import Blogs from "./screens/Blogs";
import Register from "./screens/Register";

function App() {
  return (
    <>
    <header>
    <div className="navLinkContainer">
            <h1>BLOG(XPLOIT)</h1>
          </div>
    </header>
    <Router>
      <ActionExampleContextProvider>
        <LoadingContextProvider>
          <Routes>
            <Route path="/login" element={<Register />} />
            <Route
              path="/" 
              element={
                <PrivateRoute navigateToRouteIfNotAuthenticated={'/login'} roles={[ROLE.user, ROLE.admin]}>
                  <Blogs />
                </PrivateRoute>
              }
            />
          </Routes>
        </LoadingContextProvider>
      </ActionExampleContextProvider>
    </Router>
    <>
    <footer>
        <div className="footer">
          <p className="credits">Designed and developed by Aniket Kasturi</p>
    
          <p className="copyright">Copyright © 2024 AT</p>
  
         </div>
      </footer> 
    </>
    </>

  );
}

export default App;
