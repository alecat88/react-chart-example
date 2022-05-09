
import './App.css';
import {BarChart} from './BarChart';
import {PieChart} from './PieChart';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bar Chart</h1>
        <BarChart />
        <h1>Pie Chart</h1>
        <PieChart />
      </header>
    </div>
  );
}

export default App;
