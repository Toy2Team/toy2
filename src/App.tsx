import GlobalStyle from '@/styles/globalStyle';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@/router/routes';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
