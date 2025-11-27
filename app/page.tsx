'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from './_context/AuthContext';
import DataTable from 'react-data-table-component';
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function Home() {
	const { verifyLogin } = useAuthContext();

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
			setFData(
				data.filter((entry: any) => entry.Diet_type == e.target.value)
			);
		}

		setDietType(e.target.value);
	};

	// CHECK IF LOGGED IN
	useEffect(() => {
		async function start() {
			let redirectPath = '';
			try {
				const email = localStorage.getItem('Z-USER-ACCOUNT');
				if (email) {
					let status = await verifyLogin(email);
					if (!status) {
						redirectPath = '/login';
					}
				} else {
					redirectPath = '/login';
				}
			} catch (e: any) {
				console.log(e);
			} finally {
				if (redirectPath) {
					redirect(redirectPath);
				}
			}
		}

		start();
	}, []);

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
			<Header></Header>

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

			<Footer></Footer>
		</div>
	);
}
