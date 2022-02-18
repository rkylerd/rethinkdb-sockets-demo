import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import SongList from '../components/SongList'
import { Song } from '../types/song'

const search = async (searchTerm = "") =>
    await axios.get(`api/song/${encodeURIComponent(searchTerm.replace(/\s/g, "+"))}`);

const Search = () => {
    const [searchResults, setResults] = useState<Song[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const url = new URL(window.location.toString());
        const query = url.searchParams.get("q") || "john mayer";
        if (query) {
            (async () => await updateSearchResults(null, query))();
            setSearchTerm(query);
        }
    }, []);

    const updateSearchResults = async (e: FormEvent | null, overrideSearchTerm = '') => {
        e?.preventDefault();
        const query = searchTerm || overrideSearchTerm;
        if (!query) return;
        setLoading(true);

        try {
            const url = new URL(window.location.toString());
            url.searchParams.set("q", query);
            window.history.pushState({}, '', url);

            const { data: { results = [] } } = await search(query);
            setResults(results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div>

            <h1>Search Results</h1>
            <form onSubmit={updateSearchResults}>
                <input tabIndex={1} type="search" value={searchTerm} onChange={({ currentTarget: { value } }) => setSearchTerm(value)} />
                <button tabIndex={1} type="submit">Search</button>
            </form>

            {loading ? <h4>loading...</h4> :
                <SongList songs={searchResults} />
            }

        </div>
    )
}

export default Search;
