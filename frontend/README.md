# Tech Stack Comparison Component

This project contains a React component that provides an interactive comparison of different tech stacks, focusing on speed, cost-effectiveness, and security.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (version 14.0.0 or later) and npm.
* You have a basic understanding of React and TypeScript.

## Setting up the projec

This frontend project is using Vite + React.

## Customizing the Table component

To customize the component:

* Modify the `tablesData` and `summaries` objects in `TechStackComparison.tsx` to change the displayed data.
* Adjust the Tailwind CSS classes to change the styling.
* Add or remove columns in the table by modifying the table header and row rendering logic.

## Adding the component

1. Create a new file `src/TechStackComparison.tsx` and copy the provided component code into this file.

2. Update `src/App.tsx` to use the new component:

  ``` tsx
  import React from 'react';
  import TechStackComparison from './TechStackComparison';

  function App() {
    return (
      <div className="App">
        <TechStackComparison />
      </div>
    );
  }

  export default App;
  ```

* You have installed Node.js and npm (Node Package Manager).
* You have a Claude API key from Anthropic.

## Setting up the project (Chat)

Follow these steps to set up and run the project:

1. Clone this repository to your local machine:

  ``` bash
  git clone https://github.com/yourusername/react-claude-chat.git
  cd react-claude-chat
  ```

2. Install the project dependencies:

  ``` bash
  npm install
  ```

3. Create a `.env` file in the root directory of the project and add your Claude API key:

  ``` .env
  REACT_APP_CLAUDE_API_KEY=your_api_key_here
  ```

   Replace `your_api_key_here` with your actual Claude API key.

4. Open the `src/components/ChatInterface.js` file and replace the API key placeholder with the environment variable:

   ```javascript
   'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY
   ```

## Running the application

To run the application, use the following command in the project directory:

``` bash
npm run dev
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for production

To build the app for production, run:

``` bash
npm run build
```

This will create a `build` directory with a production build of your app.

## Customizing the application

* To change the chat interface design, modify the CSS in `src/components/ChatInterface.js` or create a separate CSS file.
* To add more features or modify the chat logic, edit the `ChatInterface` component in `src/components/ChatInterface.js`.

## Security Considerations

Remember that in a production environment, you should never expose your API key in the frontend code. Instead, set up a backend server to handle API requests and keep your API key secure.

## Troubleshooting

If you encounter CORS issues when making requests to the Claude API, you may need to set up a proxy server or use a CORS proxy service for development purposes.

## Contributing to the project

To contribute to the project:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them with clear, concise commit messages.
4. Push your changes to your fork.
5. Create a pull request with a detailed description of your changes.

## Contact

If you have any questions or feedback, please open an issue in the project repository.
