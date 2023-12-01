export const SetLocalStorageItem = (key, value) => {
    const properties = localStorage.getItem("properties");
    if(properties){
        const parsedProperties = JSON.parse(properties);
        const obj = JSON.stringify({
            ...parsedProperties,
            [key]:value
        });
        localStorage.setItem("properties", obj);
        return true;
    }
    else return false;
}


export const GetLocalStorageItem = (key) => {
    const properties = localStorage.getItem("properties");
    if(properties){
        const parsedProperties = JSON.parse(properties);
        return parsedProperties[key];
    }
}