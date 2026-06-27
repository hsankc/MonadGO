// MonAnimal character images
import chogImg from '../assets/monanimals/chog.png';
import molandakImg from '../assets/monanimals/molandak.png';
import moyakiImg from '../assets/monanimals/moyaki.png';
import mokadelImg from '../assets/monanimals/mokadel.png';
import mouchImg from '../assets/monanimals/mouch.png';
import salmonadImg from '../assets/monanimals/salmonad.png';
import mosferatuImg from '../assets/monanimals/mosferatu.png';

export const RARITY = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
};

export const RARITY_MULTIPLIER = {
  [RARITY.COMMON]: 1,
  [RARITY.UNCOMMON]: 2,
  [RARITY.RARE]: 3,
  [RARITY.EPIC]: 5,
  [RARITY.LEGENDARY]: 10,
};

export const RARITY_COLORS = {
  [RARITY.COMMON]: '#9CA3AF',
  [RARITY.UNCOMMON]: '#34D399',
  [RARITY.RARE]: '#60A5FA',
  [RARITY.EPIC]: '#A78BFA',
  [RARITY.LEGENDARY]: '#FBBF24',
};

export const TYPE_ICONS = {
  Beast: '🐾',
  Dark: '🌑',
  Aqua: '💧',
  Earth: '🪨',
  Wind: '💨',
  Shadow: '👻',
};

export const MONANIMALS = [
  {
    id: 0,
    name: 'Chog',
    type: 'Beast',
    rarity: RARITY.COMMON,
    basePower: 30,
    baseHp: 100,
    baseSpeed: 60,
    catchRate: 0.7,
    image: chogImg,
    color: '#836EF9',
    lore: 'The beloved mascot dog of Monad. A real-life Pokémon-style creature known for its loyalty and brave heart. Chog is the first friend every trainer meets.',
    description: 'A small purple spiky hedgehog full of energy and courage.',
    spawnBiome: 'urban',
  },
  {
    id: 1,
    name: 'Molandak',
    type: 'Dark',
    rarity: RARITY.UNCOMMON,
    basePower: 45,
    baseHp: 110,
    baseSpeed: 40,
    catchRate: 0.5,
    image: molandakImg,
    color: '#5B3FD4',
    lore: 'A dictatorial purple porcupine born from a time-travel paradox. He exists because a future community member posted memes about him before he was even created — an infinite loop of existence.',
    description: 'A fuzzy purple porcupine with a stern, commanding presence.',
    spawnBiome: 'park',
  },
  {
    id: 2,
    name: 'Moyaki',
    type: 'Aqua',
    rarity: RARITY.UNCOMMON,
    basePower: 40,
    baseHp: 90,
    baseSpeed: 70,
    catchRate: 0.5,
    image: moyakiImg,
    color: '#E879A8',
    lore: 'A mysterious cat-fish with legs that lurks near water zones. Nobody knows if it evolved from a cat or a fish — but it has the attitude of both.',
    description: 'A pink striped cat-fish hybrid with mischievous eyes.',
    spawnBiome: 'water',
  },
  {
    id: 3,
    name: 'Mokadel',
    type: 'Earth',
    rarity: RARITY.RARE,
    basePower: 65,
    baseHp: 180,
    baseSpeed: 20,
    catchRate: 0.35,
    image: mokadelImg,
    color: '#4C3A8E',
    lore: 'A massive purple blob of ancient power. Mokadel has been sleeping underground since the genesis block. When it surfaces, the ground trembles.',
    description: 'A giant grumpy blob-toad that is nearly immovable.',
    spawnBiome: 'mountain',
  },
  {
    id: 4,
    name: 'Mouch',
    type: 'Wind',
    rarity: RARITY.RARE,
    basePower: 50,
    baseHp: 70,
    baseSpeed: 95,
    catchRate: 0.3,
    image: mouchImg,
    color: '#B8A9F0',
    lore: 'Born from the Cult of Mouch after a community member left to dedicate his life to fly research. Mouch embodies creativity, harmony, and resilience — and is impossibly fast.',
    description: 'A chaotic purple fly buzzing with unstoppable energy.',
    spawnBiome: 'urban',
  },
  {
    id: 5,
    name: 'Salmonad',
    type: 'Aqua',
    rarity: RARITY.EPIC,
    basePower: 70,
    baseHp: 120,
    baseSpeed: 75,
    catchRate: 0.2,
    image: salmonadImg,
    color: '#8B7BD4',
    lore: 'A salmon that swims upstream through the blockchain, sharing alpha secrets with those patient enough to listen. Legend says catching one grants you insider knowledge.',
    description: 'A wise purple salmon who knows all the blockchain alpha.',
    spawnBiome: 'water',
  },
  {
    id: 6,
    name: 'Mosferatu',
    type: 'Shadow',
    rarity: RARITY.LEGENDARY,
    basePower: 90,
    baseHp: 150,
    baseSpeed: 85,
    catchRate: 0.1,
    image: mosferatuImg,
    color: '#4F46E5',
    lore: 'A mysterious cyberpunk frog that only appears in the darkest zones at night. Its bioluminescent spots pulse with the rhythm of the Monad blockchain. To catch one is to become legend.',
    description: 'A legendary neon-blue frog that haunts the shadows.',
    spawnBiome: 'night',
  },
];

// Helper to get a MonAnimal by ID
export const getMonAnimal = (id) => MONANIMALS.find((m) => m.id === id);

// Helper to get random MonAnimal weighted by rarity (rarer = less likely)
export const getRandomMonAnimal = () => {
  const weights = MONANIMALS.map((m) => 1 / RARITY_MULTIPLIER[m.rarity]);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < MONANIMALS.length; i++) {
    random -= weights[i];
    if (random <= 0) return MONANIMALS[i];
  }
  return MONANIMALS[0];
};
