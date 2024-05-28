import logo from './logo.svg';
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './Components/Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Address from './Components/Cart/Address/Address';
import Orders from './Components/Orders/Orders';
import { Provider } from 'react-redux';
import store from './redux/Store';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import ForgotPasswords from './Components/ForgotPasswords/ForgotPasswords';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';

function App() {

  let queryClient = new QueryClient()
  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Navigate to={'home'} /> },
        { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forgotpassword', element: <ForgotPasswords /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'verifyresetcode', element: <VerifyResetCode /> },
        { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        {
          path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute>, children: [
            { path: 'brands/:id', element: <ProtectedRoute> <BrandProducts /> </ProtectedRoute> },
          ]
        },
        {
          path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute>, children: [
            { path: 'categories/:id', element: <ProtectedRoute> <CategoryProducts /> </ProtectedRoute> },
          ]
        },
        { path: 'address/:cartId', element: <ProtectedRoute> <Address /> </ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={routers}>
          </RouterProvider>
        </AuthContextProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Provider>


  )

}

export default App;
