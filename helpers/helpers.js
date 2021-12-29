// Convert any word to titlecase
const titleCase = (word = "") => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

// Dehyphenate a hyphenated word
const dehyphenate = (hyphenatedWord) => {
	return hyphenatedWord
		.split("-")
		.map((word) => titleCase(word))
		.join(" ");
};

// Read files asynchronously
const readFileAsync = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = reject;

		reader.readAsText(file);
	});
};

export { dehyphenate, titleCase, readFileAsync };
