// src/hooks/useLogin.ts
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useUser } from "@/context/UserContext";
import AuthService from "@/services/AuthService";
import showToast from "@/utils/showToast";
import type { z } from "zod";

export type LoginPayload<T extends z.ZodTypeAny = any> = z.infer<T>;

export default function useLogin<T extends z.ZodTypeAny = any>() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { login: loginContext } = useUser();

  const mutation = useMutation({
    mutationFn: async (data: LoginPayload<T>) => {
      const response = await AuthService.login(data);
      return response;
    },
    onSuccess: (response: any) => {
      const userData = response.data.data.username;
      const userToken = response.data.data.accessToken;
      loginContext(userData, userToken);
      toast.success(response.data.message);
      router.push(callbackUrl);
      // window.location.href = callbackUrl;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showToast(error.response?.data.message ?? "Terjadi kesalahan");
    },
  });

  return {
    login: mutation.mutate as (data: LoginPayload<T>) => void,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
