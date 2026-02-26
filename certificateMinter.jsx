mport React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/contractConfig";

const CertificateMinter = ({ account, connectWallet }) => {
  const [tokenURI, setTokenURI] = useState("");
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    if (!tokenURI.trim()) {
      alert("❗ Please enter a valid certificate URI");
      return;
    }

    if (!account) {
      alert("❗ Wallet not connected");
      return;
    }

    try {
      setLoading(true);
      setTokenId(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.mintCertificateNFT(account, tokenURI);
      const receipt = await tx.wait();

      const events = receipt.logs.filter(
        (log) => log.address.toLowerCase() === contractAddress.toLowerCase()
      );
      const id = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], events[0].topics[3])[0].toString();

      setTokenId(id);
      alert(`✅ NFT Minted! Token ID: ${id}`);
    } catch (err) {
      console.error("Error minting NFT:", err);
      alert("❌ Transaction failed. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  // Function to shorten the wallet address
  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  };

  return (
    <div style={styles.page}>
      {/* Top Right Wallet Button */}
      <div style={styles.header}>
        {account ? (
          <p style={styles.connectedText}>Connected: {shortenAddress(account)}</p>
        ) : (
          <button style={styles.connectBtn} onClick={connectWallet}>
            🔗 Connect Wallet
          </button>
        )}
      </div>

      {/* Main Card */}
      <div style={styles.container}>
        <h1 style={styles.title}>ThinkEdge Certification Portal</h1>
        <p style={styles.subtitle}>
          Connect your wallet to mint your professional certification as an NFT
        </p>

        <input
          type="text"
          placeholder="Enter IPFS certificate URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          style={styles.input}
          disabled={loading}
        />

        <button
          onClick={mintNFT}
          disabled={loading || !tokenURI}
          style={{
            ...styles.mintBtn,
            backgroundColor: loading || !tokenURI ? "#ccc" : "#4f46e5",
          }}
        >
          {loading ? "Minting..." : "Mint Certificate NFT"}
        </button>

        {tokenId && (
          <p style={styles.success}>
            🎉 Success! Your NFT has been minted. <br />
            <strong>Token ID:</strong> {tokenId}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #eef2ff, #f8fafc)",
    padding: "20px",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  connectedText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111827",
    backgroundColor: "#e0f2fe",
    padding: "8px 12px",
    borderRadius: "8px",
  },
  connectBtn: {
    backgroundColor: "#6366f1",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  container: {
    maxWidth: "500px",
    margin: "100px auto 0",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  },
  mintBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  success: {
    marginTop: "20px",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "14px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default CertificateMinter;
