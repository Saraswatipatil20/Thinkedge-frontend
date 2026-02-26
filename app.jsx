import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Preloader from "./Components/preloader";
import Navbar from "./Components/Navbar";
import SignUpModal from "./Components/SignUpModal";
import LoginModal from "./Components/LoginModal";
import Students from "./Components/Students";
import Content from "./Components/Content";
import Dsasheet from "./Components/Dsasheet";
import Footer from "./Components/Footer";
import SigmaCoursePage from "./Components/SigmaCoursePage";
import PaymentPage from "./Components/PaymentPage";
import Courses from "./Components/Courses";
import Playlist from "./Components/Playlist";
import AdminDashboard from "./Components/AdminDashboard";
import NewCourses from "./Components/NewCourses";
import Dashboard from "./Components/Courses";

// 🔥 Import NFT Certificate Minter
import CertificateMinter from "./Components/CertificateMinter";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Wallet Connection Logic (optional if already inside CertificateMinter)
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {location.pathname !== "/admin" && (
            <Navbar
              setIsLoginModalOpen={() => {
                setIsLoginModalOpen(true);
                setIsSignUpModalOpen(false);
              }}
              setIsSignUpModalOpen={() => {
                setIsSignUpModalOpen(true);
                setIsLoginModalOpen(false);
              }}
            />
          )}

          <Routes>
            <Route path="/" element={<><Content /><Students /><Footer /></>} />
            <Route path="/sigma-course" element={<><SigmaCoursePage /><Footer /></>} />
            <Route path="/dsa-sheet" element={<Dsasheet />} />
            <Route path="/new-courses" element={<NewCourses setIsLoginModalOpen={setIsLoginModalOpen} />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/courses" element={<><Dashboard /><Footer /></>} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<LoginModal />} />

            {/* ✅ New NFT Minting Route */}
            <Route
              path="/mint-certificate"
              element={
                <>
                  <div style={{ padding: "2rem" }}>
                    {!account ? (
                      <button onClick={connectWallet}>Connect Wallet</button>
                    ) : (
                      <>
                        
                        <CertificateMinter account={account} />
                      </>
                    )}
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>

          {isSignUpModalOpen && (
            <SignUpModal
              openModal={isSignUpModalOpen}
              setOpenModal={setIsSignUpModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              openModal={isLoginModalOpen}
              setOpenModal={setIsLoginModalOpen}
              setIsSignUpModalOpen={setIsSignUpModalOpen}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
