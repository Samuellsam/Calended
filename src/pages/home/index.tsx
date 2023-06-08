import Logo from "@/components/Logo";
import Calendar from "@/components/Calendar";
import Menu from "@/components/menu/Menu";

const HomePage: React.FC<{}> = () => {
  return (
    <div className="relative">
      <Menu />
      <div>
        <Logo />
        <Calendar />
      </div>
    </div>
  );
};

export default HomePage;
