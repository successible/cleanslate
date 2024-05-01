import type { DummyFoods } from "./dummyFoods";

export const amaranth: DummyFoods = {
  Amaranth: {
    Cooked: ["Amaranth (cooked)"],
    Dry: ["Amaranth (dry)"],
  },
};

export const barley: DummyFoods = {
  Barley: {
    Cooked: ["Barley (cooked)"],
    Dry: ["Barley (dry)"],
  },
};

export const buckwheat: DummyFoods = {
  Buckwheat: {
    Cooked: ["Buckwheat (cooked)"],
    Dry: ["Buckwheat (dry)"],
  },
};

export const bulger: DummyFoods = {
  Bulger: {
    Cooked: ["Bulgur (cooked)"],
    Dry: ["Bulgur (dry)"],
  },
};

export const couscous: DummyFoods = {
  Couscous: {
    Cooked: ["Couscous (cooked)"],
    Dry: ["Couscous (dry)"],
  },
};

export const farro: DummyFoods = {
  Farro: {
    Cooked: ["Farro (cooked)"],
    Dry: ["Farro (dry)"],
  },
};

export const freekeh: DummyFoods = {
  Freekeh: {
    Cooked: ["Freekeh (cooked)"],
    Dry: ["Freekeh (dry)"],
  },
};

export const hominy: DummyFoods = {
  Hominy: {
    Cooked: ["Hominy (cooked)"],
    Dry: ["Hominy (dry)"],
  },
};

export const millet: DummyFoods = {
  Millet: {
    Cooked: ["Millet (cooked)"],
    Dry: ["Millet (dry)"],
  },
};

export const oats: DummyFoods = {
  Oats: {
    Cooked: ["Oats (cooked)"],
    Dry: ["Oats (dry)"],
  },
};

export const polenta: DummyFoods = {
  Polenta: {
    Cooked: ["Polenta (cooked)"],
    Dry: ["Polenta (dry)"],
  },
};

export const quinoa: DummyFoods = {
  Quinoa: {
    Cooked: ["Quinoa (cooked)"],
    Dry: ["Quinoa (dry)"],
  },
};

export const ryeBerries: DummyFoods = {
  "Rye berries": {
    Cooked: ["Rye berries (cooked)"],
    Dry: ["Rye berries (dry)"],
  },
};

export const sorghum: DummyFoods = {
  Sorghum: {
    Cooked: ["Sorghum (cooked)"],
    Dry: ["Sorghum (dry)"],
  },
};

export const spelt: DummyFoods = {
  Spelt: {
    Cooked: ["Spelt (cooked)"],
    Dry: ["Spelt (dry)"],
  },
};

export const teff: DummyFoods = {
  Teff: {
    Cooked: ["Teff (cooked)"],
    Dry: ["Teff (dry)"],
  },
};

export const wheatBerries: DummyFoods = {
  "Wheat berries": {
    Cooked: ["Wheat berries (cooked)"],
    Dry: ["Wheat berries (dry)"],
  },
};

export const wholeGrains = {
  "Whole grain": {
    ...amaranth,
    ...barley,
    ...buckwheat,
    ...bulger,
    ...couscous,
    ...farro,
    ...freekeh,
    ...hominy,
    ...millet,
    ...oats,
    ...polenta,
    ...quinoa,
    ...ryeBerries,
    ...sorghum,
    ...spelt,
    ...teff,
    ...wheatBerries,
  },
};
