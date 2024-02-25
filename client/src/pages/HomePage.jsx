import React from "react";
import LoginPage from "./LoginPage";
import styles from "../styles/LoginPage.module.css";

function HomePage() {
  return (
    <div className={styles.bodyHomePage}>
      <LoginPage />
    </div>
  );
}

export default HomePage;
