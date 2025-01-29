import { SideAuth } from "../components/Auth/SideAuth";
import SigninComp from "../components/Auth/SigninComp";

export const Signin = () => {
  return (
    <div>
      <div className="flex flex-row">
        <SideAuth />
        <SigninComp />
      </div>
    </div>
  );
};

export default Signin;
