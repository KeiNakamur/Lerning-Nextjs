import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // 取得したmetricに応じて処理を分岐(reportWebVitalsとはなんぞや、、、)
  // vercelでデプロイする際の処理っぽい
  switch (metric.name) {
    case "FCP":
      console.log(`FCP:${Math.round(metric.value * 10) / 10}`);
      break;
    case "LCP":
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "TTFB":
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "Next.js-hydration":
      console.log(
        `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      );
      break;
    default:
      break;
  }
}

const queryClient = new QueryClient({
  // defaultOptionsはプロジェクト全体に適用されるoption
  defaultOptions: {
    queries: {
      // reactQueryがfetchに失敗した場合に自動的に再fetchを行うのがretry
      retry: false,
      // デフォルトでユーザーがブラウザのコンポーネントにフォーカスを当てた時に自動でフェッチが動く
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    // const user = supabase.auth.user();
    // if (user && pathname === "/") {
    //   push("/dashboard");
    // } else if (!user && pathname !== "/") {
    //   await push("/");
    // }
  };
  // supabaseの用意されている関数であるonAuthStateChangeを用いて
  // ユーザーがログアウトしたかを検知することができる
  supabase.auth.onAuthStateChange((event, session) => {
    // eventで条件分けすることができる
    // SIGNED_IN、かつ、現在のページが/(homeページ)の時
    if (event === "SIGNED_IN" && pathname === "/") {
      push("/dashboard");
    }
    // SIGNED_OUTの時
    if (event === "SIGNED_OUT") {
      push("/");
    }
  });
  useEffect(() => {
    validateSession();
  }, []);
  return (
    // プロジェクト全体にReactQueryを適用させたいのでQueryClientProviderで囲う
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
