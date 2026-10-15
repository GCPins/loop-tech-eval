# Loop Technical Evaluation
This repository contains all the relevant files for my Loop technical evaluation.  

The purpose of this technical evaluation was to create a data-driven test suite for a set of Login Automation test scenarios in the provided application.

## Instructions
First, copy the `.env.example` file into a `.env` file and fill the following fields with the appropriate values:  
```txt
APP_URL=https://app_url.goes.here

APP_USERNAME=username_goes_here
APP_PASSWORD=password_goes_here
```

Next, install the project dependencies with `pnpm install`. On Fedora, run Playwright through the `pw` community wrapper:
```sh
# Run the Playwright tests
pw test

# View the latest HTML report
pw show-report

# Alternatively, run the tests in UI mode
pw test --ui
```
