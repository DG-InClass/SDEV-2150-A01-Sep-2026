import { Outlet } from 'react-router'; // where it puts the content
import Header from './components/Header';
import PageLayout from './components/layout/PageLayout';

export default function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      {/* React Router will swap in content in the Outlet component */}
      <Outlet />
    </PageLayout>
  );
}