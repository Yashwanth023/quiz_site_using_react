
# QuizWhirl - Interactive Knowledge Testing Platform

## Overview
QuizWhirl is an engaging quiz application designed to test and enhance your knowledge through interactive questions. With a beautiful user interface and smooth user experience, QuizWhirl makes learning fun and engaging.

## Features

### User Authentication
- Simple email and password registration
- Secure login system
- Persistent user sessions
- Easy logout functionality

### Quiz Experience
- Dynamic question rendering
- Multiple-choice questions with instant feedback
- Timer for each question (30 seconds)
- Visual feedback for correct and incorrect answers
- Progress tracking during quiz
- Beautiful UI with gradient backgrounds

### Performance Tracking
- Real-time score calculation
- Detailed performance metrics
  - Questions answered correctly
  - Average time per question
  - Overall quiz completion percentage
- Historical attempt tracking
- Performance statistics visualization

### User Interface
- Responsive design for all devices
- Beautiful gradient backgrounds
- Intuitive navigation
- Clean and modern UI components
- Toast notifications for user feedback
- Loading states and animations

### Technical Features
- Built with modern React and TypeScript
- Local storage for user data persistence
- Client-side routing
- IndexedDB for storing quiz attempts
- Real-time progress tracking
- Modular component architecture

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Router for navigation
- Tanstack Query for data management

### State Management
- React Context for global state
- Local Storage for persistence
- IndexedDB for attempt history

### UI/UX
- Lucide React for icons
- Toast notifications
- Progress indicators
- Responsive layouts
- Interactive animations

## Performance Features
- Optimized rendering
- Efficient state updates
- Smooth transitions
- Instant feedback system
- Responsive design principles

## Security Features
- Protected routes
- Session management
- Secure user authentication
- Data persistence

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open `http://localhost:5173` in your browser

## Usage

1. Create an account or login
2. Start the quiz
3. Answer questions within the time limit
4. Get instant feedback on your answers
5. View your final score and statistics
6. Track your progress over time

## Project Structure

```
src/
  ├── components/      # Reusable UI components
  ├── contexts/        # React contexts
  ├── data/           # Quiz questions and static data
  ├── hooks/          # Custom React hooks
  ├── pages/          # Main application pages
  ├── services/       # Service layers
  └── utils/          # Utility functions
```

## Future Enhancements
- Multiple quiz categories
- Difficulty levels
- Social sharing features
- Leaderboards
- Achievement system
- Custom quiz creation
- Mobile app version
- Real-time multiplayer mode
- Advanced analytics dashboard
- PDF export of results
- Integration with learning platforms

## Contributing
We welcome contributions! Feel free to submit pull requests or create issues for any bugs or feature requests.
