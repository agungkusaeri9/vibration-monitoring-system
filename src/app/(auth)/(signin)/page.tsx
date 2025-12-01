import SignInForm from "@/components/auth/SignInForm";
import Loading from "@/components/common/Loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign In | Vibration Monitoring System",
    description: "Sign in to access the Vibration Monitoring System dashboard.",
};

export default function SignIn() {
    return (
        <Suspense fallback={<Loading />}>
            <SignInForm />
        </Suspense>
    );
}
