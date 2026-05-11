import { Outlet } from "react-router";
import { ThemeProvider } from "next-themes";

export default function Root() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="h-screen w-full overflow-hidden bg-background">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
