// stores/favoritesStore.ts
import create from 'zustand';

interface FavoritesStore {
  favoriteIds: Set<number>;
  loading: boolean;
  initialized: boolean;
  setFavorites: (ids: Set<number>) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  markInitialized: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoriteIds: new Set(),
  loading: false,
  initialized: false,
  
  setFavorites: (ids) => set({ favoriteIds: ids, initialized: true }),
  
  addFavorite: (id) => set((state) => {
    const newIds = new Set(state.favoriteIds);
    newIds.add(id);
    return { favoriteIds: newIds };
  }),
  
  removeFavorite: (id) => set((state) => {
    const newIds = new Set(state.favoriteIds);
    newIds.delete(id);
    return { favoriteIds: newIds };
  }),
  
  markInitialized: () => set({ initialized: true })
}));