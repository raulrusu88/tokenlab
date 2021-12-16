import { ReactNode } from "react";
import { Line } from "../../components/Line";
import * as CV from "./styles";

export const CoinsView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-12">
      <CV.Layout>
        <CV.Header>
          <CV.Title text="Market Trends" />
          <CV.Search />
        </CV.Header>
        <Line />
        <CV.Table>
          <CV.TableRow>
            <CV.TableHead text="#" />
            <CV.TableHead text="Name" />
            <CV.TableHead text="Price" />
            <CV.TableHead text="24H Change" />
            <CV.TableHead text="24H Volume(USD)" />
            <CV.TableHead text="Leverage" />
            <CV.TableHead text="Amount(USD)" />
            <CV.TableHead text="Long/Short" />
          </CV.TableRow>
        </CV.Table>
      </CV.Layout>
    </div>
  );
};
