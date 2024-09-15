# Mentor-Lab Platform

Mentor-Lab is a web-based platform designed to facilitate collaboration between students and mentors, particularly focused on guiding students through the process of writing their bachelor theses. With features like real-time chat, personalized mentor suggestions using AI, and a dashboard for managing teams, Mentor-Lab streamlines the communication and organizational aspects of academic mentorship.

## Features

- **User Registration & Authentication**

  - Users can create student accounts, while professors require a special invitation from an administrator for access.
  - Secure authentication managed by [NextAuth.js](https://authjs.dev/).

- **Profile Management & CV Upload**
  - Professors can upload their CVs, which are processed using AI to extract relevant information for matching students to mentors.
- **Dashboard**

  - The dashboard provides an overview of all users and their roles, allowing easy filtering and contact initiation.

- **Mentor Application System**

  - Students can apply to join a mentor's team by submitting a project proposal. Mentors can view and accept or reject applications.

- **Real-time Communication**

  - A chat system powered by [Pusher](https://pusher.com/docs) allows students and mentors to communicate seamlessly.

- **AI-powered Mentor Suggestions**

  - A chatbot integrated with OpenAI's GPT-3.5 suggests suitable mentors based on the student’s project requirements and mentor expertise.

- **Notifications**
  - Users receive real-time notifications for new messages, mentor applications, and more, ensuring quick responses and efficient collaboration.

## Technologies Used

- **Next.js**: Framework for both front-end and back-end, enabling server-side rendering and static site generation.
- **Prisma ORM**: Used for efficient database interactions with MongoDB.
- **MongoDB**: NoSQL database for flexible and scalable data management.
- **AWS**: Utilized for cloud file storage via Amazon S3.
- **OpenAI**: Provides AI-driven mentor recommendations using GPT-3.5 Turbo.
- **Pinecone**: Vector database for handling embeddings and improving AI search efficiency.
- **Pusher**: Real-time communication framework used for the chat system.
- **Tailwind CSS**: For flexible and modular design components.
- **SWR**: Optimizes data fetching with a Stale-While-Revalidate caching strategy.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/docs)
- [MongoDB](https://www.mongodb.com/docs)
- [AWS S3](https://aws.amazon.com/s3/)
- OpenAI API key
- Pinecone API key
- Pusher credentials

## Future Improvements

- **Sentiment Analysis**: Adding AI-driven sentiment analysis for user interactions with the chatbot to enhance the user experience.
- **Performance Optimization**: Implement advanced caching and scaling techniques to improve responsiveness and overall efficiency.
- **Extended Features**: Expand with more features, including user feedback collection and enhanced mentor-student matchmaking.

## Demo

Check out the demo video below:

[![Watch the demo video](https://github.com/FlorinCamarut1/licenta-Mentor-Lab/raw/main/public/thumbnail.png)](https://youtu.be/xzz0hCUR-0w)

## Conclusion

This platform aims to improve the process of writing a bachelor's thesis by offering effective communication tools, AI-powered mentor suggestions, and a user-friendly interface for both students and mentors.
