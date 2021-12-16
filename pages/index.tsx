import { CoinsView } from "../core/layouts/CoinsView/CoinsView";
import { Layout } from "../core/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <CoinsView>
        <h1 className="text-blue-400">Welcome to Tokenlab</h1>
      </CoinsView>
    </Layout>
  );
}
