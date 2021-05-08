# Getting Started with hex-color-input app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setup requirement

Node & npm

# Starting the app

- `git clone https://github.com/ashikd/hex-color-input.git` to get the repo into local
- `cd hex-color-input && npm install` command installs the necessary packages
- `npm start` command will the application in http://localhost:3000

# Functionalities

1) 'master' branch does the necessary requirments:

    - takes input values of the color hex codes separated by space or semi-colon.

    - parses and creates link of the valid hex codes entered.

    - removes invalid codes and displays warning message of the removed values.

    - onClick of the links created launches modal window with the message and value selected.

2) 'show-color-picker' branch does the optional requirement:

      - `git checkout show-color-picker && npm start` will run this functionality.

      - onclick of the hexcode link opens the default color picker of the browser.

      - on changing values of the hex code from the color picker updates the selected input value.
