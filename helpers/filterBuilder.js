const generateFilters = async (filters,isLikeCondition = false,singleValue = null) => {
    const filtersArr = [];
    filters.forEach(currentFilter => {
        let objTemp = new Object();
        let value =  singleValue != null ? singleValue : currentFilter.value;
        value = isLikeCondition ? new RegExp(value,'i') : value;
        objTemp[currentFilter.column] = value;
        filtersArr.push(objTemp);
    });

    return filtersArr;
}

module.exports = {
    generateFilters
}