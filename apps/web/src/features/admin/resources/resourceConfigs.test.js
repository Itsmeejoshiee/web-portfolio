import { describe, it, expect } from 'vitest';
import { getResourceConfig } from './resourceConfigs';

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
});
