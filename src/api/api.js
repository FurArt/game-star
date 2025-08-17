export const base = import.meta.env.BASE_URL || '/';
const itemsGrid = {
  1: { path: `${base}images/Items-0.png`, value: 0, stop: false, multiplication: 1 },
  2: { path: `${base}images/Items-10k.png`, value: 10000, stop: false, multiplication: 1 },
  3: { path: `${base}images/Items-100.png`, value: 100, stop: false, multiplication: 1 },
  4: { path: `${base}images/Items-500.png`, value: 500, stop: false, multiplication: 1 },
  5: { path: `${base}images/Items-1000.png`, value: 1000, stop: false, multiplication: 1 },
  6: { path: `${base}images/Items-1m.png`, value: 1000000, stop: false, multiplication: 1 },
  7: { path: `${base}images/Items-bombs.png`, value: 0, stop: true, multiplication: 1 },
  8: { path: `${base}images/Items-stop.png`, value: null, stop: true, multiplication: 1 },
  9: { path: `${base}images/Items-x2.png`, value: null, stop: false, multiplication: 2 },
};

export default itemsGrid