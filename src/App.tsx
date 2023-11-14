import '@/scss/App.scss'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
// import Button from './components/Button'
import ArrowUp from "@/assets/img/arrow-top.svg"
function App() {
  const category = ["All", "Vegeterian", "Protein"]
  return (
    <div className='app'>
      <Header />
      <div className="top-section">
        <ul className='categories'>
        {category.map(el =>
        <li className="categories-btn" key={el}>{el}</li>
        )}
        </ul>

        <div className="sort-wrapper">
          <div className="sort">
            <img src={ArrowUp} alt="arrow up" />
            <span className='sort__text'>Сортировка по: </span>
            <span className='sort__choice'>популярности</span>
          </div>
          <div className="sort-popup">
            <ul>
              <li>dsfsf</li>
              <li>dsfsf</li>
              <li>dsfsf</li>
            </ul>
          </div>
        </div>

      </div>
      <Routes>
        {/* <Route path="/" element={}></Route> */}
      </Routes>
      
      
    </div>
  )
}

export default App
