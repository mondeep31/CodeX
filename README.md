# CodeX - Collaborative Coding Platform

CodeX is a real-time collaborative coding platform that allows users to create and join coding sessions, share code, and communicate via chat and video calls. This application is built using React for the frontend and Socket.IO for real-time communication.

## Features

- **Real-time Collaboration**: Multiple users can join the same coding session and collaborate in real-time.
- **Chat Functionality**: Users can send messages to each other while coding.
- **Video Call Support**: Users can initiate video calls to discuss code and collaborate more effectively.
- **Code Execution**: Users can execute code snippets in various programming languages and see the output in real-time.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO
- **Database**: (If applicable, mention the database used)
- **APIs**: (If applicable, mention any external APIs used)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mondeep31/codex.git
   cd codex
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the backend server:

   - Navigate to the server directory (if applicable) and install dependencies.
   - Configure environment variables as needed (e.g., database connection strings, API keys).

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. **Creating a Room**: Users can create a new room by entering a room name and their username.
2. **Joining a Room**: Users can join an existing room by entering the room ID and their username.
3. **Collaborating**: Once in a room, users can share code, chat, and initiate video calls.
4. **Executing Code**: Users can write code in the editor and execute it to see the output.

## Code Structure

- `client/`: Contains the frontend codebase.
  - `src/components/`: Contains React components for the application.
  - `src/socket.js`: Socket.IO client setup for real-time communication.
- `server/`: Contains the backend codebase.
  - `controller/`: Contains socket event handlers and business logic.
  - `config/`: Configuration files for the server.
  - `types/`: TypeScript type definitions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the open-source community for their support.
- Special thanks to the libraries and frameworks used in this project.
