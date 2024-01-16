"use client";
const page = () => {
  const editTask = async () => {
    const response = await fetch("/api/editTask", {
      method: "PUT",
    });
  };
  return <button onClick={editTask}>Edit task</button>;
};

export default page;
