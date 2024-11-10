import { useForm } from "react-hook-form";
import { getUserStore } from "./UserStore";

type forminput = { username: string; password: string };

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forminput>();
  const apiurl = "https://localhost:7217/api/";
  const useUserStore = getUserStore(apiurl);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const username = useUserStore((state) => state.userName);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const onSubmit = async (data: forminput) =>
    await login(data.username, data.password);

  return (
    <>
      <div>Logged In = {isLoggedIn.toString()}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        <br />
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => logout(username)}>Logout</button>
    </>
  );
}
