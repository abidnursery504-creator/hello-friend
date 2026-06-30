import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Lock, Mail, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/common/Container";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "Create account — All Tree BD Shop" }, { name: "robots", content: "noindex" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <Container className="grid place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <Link to="/" className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft"><Leaf className="size-6" /></Link>
          <h1 className="text-center font-display text-2xl font-bold">Join our garden</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">Create an account to save your favorites and track orders.</p>

          <form onSubmit={(e) => { e.preventDefault(); toast.success("Account created (demo)"); navigate({ to: "/account" }); }} className="mt-8 space-y-4">
            <Field icon={<User className="size-4" />} placeholder="Full name" />
            <Field icon={<Mail className="size-4" />} type="email" placeholder="you@email.com" />
            <Field icon={<Lock className="size-4" />} type="password" placeholder="Password" />
            <button type="submit" className="w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft">Create account</button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
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
      <input {...props} required className="flex-1 bg-transparent text-sm focus:outline-none" />
    </div>
  );
}
