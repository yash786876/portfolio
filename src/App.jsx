import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AboutMe from './pages/AboutMe.jsx'
import AppsIBuilt from './pages/AppsIBuilt.jsx'
import FinanceGeek from './pages/FinanceGeek.jsx'
import DeepTech from './pages/DeepTech.jsx'
import MovieRecommendations from './pages/MovieRecommendations.jsx'
import BooksRecommendations from './pages/BooksRecommendations.jsx'
import FundMyMBA from './pages/FundMyMBA.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/apps" element={<AppsIBuilt />} />
          <Route path="/finance-geek" element={<FinanceGeek />} />
          <Route path="/deep-tech" element={<DeepTech />} />
          <Route path="/movies" element={<MovieRecommendations />} />
          <Route path="/books" element={<BooksRecommendations />} />
          <Route path="/fund-my-mba" element={<FundMyMBA />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
