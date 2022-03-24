import RouteList from '../RouteList';
import Navbar from './Navbar';
import { GlobalProvider } from '../context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div>
        {!localStorage.accessToken ? <div /> : <Navbar />}
        <RouteList />
      </div>
    </GlobalProvider>
  );
}
export default App;
