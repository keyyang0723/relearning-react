import "./globals.css";
import { AppProviders } from "./providers";

export const metadata = {
  title: "Mini Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AppProviders> 
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
