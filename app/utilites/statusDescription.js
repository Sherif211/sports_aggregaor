function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function    statusDescription(description) {
    if (isNumeric(description))
        return description + '\'';
    if (description === 'HT')
        return 'HALF TIME';
    if (description==='FT')
        return 'FULL TIME';
    return description;
}

export default statusDescription;