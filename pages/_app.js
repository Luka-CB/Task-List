import "../styles/globals.css";
import { AuthProvider } from "@/context/userContext";
import { TaskProvider } from "@/context/taskContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default MyApp;
