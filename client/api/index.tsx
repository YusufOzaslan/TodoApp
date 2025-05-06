import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000
});

export const handleApiError = (error: any) => {
  if (error.response) {
    return { message: "Unexpected error, please try again" };
  }

  if (error.request) {
    return { message: "Please check your network or try again later" };
  }

  return { message: "Unexpected error occurred, please try again" };
};