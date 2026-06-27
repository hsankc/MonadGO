// Monad Testnet Configuration
export const MONAD_TESTNET = {
  chainId: 10143,
  chainIdHex: '0x279f',
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://testnet-rpc.monad.xyz'],
  blockExplorerUrls: ['https://testnet.monadscan.com'],
};

// Treasury / Fee collection address
export const TREASURY_ADDRESS = '0x864EdC950468f3d1e1F103fd13DaD7D79dcD8b0C';

// Contract addresses (will be updated after deployment)
export const CONTRACTS = {
  MonAnimalNFT: '0x0000000000000000000000000000000000000000',
  MonBallToken: '0x0000000000000000000000000000000000000000',
  BattleArena: '0x0000000000000000000000000000000000000000',
};

// Ankara hackathon presentation location
export const HACKATHON_CENTER = {
  lat: 39.8830914,
  lng: 32.808447,
  radius: 2000, // meters - 2km radius
};

// Spawn configuration
export const SPAWN_CONFIG = {
  maxSpawns: 15,
  respawnIntervalMs: 60000, // 1 minute
  catchRadius: 100, // meters - must be within this to catch
  battleRadius: 200, // meters - must be within this for proximity battle
};
