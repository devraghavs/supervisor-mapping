import "./App.css";
import "../src/styles/common.css";
import Footer from "./components/organisms/footer/Footer";
import Header from "./components/organisms/header/Header";
import Table from "./components/organisms/masterTable/table";
function App() {
  return (
    /** @description:- Individual Component rendering */
    <div className="App">
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
