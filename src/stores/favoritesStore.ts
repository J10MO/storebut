import { create } from "zustand"

interface FavoritesStore {
  favoriteIds: number[]
  loading: boolean
  initialized: boolean
  setFavorites: (ids: number[]) => void
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  hasFavorite: (id: number) => boolean
  getFavoritesCount: () => number
  markInitialized: () => void
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  loading: false,
  initialized: false,

  setFavorites: (ids) => set({ favoriteIds: ids, initialized: true }),

  addFavorite: (id) =>
    set((state) => {
      if (state.favoriteIds.includes(id)) {
        return state
      }
      return { favoriteIds: [...state.favoriteIds, id] }
    }),

  removeFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
    })),

  hasFavorite: (id) => {
    return get().favoriteIds.includes(id)
  },

  getFavoritesCount: () => {
    return get().favoriteIds.length
  },

  markInitialized: () => set({ initialized: true }),
}))
