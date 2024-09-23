
# Infinite Scroll Feed with React

This project showcases an **infinite scrolling feed** built using **React**. It fetches additional posts dynamically as the user scrolls down the page. The feed includes a loading spinner for better user experience and stops fetching when there are no more posts to load.

## Features

- **Infinite Scrolling**: New posts are loaded as the user scrolls.
- **API Integration**: Fetches posts from an API with pagination.
- **Loading Spinner**: Displays a loading spinner while fetching new data.
- **Debounce Optimization**: Scroll events are optimized with debounce to prevent unnecessary API calls.
- **Responsive Design**: Mobile-friendly and adaptable to different screen sizes.

## Demo

A live demo of the project can be hosted on platforms like **Netlify**, **Vercel**, or **GitHub Pages**.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/infinite-scroll-feed.git
   cd infinite-scroll-feed
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   Open `http://localhost:3000` in your browser to view the app.

## Usage

To integrate your own API, replace the placeholder URL in the `InfiniteScrollFeed.js` file with your actual API endpoint.

### API Integration

Replace this line in the code:

```javascript
const response = await fetch(`https://example.com/api/getPosts?page=${page}&size=${PAGE_SIZE}`);
```

With your actual API URL. Your API should support pagination with parameters for `page` and `size`.

### Expected API Response Format

Ensure your API returns data in this format:

```json
{
  "posts": [
    {
      "id": 1,
      "user": "John Doe",
      "text": "Post content goes here...",
      "imageUrl": "https://via.placeholder.com/150"
    },
    {
      "id": 2,
      "user": "Jane Doe",
      "text": "Another post...",
      "imageUrl": "https://via.placeholder.com/150"
    }
  ]
}
```

## Folder Structure

```bash
infinite-scroll-feed/
├── public/                     # Public assets (HTML file, favicon, etc.)
├── src/                        # Source code
│   ├── components/             # Reusable components
│   ├── InfiniteScrollFeed.js   # Main infinite scroll feed component
│   ├── InfiniteScrollFeed.css  # Styling for the component
│   └── index.js                # Entry point of the application
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Lock file for package versions
└── README.md                   # Project documentation
```

## Customization

- **Loading Spinner**: You can customize the loading spinner by modifying the CSS in `InfiniteScrollFeed.css`.
- **Post Layout**: Customize how posts are displayed by editing the `InfiniteScrollFeed.js` file.

## Optimizations

1. **Debounced Scrolling**: `lodash.debounce` is used to optimize scrolling performance by limiting the frequency of API requests while scrolling.
   
2. **Performance**: If the dataset is large, consider implementing techniques like **lazy loading images** and **caching posts** for smoother performance.

## Challenges & Considerations

- **Performance**: Continuous scrolling can degrade performance over time, especially with large datasets. Consider implementing caching and reducing the number of rendered posts.
- **Error Handling**: Ensure error handling is robust in case of API failure or network issues.
- **Mobile Responsiveness**: Test the feed on multiple devices to ensure optimal user experience on mobile screens.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing

Contributions are welcome! If you would like to contribute to this project, feel free to create an issue or submit a pull request.

## Contact

For any questions or support, please feel free to reach out via GitHub issues or email at **youremail@example.com**.
