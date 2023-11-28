import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    // Arrange

    const userId = 'testerLO';
    const userPassword = 'asdfghjk';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Login with too short login', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'testerL';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Login with incorrect credentials', async ({ page }) => {
    //Arrange
    const userId = 'testerL';
    const userPassword = 'asdf';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
