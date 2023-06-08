import { todayYear } from "@/util/DateUtil";

const Logo: React.FC<{}> = () => {
  return (
    <>
      <p className="logo-size font-caveat-700 text-slate-100 mx-auto pt-3 w-max drop-shadow-[0_20px_20px_rgba(255,255,255,1)] no-select">
        {`Calended~${todayYear()}`}
      </p>
    </>
  );
};

export default Logo;
