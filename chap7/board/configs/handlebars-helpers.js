module.exports = {
    lengthOfList : (list = []) => list.length,

    eq: (var1,var2) => var1 === var2,

    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};