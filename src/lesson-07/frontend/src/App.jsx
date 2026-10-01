import Header from './components/Header';
import Results from './components/Results';
import Filters from './components/Filters';
import './App.css'

function App() {
  const rebranding = "New and Improved NAIT Resource Directory";
  return (
    <>
      <Header
        heading={rebranding}
        tagline="Find the right resources, right away" />
      <hr />
      <div className='grid grid-cols-3 gap-4'>
        <Filters />
        <Results />

      </div>
    </>
  )
}

export default App
