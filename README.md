# 💰 Investment Calculator

A modern, professional investment calculator built with Angular 20 that helps users project their investment growth over time with beautiful data visualization and comprehensive financial analysis.

![Angular](https://img.shields.io/badge/Angular-20.1.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=for-the-badge&logo=typescript)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-orange?style=for-the-badge&logo=chart.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.6-purple?style=for-the-badge&logo=bootstrap)

## ✨ Features

### 🎯 Core Functionality
- **Investment Projections** - Calculate compound interest with annual contributions
- **Real-time Calculations** - Instant updates as you modify inputs
- **Comprehensive Validation** - Smart form validation with helpful error messages
- **Multiple Scenarios** - Compare different investment strategies

### 📊 Data Visualization
- **Interactive Line Chart** - Visualize investment growth over time
- **Portfolio Distribution Pie Chart** - See final capital vs interest breakdown
- **Chart Export** - Download charts as PNG images
- **Responsive Charts** - Beautiful on all screen sizes

### 🎨 User Experience
- **Modern UI Design** - Professional gradient styling with smooth animations
- **Loading States** - Visual feedback during calculations
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Accessibility** - Full screen reader and keyboard navigation support

### ⚡ Performance
- **OnPush Change Detection** - Optimized rendering for better performance
- **Computed Properties** - Reactive calculations with signals
- **Lazy Loading** - Efficient component loading
- **Modern Angular Patterns** - Latest Angular best practices

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ibrahim-Hamada-Glab/investment-calaculator.git
   cd investment-calaculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🛠️ Development

### Available Scripts

```bash
# Development server
ng serve

# Build for production
ng build

# Run unit tests
ng test

# Run linting
ng lint

# Build with SSR
ng build --ssr
```

### Project Structure

```
src/
├── app/
│   ├── header/                 # Header component
│   ├── user-input/            # Form input component
│   ├── investment-chart/      # Chart visualization component
│   ├── investment-report/     # Results display component
│   ├── services/              # Business logic services
│   └── models/                # TypeScript interfaces
├── styles.css                 # Global styles
└── index.html                 # Main HTML file
```

## 🎯 How to Use

1. **Enter Investment Details**
   - Initial Investment Amount
   - Annual Contribution
   - Expected Annual Return (%)
   - Investment Period (years)

2. **View Results**
   - Investment summary cards with key metrics
   - Interactive growth chart
   - Portfolio distribution visualization
   - Detailed year-by-year breakdown table

3. **Export Data**
   - Download charts as images
   - Copy results for external use

## 🏗️ Architecture

### Components
- **App Component** - Main application container with state management
- **UserInput Component** - Reactive form with validation
- **InvestmentChart Component** - Chart.js integration for data visualization
- **InvestmentReport Component** - Results display with summary cards
- **Header Component** - Application header with branding

### Services
- **InvestmentCalculator Service** - Core business logic for calculations
  - Input validation
  - Compound interest calculations
  - Error handling
  - Utility methods

### Key Features
- **Reactive Forms** - Angular reactive forms with validation
- **Signals** - Modern Angular state management
- **OnPush Strategy** - Optimized change detection
- **TypeScript** - Strict typing throughout
- **Responsive Design** - Mobile-first approach

## 🎨 Design System

### Color Palette
- **Primary Green**: `#59C197` - Investment growth
- **Secondary Blue**: `#5962c1` - Interest earnings
- **Accent Red**: `#e74c3c` - Investment capital
- **Background**: Dark gradient with glassmorphism effects

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

## 📱 Responsive Design

- **Desktop**: Full-featured layout with side-by-side charts
- **Tablet**: Optimized grid layout with stacked components
- **Mobile**: Single-column layout with touch-friendly interactions

## ♿ Accessibility

- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Clear focus indicators
- **Color Contrast** - WCAG compliant color schemes
- **Semantic HTML** - Proper heading structure and landmarks

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run e2e tests
ng e2e
```

## 🚀 Deployment

### Build for Production
```bash
ng build --configuration production
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `ng build`
   - Output Directory: `dist/investment-calaculator`
3. Deploy automatically on every push

### Deploy to Netlify
1. Build the project: `ng build`
2. Drag the `dist/investment-calaculator` folder to Netlify
3. Configure redirects for Angular routing

## 📦 Dependencies

### Core Dependencies
- **Angular 20.1.0** - Framework
- **TypeScript 5.8.2** - Language
- **RxJS 7.8.0** - Reactive programming

### UI Dependencies
- **Bootstrap 5.3.6** - CSS framework
- **Chart.js** - Data visualization
- **ng2-charts** - Angular Chart.js wrapper

### Development Dependencies
- **Angular CLI 20.1.5** - Development tools
- **Karma** - Test runner
- **Jasmine** - Testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Chart.js** - For beautiful data visualization
- **Bootstrap** - For responsive design components
- **Google Fonts** - For the Inter font family

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Angular 20 and modern web technologies**