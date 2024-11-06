import { HomePage } from './src/HomePage';
import { PaperProvider } from 'react-native-paper';
import { HomePage2 } from './src/HomePage2';

export default function App() {
  return (
    <PaperProvider>
      <HomePage2 />
    </PaperProvider>
  );
}
