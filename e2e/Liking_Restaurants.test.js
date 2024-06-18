/* eslint-disable no-undef */
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/like');
  I.waitForElement('.restaurants-container', 10);
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.waitForElement('.restaurants-container', 5);
  I.seeElement('.restaurants-container');
  I.see('No favorite restaurants yet.', '.restaurants-container');
});

Scenario('liking one restaurant', ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurants-container', 5);
  I.click(locate('.read-more').first());
  I.waitForElement('.restaurant-detail', 5);
  I.click('#likeButton');
  I.waitForElement('.liked', 5);
});

Scenario('liking three restaurants', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurants-container', 10);
  for (let i = 0; i < 3; i++) {
    I.click(locate('.read-more').at(i + 1));
    I.waitForElement('.restaurant-detail', 10);
    I.click('#likeButton');
    I.waitForElement('.liked', 10);
    I.amOnPage('/');
    I.waitForElement('.restaurants-container', 10);
  }
  I.amOnPage('/like');
  I.waitForElement('.restaurants-container', 10);
  for (let i = 0; i < 3; i++) {
    I.seeElement(locate('.restaurant-card').at(i + 1));
  }
});
Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurants-container', 10);
  I.click(locate('.read-more').at(1));
  I.waitForElement('.restaurant-detail', 10);
  I.click('#likeButton');
  I.waitForElement('.liked', 10);
  I.amOnPage('/like');
  I.waitForElement('.restaurants-container', 10);
  I.seeElement(locate('.restaurant-card').at(1));
  I.click(locate('.read-more').at(1));
  I.waitForElement('.restaurant-detail', 10);
  I.click('#likeButton');
  I.waitForElement('#likeButton', 10);
  I.amOnPage('/like');
  I.waitForElement('.restaurants-container', 10);
  I.dontSeeElement(locate('.restaurant-card').at(1));
});
