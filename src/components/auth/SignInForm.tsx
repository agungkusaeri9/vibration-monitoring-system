"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginValidation } from "@/validators/auth/login";
import InputLabel from "../form/FormInput";
import { z } from "zod";
import Loading from "../common/Loading";
import useLogin from "@/hooks/use-login";

type LoginFormData = z.infer<typeof loginValidation>;

export default function SignInForm() {
  const [isChecked, setIsChecked] = useState(false);

  const { login: loginMutation, isLoading: loading, isSuccess } = useLogin<
    typeof loginValidation
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginValidation),
    mode: "onChange",
    defaultValues: {
      username: "admin",
      password: "123123",
    }
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
  };


  if (loading || isSuccess) {
    return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full max-w-md mx-auto px-4 sm:px-0 mt-25">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full max-w-md mx-auto px-4 sm:px-0 mt-25">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-6">
                <InputLabel
                  label="Username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter Username"
                  register={register("username")}
                  error={errors.username}
                />
                <InputLabel
                  label="Password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter Password"
                  register={register("password")}
                  error={errors.password}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                </div>
                <div>
                  <Button loading={loading} disabled={loading} className="w-full" size="sm" type="submit">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
