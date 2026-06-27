import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { MONAD_TESTNET } from '../config/monad';

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isBurner, setIsBurner] = useState(false);

  const isConnected = !!account;
  const isCorrectChain = chainId === MONAD_TESTNET.chainId;

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      // 1. Try MetaMask first
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const prov = new ethers.BrowserProvider(window.ethereum);
            setProvider(prov);
            const sig = await prov.getSigner();
            setSigner(sig);
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(parseInt(currentChainId, 16));
            return;
          }
        } catch (err) {
          console.error("MetaMask check error:", err);
        }
      }
      
      // 2. Try Burner Wallet
      const burnerPk = localStorage.getItem('nadgo_burner_pk');
      if (burnerPk) {
        try {
          const prov = new ethers.JsonRpcProvider(MONAD_TESTNET.rpcUrls[0]);
          const wallet = new ethers.Wallet(burnerPk, prov);
          setAccount(wallet.address);
          setProvider(prov);
          setSigner(wallet);
          setChainId(MONAD_TESTNET.chainId);
          setIsBurner(true);
        } catch (err) {
          console.error("Failed to load burner wallet", err);
        }
      }
    };
    
    checkConnection();
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    // If MetaMask is installed, use it
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const prov = new ethers.BrowserProvider(window.ethereum);
          setProvider(prov);
          const sig = await prov.getSigner();
          setSigner(sig);
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(currentChainId, 16));
          setIsBurner(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsConnecting(false);
      }
      return;
    }

    // FALLBACK: Create a Burner Wallet instantly for mobile
    try {
      let burnerPk = localStorage.getItem('nadgo_burner_pk');
      if (!burnerPk) {
        const newWallet = ethers.Wallet.createRandom();
        burnerPk = newWallet.privateKey;
        localStorage.setItem('nadgo_burner_pk', burnerPk);
      }
      const prov = new ethers.JsonRpcProvider(MONAD_TESTNET.rpcUrls[0]);
      const wallet = new ethers.Wallet(burnerPk, prov);
      
      setAccount(wallet.address);
      setProvider(prov);
      setSigner(wallet);
      setChainId(MONAD_TESTNET.chainId);
      setIsBurner(true);
    } catch (err) {
      setError("Failed to create Burner Wallet.");
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const switchToMonad = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET.chainIdHex }],
      });
    } catch (switchError) {
      // Chain not added — add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: MONAD_TESTNET.chainIdHex,
                chainName: MONAD_TESTNET.chainName,
                nativeCurrency: MONAD_TESTNET.nativeCurrency,
                rpcUrls: MONAD_TESTNET.rpcUrls,
                blockExplorerUrls: MONAD_TESTNET.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          setError('Failed to add Monad network: ' + addError.message);
        }
      } else {
        setError('Failed to switch network: ' + switchError.message);
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setSigner(null);
  }, []);

  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : '';

  return {
    account,
    shortAddress,
    provider,
    signer,
    chainId,
    isConnected,
    isCorrectChain,
    isConnecting,
    error,
    isBurner,
    connect,
    switchToMonad,
    disconnect,
  };
}
