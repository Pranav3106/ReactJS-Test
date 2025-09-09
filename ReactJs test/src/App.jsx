import { Route, Routes } from 'react-router-dom';
import JobDetailsPage from './pages/JobDetailsPage';
import JobsPage from './pages/JobsPage';

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<JobsPage />} />
			<Route path="/job/:id" element={<JobDetailsPage />} />
		</Routes>
	)
}

export default App