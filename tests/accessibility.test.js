/**
 * Test cases for accessibility compliance
 */
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Accessibility Tests', () => {
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

  test('should have proper heading hierarchy', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    
    // Should not have h2, h3, etc. without h1
    const h2 = document.querySelector('h2');
    const h3 = document.querySelector('h3');
    expect(h2).toBeFalsy();
    expect(h3).toBeFalsy();
  });

  test('should have meaningful heading text', () => {
    const h1 = document.querySelector('h1');
    expect(h1.textContent.trim().length).toBeGreaterThan(0);
    expect(h1.textContent).not.toBe('');
  });

  test('should have proper document structure', () => {
    const html = document.documentElement;
    const head = document.head;
    const body = document.body;
    
    expect(html).toBeTruthy();
    expect(head).toBeTruthy();
    expect(body).toBeTruthy();
  });

  test('should have proper meta information', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim().length).toBeGreaterThan(0);
    
    const charset = document.querySelector('meta[charset]');
    expect(charset).toBeTruthy();
  });

  test('should have proper language declaration', () => {
    const html = document.documentElement;
    const lang = html.getAttribute('lang');
    
    expect(lang).toBeTruthy();
    expect(lang).toBe('en');
  });

  test('should have proper viewport configuration', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).toBeTruthy();
    
    const content = viewport.getAttribute('content');
    expect(content).toContain('width=device-width');
    expect(content).toContain('initial-scale=1.0');
  });

  test('should not have empty elements', () => {
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      // Skip script and meta tags
      if (['script', 'meta', 'title'].includes(element.tagName.toLowerCase())) {
        return;
      }
      
      // Check if element has content or is self-closing
      if (element.textContent.trim() === '' && !element.selfClosing) {
        // Allow empty elements that are structural
        const allowedEmpty = ['html', 'head', 'body', 'div', 'span'];
        if (!allowedEmpty.includes(element.tagName.toLowerCase())) {
          console.warn(`Empty element found: ${element.tagName}`);
        }
      }
    });
  });

  test('should have proper content structure', () => {
    const body = document.body;
    const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = body.querySelectorAll('p');
    
    expect(headings.length).toBeGreaterThan(0);
    expect(paragraphs.length).toBeGreaterThan(0);
  });
});
