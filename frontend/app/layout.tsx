import "./globals.css";

export const metadata = {
  title: "Dog Breeds Manager",
  description: "Manage and browse dog breeds and their sub-breeds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
