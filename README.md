# Loop Technical Evaluation
This repository contains all the relevant files for my Loop technical evaluation.  

The purpose of this technical evaluation was to create a data-driven test suite for a set of Login Automation test scenarios in the provided application.  

Demo Video: https://youtu.be/lG2BPf9EirI

## Instructions
First, copy the `.env.example` file into a `.env` file and fill the following fields with the appropriate values:  
```txt
APP_URL=https://app_url.goes.here

APP_USERNAME=username_goes_here
APP_PASSWORD=password_goes_here
```

Next, please ensure you have installed Node.js v24 (LTS) and the latest version of pnpm and Playwright. Then, you can run the playwright tests (present in the `./tests/` directory) with the following command:  
```sh
# run the playwright tests through the CLI
pnpm exec playwright test
# then, view the results of the latest run
pnpm exec playwright show-report


# alternatively, you can run the tests in UI mode
pnpm exec playwright test --ui
```
