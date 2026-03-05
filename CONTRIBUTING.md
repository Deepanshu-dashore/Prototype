# Contributing Guide

We welcome contributions! Follow these steps to get started:

## 🛠️ Getting the Code

1. **Fork** the repository.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/cc-matting.git
   cd cc-matting/Prototype
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```

## 📋 Development Workflow

- **Branching**: Create a new branch for each feature or bug fix.
  ```bash
  git checkout -b feature/awesome-feature
  ```
- **Commit messages**: Use conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`).
- **Testing**: Run the dev server (`pnpm dev`) and verify your changes.
- **Pull Request**: Push your branch and open a PR against `main`. Ensure all linting passes.

## ✅ Code Quality

- Follow the **project coding standards** outlined in [DEVELOPMENT.md](./DEVELOPMENT.md).
- Run `pnpm lint` (if configured) before committing.
- Write clear, descriptive comments where needed.

## 📚 Documentation

- Update the relevant markdown files (e.g., `README.md`, `API.md`) when adding new features.
- Keep the documentation in sync with the code.

## 🐞 Reporting Issues

- Use the **GitHub Issues** tab.
- Provide a clear description, steps to reproduce, and expected behavior.

Thank you for helping improve CC‑Matting! 🎉
