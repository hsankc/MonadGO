# 🦖 NadGO — MonAnimals: Catch 'Em on Monad!

NadGO is a Web3 location-based AR game built on the high-performance **Monad Network**. Walk around in the real world, find digital creatures called *MonAnimals*, catch them using your phone's AR camera (gyroscope), and battle against others!

## ✨ Features

- 📍 **Real-World GPS Exploration:** Walk around in real life to discover MonAnimals spawning on the map. You must get within 5 meters of a creature to catch it!
- 📸 **AR Catching Mechanic:** Once you engage a MonAnimal, your device's Gyroscope (DeviceOrientation) kicks in. You have to physically move your phone to keep the creature in your sights and catch it!
- ⚡ **Frictionless Onboarding (Burner Wallet):** Powered by Monad. Users on mobile can start playing instantly without leaving the browser thanks to auto-generated Burner Wallets stored in local memory. Of course, standard MetaMask connection is also fully supported.
- 🌓 **Dynamic Themes:** Beautiful Glassmorphism UI with seamless Light and Dark modes. The map tiles dynamically switch themes to match your vibe!
- ⚔️ **Battle & Power-Up System:** Catch duplicates to power up your MonAnimals and use them in the Battle Arena to climb the leaderboard!

## 🚀 Built With

- **Frontend:** React, Vite, CSS (Glassmorphism design)
- **Map Engine:** React-Leaflet (CartoDB Tiles)
- **Web3 / Blockchain:** Ethers.js v6, Monad Testnet
- **Sensors:** Geolocation API, DeviceOrientation (Gyroscope) API

## 🛠️ Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
*(Note: To test AR Camera and GPS on a mobile device, you must deploy the app or use a secure HTTPS tunnel, as mobile browsers block these hardware APIs on standard HTTP).*

## 🌐 Network Configuration

NadGO runs on the Monad Testnet:
- **Network Name:** Monad Testnet
- **RPC URL:** `https://testnet-rpc.monad.xyz`
- **Chain ID:** `10143`
- **Currency Symbol:** `MON`

---
*Built with ❤️ for the Monad Hackathon.*
