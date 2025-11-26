'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Home() {
	function capitalizeFirstLetter(val: string) {
		return String(val).charAt(0).toUpperCase() + String(val).slice(1);
	}

	const colums = [
		{
			name: 'Type',
			selector: (row) => capitalizeFirstLetter(row.Diet_type),
			sortable: true,
		},
		{
			name: 'Name',
			selector: (row) => row.Recipe_name,
			sortable: true,
		},
		{
			name: 'Cusine Type',
			selector: (row) => capitalizeFirstLetter(row.Cuisine_type),
			sortable: true,
		},
		{
			name: 'Protein(g)',
			selector: (row) => row['Protein(g)'],
			sortable: true,
			width: '150px',
		},
		{
			name: 'Carbs(g)',
			selector: (row) => row['Carbs(g)'],
			sortable: true,
			width: '150px',
		},
		{
			name: 'Fat(g)',
			selector: (row) => row['Fat(g)'],
			sortable: true,
			width: '150px',
		},
	];

	const [data, setData] = useState([]);
	const [fData, setFData] = useState([]);
	const [dietType, setDietType] = useState('all');

	const handleDietChange = (e) => {
		console.log(dietType);

		if (e.target.value == 'all') {
			setFData(data);
		} else {
			setFData(data.filter((entry) => entry.Diet_type == e.target.value));
		}

		setDietType(e.target.value);
	};

	useEffect(() => {
		fetch('https://nutritional-functions.azurewebsites.net/api/getall')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((json) => {
				setData(json);
				setFData(json);
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	return (
		<div className="bg-gray-100">
			<header className="bg-blue-600 p-4 text-white">
				<h1 className="text-3xl font-semibold">Nutritional Insights</h1>
			</header>

			<main className="container mx-auto p-6">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						Explore Nutritional Insights
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-white p-4 shadow-lg rounded-lg">
							<h3 className="font-semibold">Bar Chart</h3>
							<p className="text-sm text-gray-600">
								Average macronutrient content by diet type.
							</p>
							<img src="https://nutritional-functions.azurewebsites.net/api/images/barchart" />
						</div>

						<div className="bg-white p-4 shadow-lg rounded-lg">
							<h3 className="font-semibold">Scatter Plot</h3>
							<p className="text-sm text-gray-600">
								Nutrient relationships (e.g., protein vs carbs).
							</p>
							<img src="https://nutritional-functions.azurewebsites.net/api/images/scatterplot" />
						</div>

						<div className="bg-white p-4 shadow-lg rounded-lg">
							<h3 className="font-semibold">Heatmap</h3>
							<p className="text-sm text-gray-600">
								Nutrient correlations.
							</p>
							<img src="https://nutritional-functions.azurewebsites.net/api/images/heatmap" />
						</div>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						Filters and Data Interaction
					</h2>
					<div className="flex flex-wrap gap-4">
						<select
							value={dietType}
							onChange={handleDietChange}
							className="p-2 border rounded w-full sm:w-auto"
						>
							<option value="all">All Diet Types</option>
							<option value="vegan">Vegan</option>
							<option value="keto">Keto</option>
							<option value="paleo">Paleo</option>
							<option value="mediterranean">Mediterranean</option>
							<option value="dash">Dash</option>
						</select>
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Pagination</h2>
					<DataTable
						columns={colums}
						data={fData}
						pagination
						title="Nutritional Data"
					/>
				</section>
			</main>

			<footer className="bg-blue-600 p-4 text-white text-center mt-10">
				<p>&copy; 2025 Nutritional Insights. All Rights Reserved.</p>
			</footer>
		</div>
	);
}
