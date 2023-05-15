import Logo from "@/components/Logo";
import Calendar from "@/components/Calendar";
import Menu from "@/components/menu/Menu";
import { useState } from "react";

const HomePage: React.FC<{}> = () => {
  return (
    <div className="relative">
      <div>
        {/* <Logo />
        <Calendar /> */}
      </div>
      <Menu />
    </div>
  );
};

export default HomePage;
