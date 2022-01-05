import { useAuth } from "@context/AuthContext";
import React from "react";
import { CoinsView } from "../core/layouts/CoinsView/CoinsView";
import { Layout } from "../core/layouts/Layout";

export default function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Layout>
      <CoinsView />
    </Layout>
  );
}
