import React, { useMemo, useState, useRef, useEffect } from 'react';
import StoresContext from '../StoresContext';

/**
 * useStores
 * @return {[type]} [description]
 */
const useStores = () => React.useContext(StoresContext);

/**
 * [React hook that is most commonly used for search in UI e.g. List Search]
 * @param  {[Object]}   data        [Original Data to Search]   : Required
 * @param  {[Function]} fnFilter    [Filter function: 1st Parameter : Data, 2nd Parameter : filter] : Required
 * @param  {[Object]}   initialFilter [Initial Filter Object] Can be empty
 * @param  {[Number]}   timeout     [Search Timeout : Default 300]
 * @return {[Array]}                [1st element is filteredData, 2nd element is filterChangeCallback]
 */
function useSearch(data, fnFilter, initialFilter, timeout){
    const [filter, setFilter] = useState(initialFilter);
    const timeoutRef = useRef();

    const filteredData = useMemo(() => fnFilter(data, filter), [data, filter]);

    useEffect(
        () => {
            return () => {
                clearTimeout(timeoutRef.current);
            }
        }
    );

    function onFilterChange(newFilter){
        // ClearOut timer for previous handler.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setFilter(newFilter);
        }, timeout || 300 );
    }

    return [ filteredData, onFilterChange ];
}


export { useStores, useSearch };
