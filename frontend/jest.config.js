module.exports = {
    moduleNameMapper: {
      // Mock the Message component import in CartScreen.js
      '^../components/Message$': '<rootDir>/src/__mocks__/MessageMock.js',
    },
  };
  