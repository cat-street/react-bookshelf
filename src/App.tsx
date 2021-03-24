import BookShelf from './modules/BookShelf/BookShelf';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <BookShelf />
    </div>
  );
}

export default App;
