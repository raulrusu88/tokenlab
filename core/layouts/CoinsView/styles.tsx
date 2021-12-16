import { ReactNode, CSSProperties } from "react";

type ChildProp = {
  children: ReactNode;
};

type TextProp = {
  text: string;
};

const Layout = ({ children }: ChildProp) => (
  <div className="mx-8 bg-secondary rounded-t-2xl h-full py-5 px-3">
    {children}
  </div>
);

const Header = ({ children }: ChildProp) => (
  <div className="h-20 w-full grid grid-cols-2 content-center px-5">
    {children}
  </div>
);

const Title = ({ text }: TextProp) => <h1>{text}</h1>;

const Search = () => {
  return (
    <div className="w-full flex flex-row-reverse">
      <div className="flex flex-row bg-primary w-max rounded-md items-center">
        <div className="w-10 h-full bg-positive" />
        <input
          type="text"
          className="w-[250px] px-2 h-full bg-primary rounded-md"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

const Table = ({ children }: ChildProp) => (
  <table className="text-text w-full grid-cols-tableRow mt-5">{children}</table>
);

const TableRow = ({ children }: ChildProp) => <tr className="">{children}</tr>;

const TableHead = ({ text }: TextProp) => <th>{text}</th>;

const TableData = ({ children }: ChildProp) => <td>{children}</td>;

export { Layout, Header, Title, Search, Table, TableRow, TableHead, TableData };