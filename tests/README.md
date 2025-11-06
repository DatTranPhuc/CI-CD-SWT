# Web Testing Suite

Đây là bộ test cases cho phần web của dự án CI/CD.

## Cấu trúc Test Cases

### 1. `html-structure.test.js`
- Kiểm tra cấu trúc HTML cơ bản
- Validate DOCTYPE, meta tags, heading hierarchy
- Kiểm tra tính hợp lệ của HTML

### 2. `content.test.js`
- Kiểm tra nội dung trang web
- Validate CI/CD related content
- Kiểm tra không có placeholder text

### 3. `accessibility.test.js`
- Kiểm tra accessibility compliance
- Validate heading hierarchy
- Kiểm tra proper document structure

### 4. `performance.test.js`
- Kiểm tra performance và optimization
- Validate file size, DOM elements
- Kiểm tra không có external dependencies

### 5. `ci-cd-integration.test.js`
- Kiểm tra CI/CD integration
- Validate GitHub Pages deployment
- Kiểm tra workflow files

## Cách chạy Tests

```bash
# Cài đặt dependencies
npm install

# Chạy tất cả web tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests với watch mode
npm run test:watch

# Chạy cả Java và web tests
npm run test:all

# Chỉ chạy Java tests
npm run test:java
```

## Test Coverage

Tests này cover:
- ✅ HTML structure validation
- ✅ Content validation
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ CI/CD integration
- ✅ GitHub Pages deployment readiness

## Dependencies

- **Jest**: Test framework
- **jsdom**: DOM simulation
- **@testing-library/jest-dom**: Custom matchers
- **@testing-library/dom**: DOM testing utilities
- **puppeteer**: Browser automation (for future use)
