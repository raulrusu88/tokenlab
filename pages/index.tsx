import React from "react";
import axios from "axios";
import { CoinsView } from "../core/layouts/CoinsView/CoinsView";
import { Layout } from "../core/layouts/Layout";

export default function Home({ data }) {
  return (
    <Layout>
      <CoinsView />
    </Layout>
  );
}
