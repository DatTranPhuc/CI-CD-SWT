/**
 * Test cases for HTML structure and content
 */
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('HTML Structure Tests', () => {
  let dom;
  let document;

  beforeAll(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    dom.window.close();
  });

  test('should have proper DOCTYPE declaration', () => {
    expect(dom.window.document.doctype.name).toBe('html');
  });

  test('should have html element with lang attribute', () => {
    const htmlElement = document.documentElement;
    expect(htmlElement.tagName.toLowerCase()).toBe('html');
    expect(htmlElement.getAttribute('lang')).toBe('en');
  });

  test('should have head section with required meta tags', () => {
    const head = document.head;
    expect(head).toBeTruthy();

    // Check charset
    const charset = head.querySelector('meta[charset]');
    expect(charset).toBeTruthy();
    expect(charset.getAttribute('charset')).toBe('UTF-8');

    // Check viewport
    const viewport = head.querySelector('meta[name="viewport"]');
    expect(viewport).toBeTruthy();
    expect(viewport.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
  });

  test('should have proper title', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('My CI/CD Test Site');
  });

  test('should have main heading with emoji', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('🎉');
    expect(h1.textContent).toContain('Hello from GitHub Pages!');
  });

  test('should have descriptive paragraph', () => {
    const paragraph = document.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain('first deployed website');
    expect(paragraph.textContent).toContain('GitHub Actions CI/CD');
  });

  test('should have proper body structure', () => {
    const body = document.body;
    expect(body).toBeTruthy();
    
    const h1 = body.querySelector('h1');
    const p = body.querySelector('p');
    
    expect(h1).toBeTruthy();
    expect(p).toBeTruthy();
  });

  test('should not have any broken elements', () => {
    // Check for any unclosed tags or malformed HTML
    const allElements = document.querySelectorAll('*');
    expect(allElements.length).toBeGreaterThan(0);
    
    // Check that all elements have proper structure
    allElements.forEach(element => {
      expect(element.tagName).toBeTruthy();
    });
  });
});
