# Analogy

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-blue)](https://developers.cloudflare.com/pages/)

**Analogy** is a website designed to easily generate analogies to explain something to someone, where you're the expert in your field. Built using SvelteKit and deployed on Cloudflare Pages, the site leverages Cloudflare's D1 database and AI bindings to deliver content.

## 🚀 Features

- **SvelteKit Framework**: Powered by SvelteKit, offering a responsive and snappy user experience.
- **Cloudflare Pages**: Hosted on Cloudflare Pages, ensuring fast and secure global delivery.
- **Cloudflare D1**: Utilizes Cloudflare's D1 serverless database to store analogies.
- **AI Bindings**: Integrates Cloudflare's AI bindings to craft clever analogies.

## 🌐 Live Site

Check out the app at [https://analogy.cloud](https://analogy.cloud)

## 🛠️ Getting Started

### Prerequisites

Before getting started, make sure you have:

- [Node.js](https://nodejs.org/) (v20.x or later)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jonasclaes/analogy.git
   cd analogy
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173) to see the app in action.

### Deploying

1. **Build for Production**:

   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**:

   Deploy the app with:

   ```bash
   wrangler pages publish ./build
   ```

   Or set up continuous deployment via Cloudflare Pages, linked to this GitHub repository.

## 🤝 Contributing

We welcome contributions! Please feel free to open a Pull Request or submit issues.

## 📄 License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for more information.

## 📧 Contact

For any questions or feedback, reach out to [jonasclaes](https://github.com/jonasclaes) at [jonas@jonasclaes.be](mailto:jonas@jonasclaes.be).
