import { useSelector } from "react-redux";
import { isLogin } from "../store/slice/authSlice";

function Home() {
  const islogin = useSelector(isLogin);

  return (
    <main className="min-h-[78vh] flex justify-center items-center my-4">
      <div className="text-2xl font-semibold">
        {islogin === true ? (
          <h1>Showing all Data</h1>
        ) : (
          <h1>Login to see data!!!</h1>
        )}
      </div>
    </main>
  );
}

export default Home;
