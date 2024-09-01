import InvoiceForm from "./components/form/InvoiceForm.jsx";
import NewFooter from "./components/footer/Footer.jsx";
import Navbar from "./components/header/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto mt-16 mb-5 ">
        <InvoiceForm />
      </div>
      {/* <NewFooter /> */}
    </div>
  );
}

export default App;
