/**
 * Test cases for content validation
 */
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Content Validation Tests', () => {
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

  test('should contain CI/CD related content', () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    expect(bodyText).toContain('cicd');
    expect(bodyText).toContain('github');
    expect(bodyText).toContain('deployed');
  });

  test('should have welcoming message', () => {
    const h1 = document.querySelector('h1');
    expect(h1.textContent).toContain('Hello');
    expect(h1.textContent).toContain('GitHub Pages');
  });

  test('should have emoji in heading', () => {
    const h1 = document.querySelector('h1');
    expect(h1.textContent).toMatch(/[\u{1F300}-\u{1F9FF}]/u); // Unicode range for emojis
  });

  test('should have descriptive content about the project', () => {
    const paragraph = document.querySelector('p');
    const text = paragraph.textContent.toLowerCase();
    
    expect(text).toContain('website');
    expect(text).toContain('deployed');
    expect(text).toContain('actions');
  });

  test('should not contain placeholder text', () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    expect(bodyText).not.toContain('lorem ipsum');
    expect(bodyText).not.toContain('placeholder');
    expect(bodyText).not.toContain('todo');
    expect(bodyText).not.toContain('fixme');
  });

  test('should have appropriate content length', () => {
    const bodyText = document.body.textContent;
    
    // Content should be substantial but not too long
    expect(bodyText.length).toBeGreaterThan(50);
    expect(bodyText.length).toBeLessThan(1000);
  });

  test('should contain success indicators', () => {
    const bodyText = document.body.textContent.toLowerCase();
    
    expect(bodyText).toContain('hello');
    expect(bodyText).toContain('first');
    expect(bodyText).toContain('test');
  });
});
