import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHMkXpLX7FAiHcnTh50iwivk_5k-i_Kxo",
  authDomain: "socio-d4748.firebaseapp.com",
  projectId: "socio-d4748",
  storageBucket: "socio-d4748.appspot.com",
  messagingSenderId: "1076967790667",
  appId: "1:1076967790667:web:648cbb8ee3e21573d195ce",
  measurementId: "G-WBK543SYJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const docs = doc(firestore, "users/users");
const write = () => {
  const docData = {
    description: "A delicious vanilla latte",
    price: 3.99,
    milk: "Whole",
    vegan: false,
  };
  setDoc(docs, docData);
};
write();
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
