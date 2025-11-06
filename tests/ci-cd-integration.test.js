/**
 * Test cases for CI/CD integration validation
 */
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('CI/CD Integration Tests', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    dom.window.close();
  });

  test('should have GitHub Pages deployment indicators', () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    expect(bodyText).toContain('github pages');
    expect(bodyText).toContain('deployed');
  });

  test('should have CI/CD process indicators', () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    expect(bodyText).toContain('actions');
    expect(bodyText).toContain('cicd');
  });

  test('should be ready for GitHub Pages deployment', () => {
    // Check for CNAME file (if exists)
    const cnamePath = path.resolve(__dirname, '../CNAME');
    const cnameExists = fs.existsSync(cnamePath);
    
    if (cnameExists) {
      const cnameContent = fs.readFileSync(cnamePath, 'utf8');
      expect(cnameContent.trim().length).toBeGreaterThan(0);
    }
    
    // HTML should be valid for static hosting
    const html = document.documentElement;
    expect(html).toBeTruthy();
  });

  test('should have proper title for GitHub Pages', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('CI/CD');
    expect(title.textContent).toContain('Test');
  });

  test('should have success message indicating deployment', () => {
    const h1 = document.querySelector('h1');
    expect(h1.textContent).toContain('Hello');
    expect(h1.textContent).toContain('GitHub Pages');
  });

  test('should have descriptive content about the deployment process', () => {
    const paragraph = document.querySelector('p');
    const text = paragraph.textContent.toLowerCase();
    
    expect(text).toContain('deployed');
    expect(text).toContain('website');
    expect(text).toContain('actions');
  });

  test('should be optimized for GitHub Pages hosting', () => {
    // No external dependencies
    const scripts = document.querySelectorAll('script[src]');
    const links = document.querySelectorAll('link[href]');
    
    expect(scripts.length).toBe(0);
    expect(links.length).toBe(0);
    
    // Should be a single HTML file
    const htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    expect(htmlContent.length).toBeLessThan(10000); // Reasonable size for GitHub Pages
  });

  test('should have proper meta tags for web deployment', () => {
    const charset = document.querySelector('meta[charset]');
    const viewport = document.querySelector('meta[name="viewport"]');
    
    expect(charset).toBeTruthy();
    expect(viewport).toBeTruthy();
    
    expect(charset.getAttribute('charset')).toBe('UTF-8');
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('should validate CI/CD workflow files exist', () => {
    const workflowPath = path.resolve(__dirname, '../.github/workflows');
    const workflowExists = fs.existsSync(workflowPath);
    
    if (workflowExists) {
      const files = fs.readdirSync(workflowPath);
      const ymlFiles = files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
      expect(ymlFiles.length).toBeGreaterThan(0);
    }
  });
});
