import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      </div>
  )
}

export default MainLayout