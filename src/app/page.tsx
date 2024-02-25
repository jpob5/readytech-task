import Image from "next/image";
import Form from "@/components/form/form";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Form />
    </main>
  );
}
