import { FormEvent, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import ShieldIcon from "@mui/icons-material/Shield";
import { Layout } from "../components/Layout";
import type { NextPage } from "next";
import { useMutateAuth } from "../hooks/useMutateAuth";

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // useMutateAuthで作成し、returnで返した値を受け取る
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      // .mutate()が必要なので注意
      loginMutation.mutate();
    } else {
      // .mutate()が必要なので注意
      registerMutation.mutate();
    }
  };
  return (
    <div>
      <Layout title="Auth">
        <ShieldIcon className="mb-6 h-12 w-12 text-blue-500" />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required
              className="placeholder-grey-500 my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              required
              className="placeholder-grey-500 my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="my-6 flex items-center justify-center text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium hover:text-indigo-500">
              change mode ?
            </span>
          </div>
          <button type="submit"></button>
        </form>
      </Layout>
    </div>
  );
};

export default Auth;
