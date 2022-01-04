import { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../core/layouts/Layout";
import { UserDashboard } from "../../core/components/Dashboard";
import { useAuth } from "../../core/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <Layout>
      <UserDashboard />
    </Layout>
  );
}
