
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useGetMe, useLogin, useRegistration } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleLoginComponent from "../modules/google-login/google-login";
import { jwtUtils } from "@/utils/jwt";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN" | "SUPER_ADMIN";
type AuthMode = "login" | "register";

type AuthResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  user?: {
    role?: UserRole;
    name?: string;
    email?: string;
    
  };
  data?: {
    accessToken?:string;
    user?: {
      role?: UserRole;
      name?: string;
      email?: string;
      accessToken?:string;
    };
  };
  url?: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
).replace(/\/$/, "");

const dashboardRoutes: Record<UserRole, string> = {
  CUSTOMER: "/customer",
  PROVIDER: "/provider",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin",
};

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-5 w-5 shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.72 5.99c4.51-4.18 7.06-10.33 7.06-17.64Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.72-5.99c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

async function postAuth(
  endpoint: string,
  payload: Record<string, string>,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result: AuthResponse = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message ||
        result.error ||
        "Authentication failed.",
    );
  }

  return result;
}

export default function AuthDialog() {
  // const {data:userData, isLoading} = useGetMe()
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errorShow, setError]= useState("")
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const refreshAfterAuth = async (destination: string) => {
  // Close the dialog and clear sensitive form fields.
  setOpen(false);
  resetFields();
  setError("");

  // Update cached authentication data.
  await queryClient.invalidateQueries({
    queryKey: ["auth", "me"],
  });

  // Navigate to the appropriate page.
  router.replace(destination);

  // Refresh Next.js Server Components and server-side data.
  router.refresh();
};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Existing project authentication hooks.
  const { mutate: login, isPending: loginPending,error} = useLogin();
  console.log(error)

  const {
    mutate: registration,
    isPending: registrationPending,
  } = useRegistration();

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Google authentication uses the backend redirect URL.
  const googleMutation = useMutation({
    mutationFn: async () => {
      const result = await postAuth("/api/v1/auth/google", {
        role: "customer",
      });

      if (!result.url) {
        throw new Error(
          "Google authentication URL was not returned by the server.",
        );
      }

      return result;
    },

    onSuccess: (result) => {
      window.location.assign(result.url!);
    },

    onError: (error: Error) => {
      toast.error(
        error.message || "Google sign-in failed.",
      );
    },
  });

  const busy =
    loginPending ||
    registrationPending ||
    googleMutation.isPending;

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogin = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    login(
      {
        email: normalizedEmail,
        password,
      },
      {
        onSuccess: async (res) => {
        const result = res as unknown as AuthResponse;
console.log(result)
        if (result.success === false) {
          toast.error(result.message || "Login failed.");
          return;
        }
        console.log(result.data)
console.log(result.data?.accessToken as string, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string)
     const  userData = jwtUtils.verifyToken(result.data?.accessToken as string, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string)
     console.log(userData)
     
        const verifiedRole =
          userData.data?.role  ?? userData.data?.role;
console.log(verifiedRole)
        const destination =
          verifiedRole && dashboardRoutes[verifiedRole]
            ? dashboardRoutes[verifiedRole]
            : "/";

        toast.success(result.message || "Login successful.");

        await refreshAfterAuth(destination);
      },
        onError: (error: Error) => {
            setError("Please valid Email or Password ...")
          toast.error(
            error.message ||
              "Something went wrong. Please try again.",
          );
        },
      },
    );
  };

  const handleRegistration = () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (normalizedName.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Public registration is customer-only.
    registration(
      {
        name: normalizedName,
        email: normalizedEmail,
        password,
      },
      {
        onSuccess: (res) => {
          const result = res as unknown as AuthResponse;

          if (result.success === false) {
            toast.error(
              result.message ||
                "Registration failed. Please try again.",
            );
            return;
          }

          toast.success(
            result.message ||
              "Registration successful. Please verify your account.",
          );

          const params = new URLSearchParams({
            email: normalizedEmail,
          });

          setOpen(false);
          resetFields();

          router.push(
            `/register/verify-account?${params.toString()}`,
          );
        },

        onError: (error: Error) => {
          toast.error(
            error.message ||
              "Registration failed. Please try again.",
          );
        },
      },
    );
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (busy) return;

    if (mode === "login") {
      handleLogin();
    } else {
      handleRegistration();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (busy && !nextOpen) return;

        setOpen(nextOpen);

        if (!nextOpen) {
          resetFields();
        }
      }}
    >
     <DialogTrigger
  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-medium text-white shadow-md transition-colors hover:bg-violet-700"
>
  Sign in
  <ArrowRight className="h-4 w-4" />
</DialogTrigger>

      <DialogContent
        className="
          w-[calc(100%-1rem)] max-w-[440px]
          max-h-[calc(100dvh-1rem)]
          overflow-y-auto overscroll-contain
          rounded-2xl border border-slate-200/80
          bg-white p-0 shadow-2xl
          sm:w-[calc(100%-2rem)] sm:max-w-[460px]
          md:max-w-[480px]
          dark:border-white/10 dark:bg-[#0b1020]
        "
      >
        <div className="relative isolate overflow-hidden rounded-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-20 -top-24 h-52 w-52 animate-pulse rounded-full bg-violet-500/15 blur-3xl sm:h-64 sm:w-64" />
            <div className="absolute -left-20 top-36 h-48 w-48 animate-pulse rounded-full bg-blue-500/15 blur-3xl [animation-delay:700ms]" />
            <div className="absolute bottom-0 right-1/4 h-32 w-32 animate-pulse rounded-full bg-fuchsia-500/10 blur-3xl [animation-delay:1200ms]" />
          </div>

          <div className="px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-6 md:px-8">
            <DialogHeader className="mb-5 text-left sm:mb-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/25 sm:h-12 sm:w-12">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 text-xs text-emerald-600 dark:text-emerald-400 sm:px-3">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure access
                </div>
              </div>

              <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                {mode === "login"
                  ? "Welcome back"
                  : "Create your account"}
              </DialogTitle>

              <DialogDescription className="text-sm leading-6">
                {mode === "login"
                  ? "Sign in to continue to your MOFHAF account."
                  : "Join MOFHAF and start your shopping journey."}
              </DialogDescription>
            </DialogHeader>

            {/* Login and registration tabs */}
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/5 sm:mb-6">
              {(["login", "register"] as const).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={busy}
                    onClick={() => switchMode(item)}
                    aria-pressed={mode === item}
                    className={`min-h-11 rounded-lg px-2 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                      mode === item
                        ? "bg-white text-violet-700 shadow-sm dark:bg-white/10 dark:text-violet-300"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item === "login"
                      ? "Sign in"
                      : "Create account"}
                  </button>
                ),
              )}
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
             
            >
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="auth-name">
                    Full name
                  </Label>

                  <div className="relative">
                    <UserRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                    <Input
                      id="auth-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className="h-11 min-w-0 pl-10"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      disabled={busy}
                      required
                      minLength={2}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="auth-email">
                  Email address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-11 min-w-0 pl-10"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    disabled={busy}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auth-password">
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      mode === "login"
                        ? "current-password"
                        : "new-password"
                    }
                    placeholder="Enter your password"
                    className="h-11 min-w-0 pl-10 pr-11"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    disabled={busy}
                    minLength={
                      mode === "register" ? 8 : undefined
                    }
                    required
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    disabled={busy}
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-3 top-2.5 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-violet-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="auth-confirm-password">
                    Confirm password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                    <Input
                      id="auth-confirm-password"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      className="h-11 min-w-0 pl-10 pr-11"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      disabled={busy}
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      disabled={busy}
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) => !value,
                        )
                      }
                      className="absolute right-3 top-2.5 flex h-6 w-6 items-center justify-center text-slate-400 hover:text-violet-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 &&
                    password !== confirmPassword && (
                      <p className="text-xs text-red-500">
                        Passwords do not match.
                      </p>
                    )}
                </div>
              )}
{mode === "login" && errorShow ?  (<div><span>{errorShow}</span></div>):""}
              {mode === "login" && (
                <div className="flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      toast.info(
                        "Connect your password reset flow here.",
                      )
                    }
                    className="min-h-8 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={busy}
                className="h-11 w-full bg-gradient-to-r from-violet-600 to-blue-600 font-semibold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-blue-700"
              >
                {busy &&
                (mode === "login"
                  ? loginPending
                  : registrationPending) ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  <>
                    {mode === "login"
                      ? "Sign in securely"
                      : "Create account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Google login is for customer accounts */}
            {mode === "login" && (
              <>
                <div className="my-5 flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="shrink-0 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                  <Separator className="flex-1" />
                </div>
                <GoogleLoginComponent/>

                {/* <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => googleMutation.mutate()}
                  className="h-11 w-full gap-2 border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  {googleMutation.isPending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <GoogleIcon />
                  )}
                  Continue with Google
                </Button> */}
              </>
            )}

            <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
              {mode === "login"
                ? "Securely access your MOFHAF account."
                : "By creating an account, you agree to our Terms and Privacy Policy."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
