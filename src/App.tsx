import BookShelf from './modules/BookShelf/BookShelf';
import Filter from './components/Filter/Filter';
import Navigation from './components/Navigation/Navigation';
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
