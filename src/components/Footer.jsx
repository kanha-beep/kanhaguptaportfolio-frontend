export default function Footer() {
  return (
    <footer
      style={{
        padding: "1rem",
        background: "#222",
        color: "#fff",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        width:"100%"
      }}
    >
      &copy; {new Date().getFullYear()} My Portfolio
    </footer>
  );
}
