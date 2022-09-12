import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
const Search = () => {
    const [search, setSearch] = useState(null);
    return (
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={ (e) => setSearch(e.target.value) }/>
    );
}

export default Search;