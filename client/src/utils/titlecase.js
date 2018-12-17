const titleCase = (str) => {

    str = str.toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());

        });

    // Step 4. Return the output
    return str.join(' '); // ["I'm", "A", "Little", "Tea", "Pot"].join(' ') => "I'm A Little Tea Pot"
}


export default titleCase; 