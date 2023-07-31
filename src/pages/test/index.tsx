import { useEffect, useState } from "react";

const IndexTestPage: React.FC<{}> = () => {
  const [data, setData] = useState<number[]>([0]);

  const addData = () => {
    setData([...data, data[data.length - 1] + 1]);
  };

  return (
    <div className="text-slate-100">
      {"parent"}
      {data}
      <button onClick={addData}>add btn</button>
      <Child1 data={data}></Child1>
    </div>
  );
};

const Child1: React.FC<{ data: number[] }> = (props) => {
  return (
    <div className="text-slate-100">
      {"child 1"}
      {props.data}
      <Child2 data={props.data}></Child2>
    </div>
  );
};

const Child2: React.FC<{ data: number[] }> = (props) => {
  return (
    <div className="text-slate-100">
      {"child 2"}
      {props.data}
    </div>
  );
};

export default IndexTestPage;
