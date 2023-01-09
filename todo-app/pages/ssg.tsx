import Link from "next/link";
import { useRouter } from "next/router";
// Nextのページコンポーネントのデータ型↓
import { NextPage } from "next";
import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

// getStaticPropsはビルド時にデータを取得して事前にHTMLファイルのレンダリングを行うこと
export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps/ssg invoked");
  const { data: tasks } = await supabase
    // todosのテーブルから取得するので.from("todos")
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });
  // getStaticPropsはreturnでpropsを返す必要があるので
  return {
    props: {
      tasks,
      notices,
    },
  };
};
// 上記のgetStaticPropsで定義した内容が以下のSsgで表示されるので
// StaticPropsのpropsの定義をする
type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};
// 上記で定義したStaticPropsの型を以下でジェネリクスで定義する。またPropsの値(tasks, props)自体を渡す必要がある
const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter();
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SSG</p>
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
      <button className="mb-3 text-xs" onClick={() => router.push("/ssr")}>
        Route to ssr
      </button>
    </Layout>
  );
};

export default Ssg;
