import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/lib/supabase/auth.server";

export const sessionKey = ["session"] as const;

export const useSession = () =>
  useQuery({ queryKey: sessionKey, queryFn: () => getSession(), staleTime: 60_000 });

export const useInvalidateSession = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: sessionKey });
};
