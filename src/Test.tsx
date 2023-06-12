import { useEffect } from "react";

const TestComponent = () => {
  const componentsGetUrl = () => {
    console.log("TestComponent: ", location.href);
  };

  return <div onClick={componentsGetUrl}>test</div>;
};

export default TestComponent;
