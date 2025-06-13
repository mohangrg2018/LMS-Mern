import React from "react";

const Loading = () => {
  return (
    <section className="container__width flex items-center justify-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
    </section>
  );
};

export default Loading;
