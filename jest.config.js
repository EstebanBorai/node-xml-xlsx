module.exports = {
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
  preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true
};
