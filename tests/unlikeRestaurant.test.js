/* eslint-disable max-len */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import { fireEvent, screen } from '@testing-library/dom';
import dbModule from '../src/scripts/favorite-db';
import render from '../src/scripts/restaurantDetail';

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="maincontent"></div><div id="likeButton"></div>';
  });
  it('should show the liked button when the restaurant has been liked before', async () => {
    const likeButton = document.getElementById('likeButton');
    likeButton.classList.add('liked');
    expect(likeButton).toBeTruthy();
    expect(likeButton.classList.contains('liked')).toBe(true);
  });
  it('should be able to unlike the restaurant', async () => {
    const likeButton = document.getElementById('likeButton');
    jest.spyOn(dbModule, 'get').mockResolvedValueOnce({ id: 'restaurantId' });
    likeButton.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(likeButton.classList.contains('liked')).toBe(false);
  });

  it('should handle error when removing a restaurant from favorites fails', async () => {
    const likeButton = document.getElementById('likeButton');
    const restaurantId = 'restaurantId';
    jest.spyOn(dbModule, 'get').mockResolvedValueOnce({ id: restaurantId });
    jest.spyOn(dbModule, 'delete').mockRejectedValueOnce(new Error('Failed to remove from favorites'));
    likeButton.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(likeButton.classList.contains('like')).toBe(false);
  });
});
