import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { searchMovie, reset } from "../reducers/movieSlice";
import MovieCards from "./MovieCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchMovies = () => {
	const movies = useSelector((state) => state.movies);
	const dispatch = useDispatch();

	const [movieToSearch, setMovieToSearch] = useState("");

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		const getData = setTimeout(() => {
			const apiCall = async () => {
				const url = import.meta.env.VITE_URL_SEARCH_ALL + movieToSearch;
				const rawData = await fetch(url);
				const json = await rawData.json();
				dispatch(searchMovie(json.Search));
			};
			apiCall();
		}, 1000);
		return () => clearTimeout(getData);
	}, [movieToSearch]);

	const resetInput = () => {
		dispatch(reset());
		setMovieToSearch("");
	};

	return (
		<div className="flex-col">
			<div className="bg-[#3B3D47] flex justify-between items-center sticky top-20 z-20">
				<input
					className="w-full h-28 bg-[#3b3d47] text-5xl text-white pl-14 font-bold focus:outline-none"
					type="text"
					placeholder="Search by title"
					onChange={(e) => setMovieToSearch(e.target.value)}
					value={movieToSearch}
				/>
				{movieToSearch && (
					<button
						className="w-[200px] text-2xl text-white"
						onClick={() => resetInput()}>
						<FontAwesomeIcon />
					</button>
				)}
			</div>
			<div className="flex gap-5 flex-wrap justify-center my-5">
				{movies?.map((movie) => (
					<MovieCards movie={movie} />
				))}
			</div>
		</div>
	);
};

export default SearchMovies;
