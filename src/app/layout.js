import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import CustomNavbar from '@/components/CustomNavbar'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify';
import UserProvider from '@/context/userProvider';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar />
          <div className='mt-2 bg-blue-300'>
            {children}
          </div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
