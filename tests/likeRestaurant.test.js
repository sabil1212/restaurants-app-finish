/* eslint-disable no-promise-executor-return */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from '@testing-library/dom';
import dbModule from '../src/scripts/favorite-db';
import render from '../src/scripts/restaurantDetail';

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="maincontent"></div><div id="likeButton"></div>';
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    const likeButton = document.getElementById('likeButton');
    expect(likeButton).toBeTruthy(); // Memastikan elemen ada
    expect(likeButton.classList.contains('liked')).toBe(false);
  });

  it('should be able to like the restaurant', async () => {
    const likeButton = document.getElementById('likeButton');
    jest.spyOn(dbModule, 'get').mockResolvedValueOnce({ id: 'restaurantId' });
    likeButton.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(likeButton.classList.contains('like')).toBe(false);
  });
  it('should handle error when adding a restaurant to favorites fails', async () => {
    const likeButton = document.getElementById('likeButton');
    const restaurantId = 'restaurantId';
    jest.spyOn(dbModule, 'put').mockRejectedValueOnce(new Error('Failed to add to favorites'));
    likeButton.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(likeButton.classList.contains('liked')).toBe(false);
  });
});
