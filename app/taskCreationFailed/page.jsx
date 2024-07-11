"use client";

const Page = () => {
  return (
    <div className="wrapper-full-column bg-main">
      <h2>Error while creating a task</h2>
      <button
        className="btn"
        onClick={() => window.location.replace("/features")}
      >
        Go back
      </button>
    </div>
  );
};

export default Page;
