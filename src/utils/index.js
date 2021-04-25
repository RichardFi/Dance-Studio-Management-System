import { useEffect } from "react";

export const isFalsy = (value) => value === 0 ? false: !value

export const cleanObject = (object) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        if(isFalsy(value)){
            delete result[key];
        }
    })
    return result;
}

export const useMount = (callback) => {
    userEffect(() =>{
        callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() =>{
        // setTimeout when value changes
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // clearTimeout after the last useEffect
        return () => clearTimeout(timeout)
    }, [value, delay]);

    return debouncedValue;
}