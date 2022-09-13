import { AsyncPaginate } from 'react-select-async-paginate';
import { useState } from 'react';
import { GEO_API_URL, geoOptions } from '../api';
const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (data) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${data}`,
            geoOptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    //这里名字必须是options！！！！
                    options: response.data.map(city => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    //得注意了，loadOptions需要[{label: "", value: ""}, {}, ...] label是显示在下拉条的，value是附带的值，选中之后value={选中的object}
    //这里onChange和loadOptions直接用e，或者写={handleOnchange}就行
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={(e) => handleOnChange(e)}
            loadOptions={(e) => loadOptions(e)} />
    );
}

export default Search;