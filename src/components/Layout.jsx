import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 col-lg-10 px-md-4 py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
