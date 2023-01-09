import { NextPage } from "next";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import { AdfScanner, NotificationsNoneSharp } from "@mui/icons-material";

// ClientSideRendering
const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  // クライアントからsupabaseにfetchを行う
  useEffect(() => {
    // supabaseからTaskのデータを取得(todosテーブルの全て)
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      // Task[]の型をつけて状態変数に格納
      setTasks(tasks as Task[]);
    };
    // supabaseからNoticeのデータを取得(todosテーブルの全て)
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);
  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSR</p>
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
    </Layout>
  );
};

export default Csr;
