import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();

  // use memo buat menyimpan query
  return React.useMemo(() => new URLSearchParams(search, [search]));
};

// cara kedua untuk mengambil query dari url
// const useQuery = () => {
//   const [useParams] = useSearchParams();

//   return useParams;
// };

const Home = () => {
  return (
    <>
      <h1>Homepage</h1>
    </>
  );
};
const Categories = () => {
  const navigate = useNavigate();
  const query = useQuery();
  // query.get("page") -> untuk get query page di url ex: domain.com?page=4 maka akan menghasilkan 4
  console.log(query.get("page"));
  return (
    <>
      <h1>Categories</h1>
      <ul>
        <li>
          <Link to="/categories/312312">Categories satu</Link>
        </li>
        <li>
          <Link to="/categories/1233">Categories dua</Link>
        </li>
        <li>
          <button onClick={() => navigate("/")}>Kembali</button>
        </li>
      </ul>
    </>
  );
};

const CategoriesDetail = () => {
  const { id } = useParams();
  const { search } = useLocation();
  console.log(search);

  return (
    <>
      <h1>Categories id: {id}</h1>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<CategoriesDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
