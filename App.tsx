import { HomePage } from './src/HomePage';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <HomePage />
    </PaperProvider>
  );
}
