import './App.css'
import Weather from './Weather.jsx'
import News from './News.jsx'

function App() {
  return (
    <>
      <div className="headerBox">
        <header>
          <i> <h1> News & Weather Dashboard</h1></i>
        </header>
      </div>
            <div className="main-container">
        <div>
                <div className='weather-part'>
        <h1 style={{color:'black'}}>Weather </h1>
        <Weather />
      </div>
      
      </div>
     <div className='News-part'>
        <h1> <b> Top News </b> </h1>
        <News />
      </div>
 
      </div>
    </>
  )
}

export default App