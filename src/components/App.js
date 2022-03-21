import RouteList from '../RouteList';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      {!localStorage.accessToken ? <div /> : <Navbar />}
      <RouteList />
    </div>
  );
}
export default App;
