import React from "react";
import axios from "axios";
import { CoinsView } from "../core/layouts/CoinsView/CoinsView";
import { Layout } from "../core/layouts/Layout";

export const getServerSideProps = async () => {
  const response = await axios.get(
    `${process.env.CMC_URL_TEST}/v1/cryptocurrency/listings/latest?limit=50`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": `${
          process.env.production
            ? process.env.CMC_API_KEY
            : "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c"
        }`,
      },
    }
  );

  return {
    props: {
      data: response.data.data,
    },
  };
};

export default function Home({ data }) {
  return (
    <Layout>
      <CoinsView data={data} />
    </Layout>
  );
}
