import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/supabase/auth.server";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "একাউন্ট তৈরি — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      await signUp({ data: { email, password, fullName } });
      await signIn({ data: { email, password } });
    },
    onSuccess: async () => {
      toast.success("একাউন্ট তৈরি হয়েছে");
      await router.invalidate();
      navigate({ to: "/account" });
    },
    onError: (err: Error) => toast.error(err.message || "একাউন্ট তৈরি ব্যর্থ হয়েছে"),
  });

  return (
    <PageLayout>
      <Container className="grid place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <Link to="/" className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft"><Leaf className="size-6" /></Link>
          <h1 className="font-bn text-center font-display text-2xl font-bold">আমাদের সাথে যুক্ত হোন</h1>
          <p className="font-bn mt-1 text-center text-sm text-muted-foreground">পছন্দ সংরক্ষণ ও অর্ডার ট্র্যাক করতে একাউন্ট তৈরি করুন।</p>

          <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="mt-8 space-y-4">
            <Field icon={<User className="size-4" />} placeholder="পুরো নাম" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Field icon={<Mail className="size-4" />} type="email" placeholder="আপনার ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field icon={<Lock className="size-4" />} type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={mutation.isPending} className="font-bn w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60">
              {mutation.isPending ? "তৈরি হচ্ছে…" : "একাউন্ট তৈরি করুন"}
            </button>
          </form>

          <p className="font-bn mt-6 text-center text-sm text-muted-foreground">
            ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="font-semibold text-primary hover:underline">লগইন করুন</Link>
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <span className="text-muted-foreground">{icon}</span>
      <input {...props} required className="font-bn flex-1 bg-transparent text-sm focus:outline-none" />
    </div>
  );
}
