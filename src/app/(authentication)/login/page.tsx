import AuthDialog from "@/components/auth/auth-dialog";

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   <AuthDialog></AuthDialog>
    </div>
  );
}