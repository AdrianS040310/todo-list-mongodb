import Navbar from "../components/navbar"

export const metadata = {
  title: "TodoList MongoDB",
  description: "Todo list con mongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ padding: 5, backgroundColor: '#cef9ff' }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}