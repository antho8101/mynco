# 🤝 Contributing to Mynco

First off, **thank you** for considering contributing to Mynco! 🎉

We're building the future of professional client onboarding for freelancers, and every contribution helps make that vision a reality.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

---

## 🤗 Code of Conduct

This project adheres to a **Code of Conduct**. By participating, you're expected to uphold this code.

### Our Pledge
- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be patient** with newcomers
- **Be professional** in all interactions

### Unacceptable Behavior
- Harassment or discrimination of any kind
- Trolling, insulting, or inflammatory comments
- Public or private harassment
- Publishing others' private information

**Report issues:** [hello@mynco.app](mailto:hello@mynco.app)

---

## 🚀 How Can I Contribute?

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Check if it's already reported in [Issues](../../issues)
- Use our bug report template
- Include browser/OS information
- Add screenshots or screen recordings

### ✨ Feature Suggestions
Have an idea to improve Mynco?
- Check existing [Feature Requests](../../issues?q=is%3Aissue+label%3Aenhancement)
- Use our feature request template
- Explain the use case and benefits
- Include mockups if possible

### 🔧 Code Contributions
Ready to code? Awesome!
- Check [Good First Issues](../../issues?q=is%3Aissue+label%3A%22good+first+issue%22)
- Look for [Help Wanted](../../issues?q=is%3Aissue+label%3A%22help+wanted%22) issues
- Follow our development setup guide below

### 📚 Documentation
Help improve our docs!
- Fix typos or unclear explanations
- Add examples or tutorials
- Translate documentation
- Improve code comments

### 🎨 Design Contributions
Design skills? We need you!
- UI/UX improvements
- Icon design
- Illustration creation
- Accessibility audits

---

## 💻 Development Setup

### Prerequisites
```bash
# Required
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git

# Recommended VS Code Extensions
- Live Server
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
```

### Local Setup

1. **Fork & Clone**
   ```bash
   # Fork the repo on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/mynco.git
   cd mynco
   ```

2. **Development Server**
   ```bash
   # Option 1: VS Code Live Server (recommended)
   # Install "Live Server" extension
   # Right-click index.html → "Open with Live Server"
   
   # Option 2: Python
   python -m http.server 8000
   # Open http://localhost:8000
   
   # Option 3: Node.js
   npx live-server
   ```

3. **Project Structure**
   ```
   mynco/
   ├── index.html              # Landing page
   ├── assets/css/             # Stylesheets
   ├── assets/js/              # JavaScript
   ├── components/             # Reusable HTML
   ├── auth/                   # Authentication pages
   ├── dashboard/              # Dashboard pages
   └── client/                 # Client portal
   ```

### Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**
   - Follow our style guidelines
   - Test on multiple browsers
   - Keep commits focused and atomic

3. **Test thoroughly**
   ```bash
   # Manual testing checklist:
   ✅ Desktop browsers (Chrome, Firefox, Safari)
   ✅ Mobile responsiveness
   ✅ Accessibility (keyboard navigation)
   ✅ Loading performance
   ✅ Console errors check
   ```

4. **Commit with style**
   ```bash
   # Use conventional commits
   git commit -m "feat: add client portal authentication"
   git commit -m "fix: resolve mobile navigation issue"
   git commit -m "docs: update installation instructions"
   ```

---

## 🔄 Pull Request Process

### Before Submitting
- [ ] **Test your changes** thoroughly
- [ ] **Update documentation** if needed
- [ ] **Follow style guidelines**
- [ ] **Write descriptive commit messages**
- [ ] **Rebase on latest main** branch

### PR Template
When creating a PR, please include:

```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/refactoring
- [ ] Performance improvement

## 🧪 Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Mobile responsive
- [ ] No console errors

## 📸 Screenshots
(If applicable)

## 📋 Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated checks** run first
2. **Code review** by maintainers
3. **Testing** on different environments
4. **Merge** when approved

**Review time:** Usually 24-48 hours for small changes, longer for major features.

---

## 🎨 Style Guidelines

### HTML
```html
<!-- ✅ Good -->
<div class="hero-container">
    <h1 class="hero-title">Professional client portals</h1>
    <p class="hero-description">
        Transform your client delivery experience.
    </p>
</div>

<!-- ❌ Avoid -->
<div class="container1">
    <h1>title</h1><p>description</p>
</div>
```

### CSS
```css
/* ✅ Good - BEM-like naming */
.hero-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.hero-title {
    font-size: 48px;
    font-weight: 700;
    color: var(--text-dark);
}

/* ❌ Avoid - unclear naming */
.container1 { display: flex; }
.big-text { font-size: 48px; }
```

### JavaScript
```javascript
// ✅ Good - clear, documented
function initializeClientPortal(projectId) {
    const portal = document.getElementById('client-portal');
    
    if (!portal) {
        console.error('Portal container not found');
        return;
    }
    
    loadProjectData(projectId);
}

// ❌ Avoid - unclear, undocumented
function init(id) {
    let p = document.getElementById('cp');
    load(id);
}
```

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): description

feat: add client authentication system
fix: resolve mobile navigation overflow
docs: update README installation steps
style: improve button hover animations
refactor: simplify dashboard layout code
test: add validation for project creation
chore: update dependencies
```

### File Organization
```
assets/css/
├── globals.css          # Variables, reset, base
├── components.css       # Reusable components
├── landing.css          # Page-specific styles
└── dashboard.css        # Feature-specific styles

assets/js/
├── app.js              # Global utilities
├── auth.js             # Authentication logic
└── dashboard.js        # Dashboard functionality
```

---

## 🐛 Issue Reporting

### Bug Reports
Use our **Bug Report Template**:

```markdown
**🐛 Bug Description**
Clear description of the bug

**🔄 Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**✅ Expected Behavior**
What should happen

**❌ Actual Behavior**
What actually happens

**🖥️ Environment**
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 96]
- Device: [e.g. iPhone 13, Desktop]

**📸 Screenshots**
If applicable

**🔍 Additional Context**
Any other context about the problem
```

### Security Issues
**🚨 Do NOT create public issues for security vulnerabilities!**

Email: [security@mynco.app](mailto:security@mynco.app)
- We'll respond within 48 hours
- We'll work with you to fix the issue
- We'll credit you in our security acknowledgments

---

## 💡 Feature Requests

### Feature Request Template
```markdown
**🎯 Feature Summary**
Brief description of the feature

**🤔 Problem Statement**
What problem does this solve?

**💡 Proposed Solution**
How should this work?

**🎨 Design Ideas**
Any design mockups or ideas?

**📊 Success Criteria**
How do we know this feature is successful?

**🔧 Technical Considerations**
Any technical constraints or requirements?
```

### Evaluation Criteria
We evaluate features based on:
- **Impact:** How many users benefit?
- **Effort:** How complex is implementation?
- **Alignment:** Does it fit our product vision?
- **Resources:** Do we have capacity?

---

## 🌍 Community

### Communication Channels
- **GitHub Issues:** Technical discussions
- **GitHub Discussions:** General questions
- **Email:** [hello@mynco.app](mailto:hello@mynco.app)
- **Twitter:** [@myncoapp](https://twitter.com/myncoapp)

### Recognition
Contributors are recognized through:
- **Contributors page** on our website
- **GitHub contributor graph**
- **Social media shoutouts**
- **Beta access** to new features
- **Swag** for significant contributions (coming soon!)

### Mentorship
New to open source? We're here to help!
- Look for `good first issue` labels
- Ask questions in GitHub Discussions
- Join our contributor onboarding calls (monthly)

---

## 🎉 Thank You!

Every contribution, no matter how small, makes Mynco better for freelancers worldwide.

**Ready to contribute?**
1. 🍴 [Fork the repository](../../fork)
2. 🔍 [Browse open issues](../../issues)
3. 💬 [Join discussions](../../discussions)
4. 🚀 Start coding!

---

<div align="center">

**Questions? We're here to help!**

[![Email](https://img.shields.io/badge/Email-hello@mynco.app-00D084?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hello@mynco.app)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-181717?style=for-the-badge&logo=github&logoColor=white)](../../discussions)

**Happy coding! 🚀**

</div>