import "./App.css";
import ImageSlider from "./components/imageslider";
import ResponsiveAppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <ImageSlider />
      {/* Other components or content */}
    </div>
  );
}

export default App;
