/**
 * Test cases for performance and optimization
 */
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Performance Tests', () => {
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

  test('should have minimal HTML size', () => {
    const htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    
    // HTML should be lightweight (less than 5KB)
    expect(htmlContent.length).toBeLessThan(5000);
    expect(htmlContent.length).toBeGreaterThan(100);
  });

  test('should not have external dependencies', () => {
    const scripts = document.querySelectorAll('script[src]');
    const links = document.querySelectorAll('link[href]');
    const images = document.querySelectorAll('img[src]');
    
    // Should not have external scripts, stylesheets, or images
    expect(scripts.length).toBe(0);
    expect(links.length).toBe(0);
    expect(images.length).toBe(0);
  });

  test('should have minimal DOM elements', () => {
    const allElements = document.querySelectorAll('*');
    
    // Should have reasonable number of elements (not too many)
    expect(allElements.length).toBeLessThan(50);
    expect(allElements.length).toBeGreaterThan(5);
  });

  test('should not have inline styles or scripts', () => {
    const elementsWithStyle = document.querySelectorAll('[style]');
    const inlineScripts = document.querySelectorAll('script:not([src])');
    
    expect(elementsWithStyle.length).toBe(0);
    expect(inlineScripts.length).toBe(0);
  });

  test('should have proper document structure for fast parsing', () => {
    const html = document.documentElement;
    const head = document.head;
    const body = document.body;
    
    // Basic structure should be present
    expect(html).toBeTruthy();
    expect(head).toBeTruthy();
    expect(body).toBeTruthy();
    
    // Head should come before body
    expect(head.compareDocumentPosition(body) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  test('should have minimal text content', () => {
    const bodyText = document.body.textContent;
    
    // Text should be concise but meaningful
    expect(bodyText.length).toBeLessThan(500);
    expect(bodyText.length).toBeGreaterThan(50);
  });

  test('should not have unnecessary attributes', () => {
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const attributes = Array.from(element.attributes);
      
      // Check for common unnecessary attributes
      const unnecessaryAttrs = ['onclick', 'onload', 'onerror'];
      unnecessaryAttrs.forEach(attr => {
        expect(element.hasAttribute(attr)).toBeFalsy();
      });
    });
  });

  test('should have proper encoding declaration', () => {
    const charset = document.querySelector('meta[charset]');
    expect(charset).toBeTruthy();
    expect(charset.getAttribute('charset')).toBe('UTF-8');
  });
});
