# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# InstaStories

A performant and scalable Instagram-style stories viewer built with React and TypeScript. View the live demo at [deployment-link-here].

## 🚀 Live Demo


## ✨ Features
- Instagram-style story viewer
- Smooth transitions and animations
- Progress bar for story duration
- Touch/click navigation between stories
- Responsive design for all devices
- Optimized performance with lazy loading

## 🛠️ Tech Stack
- React 19
- TypeScript
- Vite
- Cypress for E2E testing

## 🏗️ Installation

1. Clone the repository:

```bash
git clone 
cd instaStories
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🧪 Testing

### Running E2E Tests
1. In headless mode (CI/CD):
```bash
npm run test:e2e
```

2. With Cypress GUI (recommended for development):
```bash
npm run cypress:open
```

## 🎯 Design Choices & Optimizations

### Performance Optimizations
1. **Lazy Loading**: Images are loaded only when needed using the native `loading="lazy"` attribute
2. **Progressive Loading**: Stories are fetched in batches to minimize initial load time
3. **Preloading**: Next story's content is preloaded while viewing the current story
4. **Memoization**: React.memo and useMemo for expensive computations
5. **Virtual Rendering**: Only visible stories are rendered in the DOM

### Scalability Considerations
1. **Modular Architecture**: Components are highly reusable and independent
2. **Type Safety**: TypeScript ensures code reliability at scale
3. **API Structure**: Ready for real backend integration with proper interfaces
4. **State Management**: Prepared for complex state with proper data flow
5. **Testing**: Comprehensive E2E tests ensure reliability

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Proper semantic HTML structure
- Color contrast compliance

## 📦 Build

To build for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
