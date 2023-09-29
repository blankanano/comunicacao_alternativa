import React from "react";
import Category from "./Category";

function Home({ setLoading }) {
  return (
    <div>
      <Category isHome={true} setLoading={setLoading} />
    </div>
  );
}

export default Home;
