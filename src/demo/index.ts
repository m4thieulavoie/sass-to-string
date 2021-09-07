import styles from "./demo.styles.scss";

const style = document.createElement("style");
style.innerHTML = styles;
document.querySelector("head").appendChild(style);

const root = document.querySelector("#root");
console.warn({ styles });
root.innerHTML = styles;
