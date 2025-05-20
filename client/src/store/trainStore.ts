import { create } from "zustand";
import { Train } from "@/types/train";
import { createTrain, getTrains, updateTrain } from "@/lib/api";
import { useAuthStore } from "./authStore";

interface TrainStore {
  trains: Train[];
  loading: boolean;
  error: string | null;
  fetchTrains: () => Promise<void>;
  createTrain: (
    from: string,
    to: string,
    departureTime: string,
    arrivalTime: string
  ) => Promise<void>;
  updateTrainById: (id: string, data: Partial<Train>) => Promise<void>;
}

export const useTrainStore = create<TrainStore>((set) => ({
  trains: [],
  loading: false,
  error: null,
  fetchTrains: async () => {
    set({ loading: true, error: null });
    const data = await getTrains();
    set({ trains: data, loading: false });
  },
  createTrain: async (from, to, departureTime, arrivalTime) => {
    const data = await createTrain(from, to, departureTime, arrivalTime);
    return data;
  },
  updateTrainById: async (id, data) => {
    const updated = await updateTrain(id, data);
    return updated
  },
}));
