This is an automated testing project built with Playwright, a modern and reliable end-to-end testing library for web applications. The project aims to provide a comprehensive testing framework for web applications, covering various scenarios and test cases.

#### Features
- End-to-end testing with Playwright
- Parallel test execution
- Headless and headed mode support
- Comprehensive test reporting (HTML, JSON, JUnit)
- Test retries and failure handling
- Global setup and teardown
- Test fixtures and utilities
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile device emulation
- Environment variable configuration
- TypeScript support

#### Prerequisites
- Node.js (version specified in package.json)
- npm (comes bundled with Node.js)

## Installation
##### Clone the repository:
`git clone https://github.com/kwishna/playwright-test-runner.git`

#### Navigate to the project directory:
`cd playwright-test-runner`

#### Install the dependencies:
`npm install`

#### Running Tests
To run the tests, use the following command:
`npm test`
This will run all the tests in the src/tests directory.

#### Configuration
The project configuration is defined in the `playwright.config.ts` file. Here, you can customize various settings such as browser options, test reporters, test retries, and more.

#### Test Structure
The tests are organized in the `src/tests` directory. Each test file should have the `*.spec.ts` extension and follow the Playwright test structure.

#### Test Reporting
The project generates test reports in multiple formats (`HTML, JSON, JUnit`) after each test run. The reports are stored in the test-results directory.

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.