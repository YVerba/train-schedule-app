import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTrains = async () => {
  try {
    const res = await axios.get(`${API_URL}/train`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainById = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/train/${id}`);    
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const createTrain = async (from: string, to: string, departureTime: string, arrivalTime: string) => {
  try {
    const res = await axios.post(`${API_URL}/train`, {
      from,
      to,
      departureTime,
      arrivalTime,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTrain = async (id: string, data: Record<string, unknown>) => {
  try {
    const res = await axios.patch(`${API_URL}/train/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const deleteTrain = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/train/${id}`)
  } catch (error) {
    console.log(error);
  }
}

export const signup = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });
    return res.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return res.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};
