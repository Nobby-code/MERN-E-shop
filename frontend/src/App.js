import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import products from './products'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* <HomeScreen /> */}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
