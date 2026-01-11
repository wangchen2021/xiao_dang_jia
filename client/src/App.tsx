import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import NormalizeStyles from './styles/NormalizeStyles';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NormalizeStyles></NormalizeStyles>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  )
}

export default App
