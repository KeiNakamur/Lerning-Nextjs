import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/header/Header";
import { TotalIncome } from "@/components/totalIncome/TotalIncome";
import { TotalExpence } from "@/components/totalExpence/TotalExpence";
import { Balance } from "@/components/balance/Balance";
import { InputIncome } from "@/components/inputIncome/InputIncome";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.subWrapper}>
        <TotalIncome />
        <TotalExpence />
      </div>
      <Balance />
      <InputIncome />
    </>
  );
}
