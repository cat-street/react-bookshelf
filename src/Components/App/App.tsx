import BookShelf from '../BookShelf/BookShelf';
import Filter from '../Filter/Filter';
import Navigation from '../Navigation/Navigation';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Filter />
      <BookShelf />
    </div>
  );
}

export default App;
