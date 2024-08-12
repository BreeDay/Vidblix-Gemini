// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/config/products";

export const COLORS = [
  { label: "Light", value: "light", tw: "zinc-100" },
  {
    label: "Medium",
    value: "medium",
    tw: "zinc-400",
  },
  { label: "Dark", value: "dark", tw: "zinc-900" },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "Person",
      value: "person",
    },
    {
      label: "Animal (4 Legs)",
      value: "animal4",
    },
    {
      label: "Animal (2 Legs)",
      value: "animal2",
    },

    {
      label: "Thing",
      value: "thing",
    },
    {
      label: "Abstract",
      value: "abstract",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
