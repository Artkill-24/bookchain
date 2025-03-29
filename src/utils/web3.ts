import { ethers } from 'ethers';
import type { Book } from '../types/book';

export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function disconnectWallet(): Promise<void> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  // Clear any local wallet state
  localStorage.removeItem('walletConnected');
}

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

// Temporary mock function until smart contract integration is implemented
export async function fetchPublishedBooks(): Promise<Book[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      title: "The Blockchain Revolution",
      description: "A comprehensive guide to understanding blockchain technology and its implications for the future of digital transactions.",
      coverImageURI: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&h=300&fit=crop",
      contentURI: "ipfs://QmExample1",
      author: "0x1234567890123456789012345678901234567890",
      price: 0.1,
      isPublished: true
    },
    {
      id: 2,
      title: "Web3 Development",
      description: "Learn how to build decentralized applications using modern web technologies and smart contracts.",
      coverImageURI: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      contentURI: "ipfs://QmExample2",
      author: "0x2345678901234567890123456789012345678901",
      price: 0.15,
      isPublished: true
    }
  ];
}