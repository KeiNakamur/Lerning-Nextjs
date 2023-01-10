import { NextPage } from "next";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "../utils/supabase";
import { Layout } from "../components/Layout";

const Dashboard: NextPage = () => {
  const signOut = () => {
    // supabse上で用意されているsignOut関数
    supabase.auth.signOut();
  };
  return (
    <Layout title="Dashboard">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
    </Layout>
  );
};

export default Dashboard;
