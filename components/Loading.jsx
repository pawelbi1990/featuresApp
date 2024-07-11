import Layout from "./Layout";

const Loading = (props) => {
  return (
    <div className="layout">
      <div className="wrapper">
        <div className="loading">{props.text}...</div>
      </div>
    </div>
  );
};

export default Loading;
