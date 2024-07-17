import StarIcon from './assets/star.svg?react'
import './styles.css'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'

function App() {
  return (
    <>
      <Header />
      <main>
        <input placeholder="Search for restaurants" />
        <section></section>
      </main>
      <Footer />
    </>
  )
}

export default App
