import CharacterCounter from './components/CharacterCounter'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <CharacterCounter 
        minWords={10}
        maxWords={500}
        targetReadingTime={5}
      />
    </div>
  )
}

export default App
