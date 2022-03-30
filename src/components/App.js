import RouteList from '../RouteList';
import Navbar from './Navbar';
import { GlobalProvider } from '../context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      {!localStorage.accessToken ? <div /> : <Navbar />}
      <RouteList />
    </GlobalProvider>
  );
}
export default App;
