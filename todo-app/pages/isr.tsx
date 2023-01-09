import Link from "next/link";
import { useRouter } from "next/router";
// Nextのページコンポーネントのデータ型↓
import { NextPage } from "next";
import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

// (SSGと記述が基本的には同じ)
export const getStaticProps: GetStaticProps = async () => {
  console.log("isr invoked");
  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });
  // ISRの場合はpropsにrevalidateを追加する必要がある
  return { props: { tasks, notices }, revalidate: 5 };
};

type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};

// ISR(SSGしたページを任意の秒数で再生する機能)
const Isr: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="ISR">
      <p className="mb-3 text-indigo-500">ISR</p>
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          );
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          );
        })}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <p className="my-3 text-xs">Link to ssr</p>
      </Link>
      <button
        className="mb-3 text-xs"
        onClick={() => router.push("/ssr")}></button>
    </Layout>
  );
};

export default Isr;
