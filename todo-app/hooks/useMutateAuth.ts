import { useState } from "react";
import { supabase } from "../utils/supabase";
// useMutationはReact Queryでデータを登録・編集・削除したりする場合に使う
import { useMutation } from "react-query";

export const useMutateAuth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const reset = () => {
    setEmail("")
    setPassword("")
  }

  // ログイン
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (error: any) => {
        alert(error.message)
        reset()
      }
    }
  )
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message);
    },
    {
      onError: (error: any) => {
        alert(error.message)
        reset()
      }
    }
  )
  // 各コンポーネントから利用できるようにreturnで各要素を返す
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation
  }
}