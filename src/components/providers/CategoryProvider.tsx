"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Category = "creator" | "agency" | "business";

interface CategoryContextValue {
  category: Category;
  setCategory: (c: Category) => void;
}

const CategoryContext = createContext<CategoryContextValue>({
  category: "creator",
  setCategory: () => {},
});

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>("creator");
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
