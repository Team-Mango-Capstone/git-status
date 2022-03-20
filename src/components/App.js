import RouteList from '../RouteList';
import Navbar from './Navbar';
import Login from './Login';

function App() {
  console.log(localStorage);
  return (
    <div>
      {!localStorage.accessToken ? <Login /> : <Navbar />}
      <RouteList />
    </div>
  );
}
export default App;
