import React from "react";
import { useSelector } from "react-redux";
import { FeaturedProducts, Hero, Services } from "../components";
import EmailVerify from "../components/Misc/EmailVerify";
const HomePage = () => {
  const { isVerified, user } = useSelector((state) => state.auth);
  const notVerified = user && !isVerified;

  return (
    <main>
      {notVerified && <EmailVerify />}

      <Hero />
      <FeaturedProducts />
      <Services />
    </main>
  );
};

export default HomePage;
