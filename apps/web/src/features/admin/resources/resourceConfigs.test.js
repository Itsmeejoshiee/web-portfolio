import { describe, it, expect } from 'vitest';
import { getResourceConfig, SITE_SECTION_LABELS } from './resourceConfigs';

function fieldNames(resourceKey) {
  return getResourceConfig(resourceKey).fields.map((field) => field.name);
}

describe('resourceConfigs', () => {
  it('site-sections only exposes fields every section actually uses', () => {
    expect(fieldNames('site-sections')).toEqual(['section', 'body']);
  });

  it('contact is its own resource with body and CTA fields', () => {
    const config = getResourceConfig('contact');

    expect(fieldNames('contact')).toEqual(['body', 'ctaLabel', 'ctaUrl']);
    expect(config.allowCreate).toBe(false);
    expect(config.allowDelete).toBe(false);
  });

  it('experience no longer exposes the removed category field', () => {
    expect(fieldNames('experience')).not.toContain('category');
  });

  it('achievements exposes a featured toggle for the homepage cap', () => {
    expect(fieldNames('achievements')).toContain('featured');
  });

  it('blog-posts has no generic-form fields — it routes to the bespoke editor page', () => {
    expect(fieldNames('blog-posts')).toEqual([]);
  });

  it('site sections labels cover the new achievements header row', () => {
    expect(SITE_SECTION_LABELS['achievements-header']).toBeTruthy();
  });
});
